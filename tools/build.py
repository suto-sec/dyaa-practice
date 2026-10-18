#!/usr/bin/env python3
"""Build app/data-lectures.js and app/data-exams.js from content/."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LEC = ROOT / "content" / "lectures"
EXA = ROOT / "content" / "exams"
APP = ROOT / "app"
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
        f.write("window.STAGES = %s;\n" % json.dumps(roadmap["stages"], ensure_ascii=False, indent=1))
    print("lectures: %d (%d sections)" % (len(lectures), sum(len(l["sections"]) for l in lectures)))
    if not EXA.is_dir():
        print("content/exams missing; skipping data-exams.js")
        return
    ovp = TOOLS / "overrides.json"
    overrides = json.loads(ovp.read_text(encoding="utf-8")) if ovp.exists() else {}
    exams = [parse_exam(p, skills, overrides, roadmap) for p in sorted(EXA.glob("*.md"), key=lambda p: p.name)]
    write_js(APP / "data-exams.js", "EXAMS", exams)
    order = {}
    for g in roadmap["stages"]:
        items = [(x["diff"], e["id"] + "/" + x["id"]) for e in exams for x in e["exercises"] if x["stage"] == g["id"]]
        order[g["id"]] = [k for _, k in sorted(items)]
    with open(APP / "data-exams.js", "a", encoding="utf-8") as f:
        f.write("window.STAGE_EX = %s;\n" % json.dumps(order, ensure_ascii=False, indent=1))
    print("stage sizes:", {k: len(v) for k, v in order.items()})
    print("%-42s %5s %5s %6s" % ("exam", "exs", "sols", "min"))
    te = ts = 0
    for e in exams:
        n = len(e["exercises"]); s = sum(1 for x in e["exercises"] if x["solution"])
        te += n; ts += s
        print("%-42s %5d %5d %6s" % (e["id"], n, s, e["durationMin"]))
    print("%-42s %5d %5d" % ("TOTAL", te, ts))
    empty = [x["id"] for e in exams for x in e["exercises"] if not x["statement"].strip()]
    if empty: warn("empty statements:", empty)


if __name__ == "__main__":
    main()
