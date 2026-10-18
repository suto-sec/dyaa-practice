# dyaa-practice

Self-graded practice app for *Diseño y Análisis de Algoritmos*. Exercises are done on paper, so there is no automatic feedback on your work. The app handles the rest: it gives you a **roadmap** (what to read and which exercise to do after which), hides solutions behind a hint ladder, schedules reviews, and tracks XP, streaks and skill mastery.

Static web app, no server and no build step for the app itself. Progress is stored in the browser (`localStorage`) and can be exported and imported as JSON. Nothing is locked: the roadmap recommends an order, but you can open any exercise or exam at any time.

## Run

```
python3 tools/build.py      # content/*.md -> app/data-*.js
xdg-open app/index.html     # works from file://
```

## How it works

- **Ruta** (roadmap): 9 stages in curriculum order. Analysis: sumatorios y cotas, notación asintótica, coste iterativo, recurrencias por expansión, método general y teorema maestro. Design: recursión básica, divide y vencerás, backtracking, voraces.
  Each stage = theory sections to read → warm-up exercises from the extra exercise sets → past-exam exercises, from easier to harder. Exercises with an official solution are tagged, since self-grading needs one. After the last analysis and the last design stage there is a full mock exam checkpoint.
- **Siguiente paso**: after rating an exercise the app offers the next undone step. A *Fallé* does not block you: it enters spaced repetition and comes back in **Hoy**. Any step can be skipped.
- **Hoy**: due reviews plus the next steps of the roadmap.
- **Time estimates**: every reading, exercise, stage and checkpoint shows an orientative time (`~12 min`), with the time left per stage and for the whole route. Reading is a study pace of about 35 words per minute (formulas count as three words, minimum 3 minutes); an exercise is the time the exam gives it ×1.25 plus the time to check it (warm-ups go by difficulty); a checkpoint is an exam plus 20 minutes to mark it. The model is in `app/logic.js`.
- **Streak flame**: the top bar and **Hoy** show a flame that is lit once you have done something today, dim while the streak is at risk and off at zero.
- **Settings** (gear, top right): theme (system, light, dark) and accent colour (presets, a picker, or any CSS colour). The accent colours buttons, bars, the flame, the logo and the tab icon. Saved in the browser apart from the progress, so resetting progress keeps it. Export, import and reset live under *Datos* (`#/ajustes`).
- **Rating** after each exercise: Fallé / Dudoso / Dominado. XP depends on points, hints used and rating; finishing a stage gives a bonus.
- **Examen**: timed simulator over whole past exams, self-scored.
- **Teoría**: the lecture notes, with deep links from hints and roadmap steps.

## Layout

```
content/lectures/   lecture notes (temas 1-7) converted from the slides (CC BY-SA 4.0)
content/exams/      past exams and extra exercises (NOT in git, see below)
tools/build.py      Markdown -> app/data-lectures.js, app/data-exams.js
tools/skills.json   skills, theory links, tagging patterns
tools/roadmap.json  stages, theory per stage, manual stage overrides
tools/check-*.js    node checks: math rendering, roadmap logic, app click-through
app/                index.html, app.js, logic.js (pure roadmap/SRS/time logic), theme.js (theme and accent, loaded in <head>), logo.js, md.js, style.css, vendor/katex
```

Checks (need Node): `node tools/check-math.js`, `node tools/check-logic.js`, `node tools/check-app.js`.

A fresh clone only has the lectures. Without `content/exams/` the app still runs and shows the theory, but the exercise bank and roadmap exercises are empty. Put the exam `.md` files in `content/exams/` and run `tools/build.py`.

## Licensing

- Code: MIT (`LICENSE`).
- Lectures: CC BY-SA 4.0, adapted from slides by Manuel Rubio Sánchez (URJC). See `NOTICE`.
- Exams and extra exercises: no license grant from the author, so they are excluded from version control and are for personal study only. See `NOTICE`.
- KaTeX is vendored under its own MIT license in `app/vendor/katex/`.
