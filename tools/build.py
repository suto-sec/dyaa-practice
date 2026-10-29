#!/usr/bin/env python3
"""Build app/data-lectures.js and app/data-exams.js from content/."""
import json, random, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LEC = ROOT / "content" / "lectures"
EXA = ROOT / "content" / "exams"
OWN = EXA / "soluciones"   # proposed solutions for exercises that come without one: <exam id>.md with "### Ejercicio N.M" (or "### Ejercicio N") blocks
APP = ROOT / "app"
LADDER = ROOT / "content" / "peldanos"   # short graded exercises (peldaños) that lead into the harder ones, one file per stage
SUMM = ROOT / "content" / "summaries"   # one sheet per etapa (formulas and things to remember), named <stage id>.md
TOOLS = Path(__file__).resolve().parent
FENCE = re.compile(r"^\s*```")


def warn(*a):
    print("WARN:", *a, file=sys.stderr)


def iter_lines(text):
    """yield (line, in_fence) where in_fence is True for fence lines and their content."""
    fence = False
    for line in text.split("\n"):
        if FENCE.match(line):
            yield line, True
            fence = not fence
        else:
            yield line, fence


def write_js(path, var, data):
    path.write_text("window.%s = %s;\n" % (var, json.dumps(data, ensure_ascii=False, indent=1)),
                    encoding="utf-8")


# ---------------- lectures ----------------
def parse_lecture(path):
    text = path.read_text(encoding="utf-8")
    title = path.stem
    sections, cur, buf = [], None, []
    seen_title = False
    def flush():
        if cur is not None:
            cur["md"] = "\n".join(buf).strip()
            if cur["md"] or cur["level"] != 0:
                sections.append(cur)
    cur = {"title": None, "level": 0}
    for line, infence in iter_lines(text):
        if not infence:
            m = re.match(r"^(#{1,3}) +(.*?)\s*$", line)
            if m:
                lv = len(m.group(1))
                if lv == 1 and not seen_title:
                    seen_title = True
                    title = m.group(2)
                    cur["title"] = title
                    continue
                if lv in (2, 3):
                    flush()
                    cur = {"title": m.group(2), "level": lv}
                    buf = []
                    continue
        buf.append(line)
    flush()
    for s in sections:
        if s["level"] == 0:
            s["level"] = 2
            if s["title"] is None:
                s["title"] = title
    return {"id": path.stem, "title": title, "sections": sections}


# ---------------- summaries ----------------
def load_summaries(roadmap):
    out = {}
    for st in roadmap["stages"]:
        p = SUMM / (st["id"] + ".md")
        if p.is_file():
            out[st["id"]] = p.read_text(encoding="utf-8").strip()
        else:
            warn("no summary sheet for stage", st["id"])
    for p in sorted(SUMM.glob("*.md")) if SUMM.is_dir() else []:
        if p.stem not in out and p.stem not in {s["id"] for s in roadmap["stages"]}:
            warn("summary sheet for an unknown stage:", p.name)
    return out


# ---------------- quizzes ----------------
QUIZ = ROOT / "content" / "quizzes"   # <stage id>.md; see parse_quiz for the format


def parse_quiz(text, tiles, source):
    """"## <reading id>" starts the quick check after a reading; each question is
         Q: the question (Markdown, $math$ allowed)
         + the correct option           - a wrong option (as many as needed)
         ? why it is right, in one or two sentences
       The options are shuffled here (stably), so the author need not place the right one anywhere in particular."""
    out, tile, q = {}, None, None
    def close():
        nonlocal q
        if q is None: return
        bad = len(q["opts"]) < 2 or len(q["opts"]) > 5 or sum(1 for o in q["opts"] if o[1]) != 1 or not q["why"]
        if bad: warn("%s: malformed question in %s: %s" % (source, tile, q["q"][:60]))
        else:
            opts = list(q["opts"])
            random.Random("%s/%d" % (tile, len(out[tile]))).shuffle(opts)
            out[tile].append({"q": q["q"], "options": [o[0] for o in opts], "answer": [o[1] for o in opts].index(True), "why": q["why"]})
        q = None
    for line in text.split("\n"):
        if line.startswith("## "):
            close(); tile = line[3:].strip(); out.setdefault(tile, [])
            if tile not in tiles: warn("%s: quick check for an unknown reading: %s" % (source, tile))
        elif line.startswith("Q:"):
            close(); q = {"q": line[2:].strip(), "opts": [], "why": ""}
        elif q is not None and line[:2] in ("+ ", "- "): q["opts"].append((line[2:].strip(), line[0] == "+"))
        elif q is not None and line.startswith("? "): q["why"] = line[2:].strip()
    close()
    return out


def load_quizzes(roadmap):
    out, tiles = {}, {t["id"] for st in roadmap["stages"] for t in st["theory"]}
    for st in roadmap["stages"]:
        p = QUIZ / (st["id"] + ".md")
        if p.is_file():
            for tile, qs in parse_quiz(p.read_text(encoding="utf-8"), tiles, p.name).items():
                if qs and tile in tiles: out[tile] = qs
    return out


# ---------------- skills ----------------
def load_skills(lectures):
    skills = json.loads((TOOLS / "skills.json").read_text(encoding="utf-8"))
    lm = {l["id"]: l for l in lectures}
    for s in skills:
        s["_re"] = [re.compile(p, re.I) for p in s.get("patterns", [])]
        for t in s["theory"]:
            l = lm.get(t["lecture"])
            if not l or not any(t["section"] in sec["title"] for sec in l["sections"]):
                warn("unresolved theory ref in skill %s: %s / %s" % (s["id"], t["lecture"], t["section"]))
    return skills


def tag(skills, text, kind):
    out = []
    for s in skills:
        if any(r.search(text) for r in s["_re"]):
            out.append(s["id"])
    if kind == "diseno":
        if re.search(r"divide y vencer", text, re.I): out.append("divide-y-venceras")
        if re.search(r"backtracking|vuelta atrás", text, re.I): out.append("backtracking")
        if re.search(r"voraz|greedy", text, re.I): out.append("voraz")
    if kind == "ejs":
        return out
    if not out:
        out.append("complejidad-general" if kind == "analisis" else "recursion-basica")
    # keep tema-consistent: drop duplicates preserving order
    seen, res = set(), []
    for x in out:
        if x not in seen:
            seen.add(x); res.append(x)
    return res


# ---------------- roadmap ----------------
def load_roadmap(lectures):
    rm = json.loads((TOOLS / "roadmap.json").read_text(encoding="utf-8"))
    lm = {l["id"]: l for l in lectures}
    for st in rm["stages"]:
        for t in st["theory"]:
            l = lm.get(t["lecture"])
            idx = None
            if "from" in t:   # a reading given as a range of sections of the lecture
                if not l or not (0 <= t["from"] <= t["to"] < len(l["sections"])):
                    warn("reading outside its lecture:", st["id"], t["id"])
                    t["from"], t["to"] = 0, 0
                t["idx"], t["upto"] = t["from"], t["to"]
                continue
            if l:
                for i, sec in enumerate(l["sections"]):
                    if sec["title"] == t["section"]:
                        idx = i; break
                if idx is None:
                    for i, sec in enumerate(l["sections"]):
                        if t["section"] in sec["title"]:
                            idx = i; break
            if idx is None:
                warn("unresolved theory ref in stage %s: %s / %s" % (st["id"], t["lecture"], t["section"]))
                idx = 0
            t["idx"] = idx
            if t.get("to") and l:   # a reading that covers several sections: up to this one (or "@end" = the end of the lecture)
                up = len(l["sections"]) - 1 if t["to"] == "@end" else next((i for i in range(idx, len(l["sections"])) if t["to"] in l["sections"][i]["title"]), None)
                if up is None:
                    warn("unresolved end of reading in stage %s: %s / %s" % (st["id"], t["lecture"], t["to"]))
                else:
                    t["upto"] = up
    return rm


TECH = [("backtracking", r"backtracking|vuelta atr[aá]s"), ("divide-y-venceras", r"divide y vencer"),
        ("voraz", r"voraz|greedy")]


def design_skill(text):
    """Primary design technique = the one mentioned first in the statement."""
    best = None
    for sid, rx in TECH:
        m = re.search(rx, text, re.I)
        if m and (best is None or m.start() < best[0]):
            best = (m.start(), sid)
    return best[1] if best else "recursion-basica"


ADIC_BASE = {"3": 0.5, "4": 1.0, "5": 1.5, "9": 2.0, "6": 1.0, "7": 1.0, "8": 1.0}


def difficulty(ex, adic, ch, has_sol):
    ln = len(ex["statement"])
    if adic:
        d = ADIC_BASE.get(ch, 1.0) + min(ln, 900) / 900.0
    else:
        pts = ex["points"] if ex["points"] is not None else 3.0
        d = 3.0 + 0.5 * pts + min(ln, 1500) / 750.0
    if has_sol:
        d -= 0.3
    return round(d, 2)


# ---------------- exams ----------------
def load_own(stem):
    """Proposed solutions written for the exercises of one exam file that has none: {n: markdown}."""
    path = OWN / (stem + ".md")
    out, n, buf = {}, None, []
    if not path.is_file():
        return out
    def flush():
        if n is not None:
            out[n] = "\n".join(buf).strip()
    for line, infence in iter_lines(path.read_text(encoding="utf-8")):
        m = None if infence else re.match(r"^###\s+Ejercicio\s+(\d+(?:\.\d+)?)\s*$", line)
        if m:
            flush(); n, buf = m.group(1), []
        elif n is not None:
            buf.append(line)
    flush()
    return out


MARKER = re.compile(r"^(###\s+(Solución|Posible solución|Posibles soluciones)\s*:?\s*|\*\*Solución:\*\*\s*)$")


def exam_duration(text):
    head = " ".join(l for l in text.split("\n")[:6] if not l.startswith("#"))
    m = re.search(r"(\d+)\s*horas?(?:\s*y\s*(media|\d+\s*minutos?))?", head, re.I)
    if m:
        h = int(m.group(1)) * 60
        r = m.group(2)
        if r:
            h += 30 if r.lower() == "media" else int(re.match(r"\d+", r).group())
        return h
    m = re.search(r"\b(\d+)\s*minutos", head, re.I)
    if m:
        return int(m.group(1))
    return None


def split_solution(body_lines, ex_id, overrides, ejs_chapter2=False):
    """body_lines: list of (line, infence). Returns (statement, solution|None)."""
    body = "\n".join(l for l, _ in body_lines)
    ov = overrides.get(ex_id, {})
    if ov.get("split_at"):
        i = body.find(ov["split_at"])
        if i >= 0:
            return body[:i].strip(), body[i:].strip()
        warn("split_at not found for", ex_id)
    for idx, (l, f) in enumerate(body_lines):
        if f: continue
        if ejs_chapter2:
            hit = l.strip() == "Solución:"
        else:
            hit = bool(MARKER.match(l.strip()))
        if hit:
            st = "\n".join(x for x, _ in body_lines[:idx]).strip()
            so = "\n".join(x for x, _ in body_lines[idx + 1:]).strip()
            return st, so
    return body.strip(), None


def kind_from_name(stem):
    if "_analisis_" in stem: return "analisis"
    if "_diseno_" in stem: return "diseno"
    return None


def parse_exam(path, skills, overrides, roadmap):
    stem = path.stem
    text = path.read_text(encoding="utf-8")
    adic = stem.startswith("ejercicios_adicionales")
    title = stem
    for line in text.split("\n"):
        m = re.match(r"^# +(.*)", line)
        if m: title = m.group(1).strip(); break
    exam = {"id": stem, "title": title, "durationMin": None if adic else exam_duration(text), "exercises": [],
            "kind": "adic" if adic else (kind_from_name(stem) or "mixto")}
    head_re = re.compile(r"^###\s+Ejercicio\s+(\d+\.\d+)(.*)$") if adic else re.compile(r"^#{2,3}\s+Ejercicio\s+(\d+)(.*)$")
    kind = "ejs" if adic else kind_from_name(stem)
    chapter = None
    cur = None  # dict with heading info and lines
    raw = []

    def close():
        nonlocal cur
        if cur is None: return
        n = cur["n"]
        eid = "%s#%s" % (stem, n)
        if any(e["id"] == eid for e in exam["exercises"]):
            eid = "%s#%s-%s" % (stem, n, cur["kind"]); 
        ch2 = adic and n.split(".")[0] == "2"
        st, so = split_solution(cur["lines"], eid if eid in overrides else "%s#%s" % (stem, n), overrides, ch2)
        h = cur["head"]
        pm = re.search(r"\[([\d.,]+)\s*puntos?\]", h)
        pts = float(pm.group(1).replace(",", ".")) if pm else None
        dm = re.search(r"\[Duración:\s*(\d+)\s*minutos\]", h)
        dur = int(dm.group(1)) if dm else None
        t = re.sub(r"\[[^\]]*\]", "", h).strip(" -–:.\t")
        if not t: t = "Ejercicio %s" % n
        if adic:
            ch = n.split(".")[0]
            sk = tag(skills, st + "\n" + h, "ejs")
            base = {"3": "recursion-basica", "4": "recursion-basica", "5": "recursion-basica", "9": "recursion-basica",
                    "6": "divide-y-venceras", "7": "backtracking", "8": "voraz"}.get(ch)
            if base: sk = [base]
            elif not sk: sk = ["complejidad-general"]
        else:
            sk = tag(skills, st + "\n" + h, cur["kind"])
        sm = {k: i for i, g in enumerate(roadmap["stages"]) for k in g["skills"]}
        stage_of = {g["id"]: g for g in roadmap["stages"]}
        ov = roadmap.get("stage_overrides", {}).get("%s#%s" % (stem, n))
        if cur["kind"] == "diseno" or (adic and n.split(".")[0] in ("3", "4", "5", "6", "7", "8", "9")):
            if not adic:
                sk = [design_skill(st + "\n" + h)]
            stg = [g for g in roadmap["stages"] if sk[0] in g["skills"]][0]["id"]
        else:
            if "rec-expansion" in sk or "rec-general" in sk:
                full = st + "\n" + h
                has_exp = re.search(r"expansi[oó]n", full, re.I)
                has_gen = re.search(r"m[eé]todo general|teorema maestro|ecuaci[oó]n caracter", full, re.I)
                if has_exp and not has_gen:
                    sk = [x for x in sk if x != "rec-general"]
                elif has_gen and not has_exp:
                    sk = [x for x in sk if x != "rec-expansion"]
            stg = roadmap["stages"][max(sm[x] for x in sk)]["id"]
        if ov:
            stg = ov
            keep = [x for x in sk if sm[x] <= [g["id"] for g in roadmap["stages"]].index(ov)]
            sk = keep or [stage_of[ov]["skills"][0]]
        assert stg in stage_of, (eid, stg)
        exam["exercises"].append({"id": eid, "n": n, "title": t, "points": pts, "durationMin": dur,
                                  "kind": cur["kind"], "statement": st, "solution": so, "skills": sk,
                                  "stage": stg, "src": "adic" if adic else "exam",
                                  "diff": difficulty({"statement": st, "points": pts}, adic, n.split(".")[0] if adic else "", bool(so and so.strip()))})
        cur = None

    for line, infence in iter_lines(text):
        if not infence:
            m = head_re.match(line)
            if m:
                close()
                cur = {"n": m.group(1), "head": m.group(2), "kind": kind or "analisis", "lines": []}
                continue
            m2 = re.match(r"^##\s+(.*)", line)
            if m2 and not re.match(r"^###", line):
                close()
                if not adic:
                    if "nálisis" in m2.group(1): kind = "analisis"
                    elif "iseño" in m2.group(1): kind = "diseno"
                continue
            if re.match(r"^# ", line) and cur is not None:
                close(); continue
        if cur is not None:
            cur["lines"].append((line, infence))
    close()
    return exam


def adic_key(n):
    """Key of an existing additional exercise ("1.4") in the route: <exam id>/<exercise id>."""
    f = "ejercicios_adicionales_1-2" if int(n.split(".")[0]) <= 2 else "ejercicios_adicionales_3-9"
    return "%s/%s#%s" % (f, f, n)


def load_ladder(roadmap):
    """Peldaños: {exam: a pseudo exam holding them, order: {stage: {reading: [keys]}}} or None.
    A file has `stage: <id>`, an `## Orden` list (`- <reading id>: S01 S02 1.4 ...`, numbers like 1.4 are existing
    additional exercises) and one `### S01 · Title` block per exercise: optional `nivel:`/`skills:` lines, the
    statement, `#### Pista` (optional) and `#### Solución` (steps written as `**Paso 1.** ...`)."""
    if not LADDER.is_dir():
        return None
    stages = {g["id"]: g for g in roadmap["stages"]}
    exercises, order, seen = [], {}, set()
    for path in sorted(LADDER.glob("*.md")):
        stage, mode, cur, tiles, used = None, None, None, {}, []
        def close():
            nonlocal cur
            if cur is None: return
            for k in ("statement", "hint", "solution"):
                cur[k] = "\n".join(cur.pop("_" + k)).strip()
            if not cur["statement"] or not cur["solution"] or not re.search(r"\*\*Paso \d+", cur["solution"]):
                warn("peldaño without statement or steps:", cur["n"])
            if not cur["hint"]: del cur["hint"]
            exercises.append(cur); cur = None
        for line, infence in iter_lines(path.read_text(encoding="utf-8")):
            m = None if infence else re.match(r"^(#{1,4})\s+(.*?)\s*$", line)
            if m and len(m.group(1)) == 2:
                close(); mode = "order" if m.group(2) == "Orden" else None
                continue
            if m and len(m.group(1)) == 3:
                close()
                mm = re.match(r"^(\w+)\s*·\s*(.+)$", m.group(2))
                if not mm: warn("bad peldaño heading in", path.name, m.group(2)); mode = None; continue
                rid = mm.group(1)
                if rid in seen: warn("duplicate peldaño:", rid)
                seen.add(rid)
                sk = stages[stage]["skills"][:1] if stage in stages else []
                cur = {"id": "peldanos#" + rid, "n": rid, "title": mm.group(2).strip(), "points": None, "durationMin": None,
                       "kind": "ejs", "skills": sk, "stage": stage, "src": "adic", "diff": 0.5, "steps": True,
                       "_statement": [], "_hint": [], "_solution": []}
                mode, head = "statement", True
                continue
            if m and len(m.group(1)) == 4 and cur is not None and m.group(2) in ("Pista", "Solución"):
                mode = "hint" if m.group(2) == "Pista" else "solution"
                continue
            if mode is None and cur is None:
                ms = re.match(r"^stage:\s*(\S+)\s*$", line)
                if ms:
                    stage = ms.group(1)
                    if stage not in stages: warn("peldaños of an unknown stage:", stage)
                continue
            if mode == "order":
                mo = re.match(r"^-\s*([\w-]+):\s*(.+)$", line)
                if mo:
                    ids = mo.group(2).split()
                    tiles[mo.group(1)] = [adic_key(t) if re.match(r"^\d+\.\d+$", t) else "peldanos/peldanos#" + t for t in ids]
                    used += [t for t in ids if not re.match(r"^\d+\.\d+$", t)]
                continue
            if cur is None: continue
            if mode == "statement" and head:
                mk = re.match(r"^(nivel|skills):\s*(.+)$", line)
                if mk:
                    if mk.group(1) == "nivel": cur["diff"] = float(mk.group(2))
                    else: cur["skills"] = [x.strip() for x in mk.group(2).split(",")]
                    continue
                if not line.strip(): continue
                head = False
            cur["_" + mode].append(line)
        close()
        have = [e["n"] for e in exercises if e["stage"] == stage]
        for r in have:
            if used.count(r) != 1: warn("peldaño %s appears %d times in the Orden of %s" % (r, used.count(r), path.name))
        for r in set(used):
            if r not in have: warn("Orden names an unknown peldaño:", r)
        theory = {t["id"] for t in stages[stage]["theory"]} if stage in stages else set()
        for t in tiles:
            if t not in theory: warn("Orden names an unknown reading:", stage, t)
        order[stage] = tiles
    if not exercises:
        return None
    return {"exam": {"id": "peldanos", "title": "Peldaños", "durationMin": None, "exercises": exercises, "kind": "adic"}, "order": order}


def main():
    lectures = [parse_lecture(p) for p in sorted(LEC.glob("*.md"))]
    skills = load_skills(lectures)
    roadmap = load_roadmap(lectures)
    APP.mkdir(exist_ok=True)
    write_js(APP / "data-lectures.js", "LECTURES", lectures)
    # append SKILLS to same file
    pub = [{k: v for k, v in s.items() if not k.startswith("_")} for s in skills]
    with open(APP / "data-lectures.js", "a", encoding="utf-8") as f:
        f.write("window.SKILLS = %s;\n" % json.dumps(pub, ensure_ascii=False, indent=1))
        f.write("window.WORLDS = %s;\n" % json.dumps(roadmap["worlds"], ensure_ascii=False))
        f.write("window.SCOPES = %s;\n" % json.dumps(roadmap["scopes"], ensure_ascii=False, indent=1))
        f.write("window.STAGES = %s;\n" % json.dumps(roadmap["stages"], ensure_ascii=False, indent=1))
        f.write("window.SUMMARIES = %s;\n" % json.dumps(load_summaries(roadmap), ensure_ascii=False, indent=1))
        f.write("window.QUIZZES = %s;\n" % json.dumps(load_quizzes(roadmap), ensure_ascii=False, indent=1))
        lad = load_ladder(roadmap)
        if lad: f.write("window.LADDER = %s;\n" % json.dumps(lad, ensure_ascii=False, indent=1))
        f.write("window.LEGACY_THEORY = %s;\n" % json.dumps(roadmap.get("legacy_theory", {}), ensure_ascii=False))
    print("lectures: %d (%d sections)" % (len(lectures), sum(len(l["sections"]) for l in lectures)))
    if not EXA.is_dir():
        print("content/exams missing; skipping data-exams.js")
        return
    ovp = TOOLS / "overrides.json"
    overrides = json.loads(ovp.read_text(encoding="utf-8")) if ovp.exists() else {}
    exams = [parse_exam(p, skills, overrides, roadmap) for p in sorted(EXA.glob("*.md"), key=lambda p: p.name)]
    # the same statement can appear in two exams; reuse the solution of the twin that has one
    seen = {}
    for e in exams:
        for x in e["exercises"]:
            k = re.sub(r"[^a-z0-9]", "", x["statement"].lower())[:300]
            seen.setdefault(k, []).append(x)
    for twins in seen.values():
        have = [t for t in twins if t["solution"]]
        if len(twins) > 1 and have:
            for t in twins:
                if not t["solution"]:
                    t["solution"] = have[0]["solution"]
                    t["solutionFrom"] = have[0]["id"]
    # own solutions fill only the gaps (after "diff" was computed, so the order of the route does not depend on them)
    for e in exams:
        own = load_own(e["id"])
        known = {x["n"] for x in e["exercises"]}
        for n in own:
            if n not in known: warn("proposed solution for an unknown exercise:", e["id"], n)
        for x in e["exercises"]:
            if not x["solution"] and own.get(x["n"]):
                x["solution"] = own[x["n"]]
                x["own"] = True
    write_js(APP / "data-exams.js", "EXAMS", exams)
    order = {}
    for g in roadmap["stages"]:
        items = [(x["diff"], e["id"] + "/" + x["id"]) for e in exams for x in e["exercises"] if x["stage"] == g["id"]]
        order[g["id"]] = [k for _, k in sorted(items)]
    # where in its stage each warm-up goes: after the reading it needs (index of the reading), so the stage alternates reading and practice.
    # roadmap.json "exercise_tile" says which reading; a warm-up it does not mention is spread over the readings, easiest first.
    info = {e["id"] + "/" + x["id"]: x for e in exams for x in e["exercises"]}
    et = roadmap.get("exercise_tile", {})
    at = {}
    for g in roadmap["stages"]:
        pos = {t["id"]: i for i, t in enumerate(g["theory"])}
        loose = []
        for k in order[g["id"]]:
            if info[k]["src"] != "adic": continue
            t = et.get(k.split("/")[0] + "#" + info[k]["n"])
            if t is None: loose.append(k)
            elif t in pos: at[k] = pos[t]
            else: warn("exercise placed after a reading of another etapa:", k, t); loose.append(k)
        for r, k in enumerate(loose):
            warn("warm-up without a reading assigned:", k)
            at[k] = r * len(g["theory"]) // len(loose) if g["theory"] else 0
    # an exercise that builds on another one ("la función desarrollada en el ejercicio 4.10") never comes before it
    adic = {x["n"]: k for k, x in info.items() if x["src"] == "adic"}
    for keys in order.values():
        for _ in range(len(keys)):
            moved = False
            for k in list(keys):
                for r in re.findall(r"[Ee]jercicio\s+(\d+\.\d+)", info[k]["statement"]):
                    d = adic.get(r)
                    if d in keys and d != k and keys.index(d) > keys.index(k):
                        keys.remove(k); keys.insert(keys.index(d) + 1, k); moved = True
            if not moved: break
    with open(APP / "data-exams.js", "a", encoding="utf-8") as f:
        f.write("window.STAGE_EX = %s;\n" % json.dumps(order, ensure_ascii=False, indent=1))
        f.write("window.STAGE_AT = %s;\n" % json.dumps(at, ensure_ascii=False, indent=1))
    print("stage sizes:", {k: len(v) for k, v in order.items()})
    print("%-42s %5s %5s %6s" % ("exam", "exs", "sols", "min"))
    te = ts = 0
    for e in exams:
        n = len(e["exercises"]); s = sum(1 for x in e["exercises"] if x["solution"] and not x.get("own"))
        te += n; ts += s
        print("%-42s %5d %5d %6s" % (e["id"], n, s, e["durationMin"]))
    print("%-42s %5d %5d" % ("TOTAL", te, ts))
    empty = [x["id"] for e in exams for x in e["exercises"] if not x["statement"].strip()]
    if empty: warn("empty statements:", empty)


if __name__ == "__main__":
    main()
