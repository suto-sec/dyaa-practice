# dyaa-practice

Self-graded practice app for *Diseño y Análisis de Algoritmos*. Exercises are done on paper, so there is no automatic feedback on your work. The app handles the rest: it picks what to do, hides solutions behind a hint ladder, schedules reviews, and tracks XP, streaks and skill mastery.

Static web app, no server and no build step for the app itself. Progress is stored in the browser (`localStorage`) and can be exported and imported as JSON.

## Run

```
python3 tools/build.py      # content/*.md -> app/data-*.js
xdg-open app/index.html     # works from file://
```

## Layout

```
content/lectures/   lecture notes converted from the slides (CC BY-SA 4.0)
content/exams/      past exams and extra exercises (NOT in git, see below)
tools/build.py      Markdown -> app/data-lectures.js, app/data-exams.js
tools/skills.json   skill tree, theory links, tagging patterns
app/                index.html, app.js, style.css, vendor/katex
```

A fresh clone only has the lectures. Without `content/exams/` the app still runs and shows the theory, but the exercise bank is empty. Put the exam `.md` files in `content/exams/` and run `tools/build.py`.

## Licensing

- Code: MIT (`LICENSE`).
- Lectures: CC BY-SA 4.0, adapted from slides by Manuel Rubio Sánchez (URJC). See `NOTICE`.
- Exams and extra exercises: no license grant from the author, so they are excluded from version control and are for personal study only. See `NOTICE`.
- KaTeX is vendored under its own MIT license in `app/vendor/katex/`.
