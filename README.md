# dyaa-practice

Self-graded practice app for *Diseño y Análisis de Algoritmos*. Exercises are done on paper, so there is no automatic feedback on your work. The app handles the rest: it gives you a **roadmap** (what to read and which exercise to do after which), hides solutions behind a hint ladder, schedules reviews, and tracks XP, streaks and skill mastery.

Static web app: no server, no installation and no build step to use it (open `app/index.html`). Progress is stored in the browser (`localStorage`) and can be exported and imported as JSON. Nothing is locked: the roadmap recommends an order, but you can open any exercise or exam at any time.

> **Unofficial project.** Not affiliated with or endorsed by the Universidad Rey Juan Carlos or by the author of the course material. The lectures, exams and exercises are adapted from the material of Manuel Rubio Sánchez (URJC) under CC BY-SA. The conversion may contain errors, and the proposed solutions are **not** official: always check against the official material. Full details in [Legal notice and licensing](#legal-notice-and-licensing). *(Aviso legal en español al final.)*

**Use it online, nothing to download: <https://suto-sec.github.io/dyaa-practice/>** (any recent browser, on a computer or a phone). It is always the latest version. If you prefer an offline copy, see [Install and open](#install-and-open).

**What is inside:** 9 lecture notes (temas 1 to 7, 327 sections) with 48 figures, 10 study stages, 70 quick checks (257 questions), 10 summary sheets, 161 graded warm-up exercises (*peldaños*) with step-by-step solutions, 21 past exams plus the additional exercises (120 of their exercises have a proposed, unofficial solution), generated practice for when you only have a laptop, and an exam simulator. The app itself is in Spanish.

## Contents

- [Use it online](#use-it-online) or [install an offline copy](#install-and-open): Linux, Windows, macOS
- [First minutes](#first-minutes)
- [Your progress](#your-progress-read-this) (and [sharing it between profiles](#share-it-between-profiles-and-computers))
- [Updating and removing](#updating-and-removing)
- [Something does not work](#something-does-not-work)
- [How it works](#how-it-works), [Layout](#layout)
- [Legal notice and licensing](#legal-notice-and-licensing)

## Use it online

Open <https://suto-sec.github.io/dyaa-practice/> and that is all: no account, no download. Bookmark it. It needs an internet connection to load (it is not an offline app unless you download a copy, below). Your progress is stored in your browser for that address, so see [Your progress](#your-progress-read-this): it is separate from any downloaded copy.

## Install and open

Only needed for an **offline copy**. There is nothing to install. The app is a folder of web files: you open one of them (`app/index.html`) in a browser. No account, no server, no internet connection needed (everything it uses, including the maths renderer, is in the folder). You need a recent browser (Firefox, Chrome, Chromium, Edge, Safari, Brave...). Python and Node are **not** needed to use it.

### Step 1. Get the folder

Pick **one** of these:

- **Download a ZIP (easiest).** Click this link: <https://github.com/suto-sec/dyaa-practice/archive/refs/heads/main.zip>. Your browser downloads `dyaa-practice-main.zip`. (Or open <https://github.com/suto-sec/dyaa-practice>, press the green **Code** button, then **Download ZIP**.) Then **unzip it** (details per system in Step 2).
- **With git.** If you already use git: `git clone https://github.com/suto-sec/dyaa-practice.git`. A clone is easier to [update](#updating-and-removing) later.

Put the unzipped folder somewhere permanent (for example your `Documents` folder), not in `Downloads` or on the Desktop, because moving it later can make some browsers forget your progress (see [Your progress](#your-progress-read-this)).

### Step 2. Unzip and open `app/index.html`

Inside the folder there are folders called `app`, `content` and `tools`. **You only ever open one file: `index.html` inside `app`.**

**Windows**

1. Find `dyaa-practice-main.zip` (usually in *Downloads*). Right-click it → *Extract All…* → *Extract*. **Do not** open files from inside the ZIP window: it will not work.
2. Open the new folder `dyaa-practice-main`, then the folder `app`.
3. Double-click `index.html`. If Windows asks which program to use, choose your browser (Edge is already installed).
4. Alternative: open PowerShell inside the folder and run `start app\index.html`.

**macOS**

1. Double-click the ZIP in *Downloads*; a folder `dyaa-practice-main` appears. Drag it to *Documents*.
2. Open the folder, then `app`. Right-click `index.html` → *Open With* → your browser (Safari is already installed). A plain double-click may open a text editor instead.
3. Alternative: in Terminal, inside the folder, `open app/index.html`.

**Linux**

1. Unzip it (right-click → *Extract Here*, or `unzip dyaa-practice-main.zip` in a terminal).
2. Open the folder, then `app`, and double-click `index.html`. If it opens in a text editor, right-click → *Open With* → your browser.
3. Alternative: in a terminal inside the folder, `xdg-open app/index.html` (or `firefox app/index.html`, `chromium app/index.html`).

### Step 3. Check that it works

A browser tab opens. The address starts with `file://` (on the website it starts with `https://`): that is normal and expected. You should see:

- a page titled **DyAA Practice** with a top bar: *Hoy · Ruta · Ejercicios · Examen · Sin papel · Teoría · Resumen · Registro · Progreso*, and a gear icon at the top right;
- on **Ruta**, a list of stages with checkable steps; on **Teoría**, the lecture notes with the formulas drawn properly (not as `$...$` text).

If you see something else, go to [Something does not work](#something-does-not-work).

### Step 4. Bookmark it

Bookmark the page (Ctrl+D, or ⌘+D on macOS) so you can come back without searching for the file.

## First minutes

1. You land on **Hoy** (today). Press the suggested next step; it is either something to read or an exercise.
2. **Exercises are done on paper.** The app shows the statement (and, if you turn the stopwatch on in the gear menu, how long you take). Try it yourself, then open the hints one at a time (each one costs a bit of XP), and finally compare with the solution.
3. Rate yourself honestly: **Fallé**, **Dudoso** or **Dominado**. A *Fallé* is not a punishment: it just comes back later in **Hoy** for review.
4. **Every setting is in the gear icon** (top right), in sections: *Apariencia* (theme, accent colour), *Ruta de estudio* (*Temario completo* or *Primer examen*, organise by *Etapas* or *Temas*), *Estudio* (daily goal, stopwatch), *Simulador de examen* and *Datos y progreso compartido* (export, import, reset, shared file). Buttons in the pages that talk about a setting open the menu at that section.
5. Nothing is locked. **Ruta** only recommends an order; you can open any exercise, exam or lecture at any time.

## Your progress (read this)

Your progress lives **inside the browser**, not in the folder. So:

- The website and a downloaded copy are **different places**: progress made in one does not appear in the other. To move it, use *Exportar JSON* in one and *Importar JSON* in the other (gear → *Datos y progreso compartido*).
- It stays on that browser **profile** on that computer. Another browser, another Chrome profile, another computer, a private/incognito window, or clearing the site data starts from zero (unless you [share it through a file](#share-it-between-profiles-and-computers), below).
- Some browsers (Firefox, for instance) tie it to the exact location of the file, so moving or renaming the folder can make it look empty. Move it back to see it again.
- **Make a backup now and then**: gear → *Datos y progreso compartido* → *Exportar JSON*. It downloads a JSON file. *Importar JSON* in the same menu restores it, also on another computer.
- Route, organisation, theme and accent are saved separately, so *Reiniciar progreso* does not change them.

### Share it between profiles and computers

Set it up **once per browser profile**; after that it is automatic. The first time you open the page (*Hoy*) it offers to keep your progress in a file:

1. In the first profile click *Crear el archivo* and pick a place. A folder you already sync between your computers (Unison, Syncthing, a cloud folder...) is the best choice.
2. In every other profile, or on a new computer once the file has arrived, click *Ya tengo uno* and pick **that same file**. Your progress appears; nothing to export or import.

From then on every change is written to the file, and the page reads it when it opens or you come back to its tab. (If you said *Ahora no*, the same buttons are in gear → *Datos y progreso compartido* → *Dónde se guarda el progreso*.)

- **Permission.** A browser never lets a page edit a file silently, so each new session it asks once. Until you allow it a banner says so, and **the first click anywhere on the page** shows the browser's prompt. If Chrome offers *Allow on every visit*, choose it and it will stop asking.
- If two profiles changed the progress separately, you are asked which to keep, and a copy of the replaced one is kept in that profile. Before each write the file is read again, so one profile never overwrites a newer save from another.
- *Reiniciar progreso* also clears the shared file, so it resets every profile that uses it.
- It needs the File System Access API (Chrome, Edge, Brave...). Firefox and Safari do not have it: use *Exportar JSON* and *Importar JSON* there.
- The file holds only your progress, never the exams.

## Updating and removing

**Update.** Updates change the files, not your progress, which is stored in your browser.

- If you use the **website**: nothing to do. Reload the page (Ctrl+F5) to get the newest version, and your progress stays.
- If you use an **offline copy from a ZIP**: download the ZIP again, unzip it **next to** the old folder, and open its `app/index.html`. Some browsers tie your progress to the exact file location, so if the new copy looks empty, [export your progress](#your-progress-read-this) from the old copy (gear → *Datos y progreso compartido* → *Exportar JSON*) and import it in the new one (*Importar JSON*).
- If you use an **offline copy from git**: in a terminal inside the folder run `git pull`, then reload the page with Ctrl+F5.

**Remove.** Delete the folder. Your progress stays in the browser's site data until you clear it (browser settings → site data → the `file://` entry), or press *Reiniciar progreso* in the gear menu before deleting.

## Something does not work

| What you see | What to do |
| --- | --- |
| A blank page, or a message about JavaScript | Enable JavaScript in the browser, and reload. Open `app/index.html`, not another file. |
| The file opens as text, or in an editor | Open it with a browser instead (see Step 2). |
| Formulas appear as raw `$...$` text or look broken | The download is incomplete: `app/vendor/katex/` is missing. Download the repository again, and unzip all of it. |
| Pictures in the lectures are missing | Same: `app/img/` is missing. |
| A yellow box saying "Datos de examen no encontrados", or no exam in *Examen* | `app/data-exams.js` is missing from the folder. Download the repository again and unzip all of it. If you deleted exam files yourself, run `python3 tools/build.py`. |
| Progress disappeared | Different browser or window, cleared site data, or the folder was moved. Import your last backup from the gear menu (*Datos*). |
| A new version does not show | Reload with Ctrl+F5 (⌘+Shift+R on macOS). If you edited files in `content/`, run `python3 tools/build.py` first. |
| Windows: nothing happens when you open it from the ZIP | Extract the ZIP first. |

## For developers

Checks (need Node 18 or newer): `node tools/check-math.js`, `node tools/check-logic.js`, `node tools/check-app.js`, `node tools/check-practice.js` (the generators: every question has one right answer, checked against independent computations), `node tools/check-ladder.js` (the peldaños: structure, formulas render, every closed form they state is compared with the sum computed term by term).

`python3 tools/build.py` regenerates `app/data-lectures.js` and `app/data-exams.js` (both committed, so nobody needs Python just to use the app) from `content/`. It needs Python 3 (Windows: install it from <https://www.python.org/downloads/> ticking *Add python.exe to PATH*, and use `py` instead of `python3`). Edit `content/lectures/*.md` or `tools/roadmap.json` and run it again. Regenerating the slide figures needs `pdftoppm` and ImageMagick (`tools/figures.py`).

## How it works

- **Ruta** (roadmap): 10 stages in curriculum order. Analysis: introducción (tema 1, reading only), sumatorios y cotas, notación asintótica, coste iterativo, recurrencias por expansión, método general y teorema maestro. Design: recursión básica, divide y vencerás, backtracking, voraces.
  Each stage is a sequence of **lessons**, not one block of theory followed by one block of exercises. A lesson is a short **reading** (4 to 15 minutes, a few sections of the lecture), a **quick check** (3 to 5 multiple-choice questions about what was just read, instant feedback and the reason, 1 XP per right answer the first time), and the **warm-up exercises** that need exactly that reading, easiest first. The exercises taken from past exams close the stage ("Nivel examen"), and after the last analysis and the last design stage there is a full mock exam checkpoint. Exercises with an official solution are tagged, since self-grading needs one. Together the readings cover the whole class material of temas 1 to 7 (except background such as vectors and matrices, which stays in *Teoría*).
  Which reading each warm-up follows is set by hand in `tools/roadmap.json` (`exercise_tile`); the readings (`theory`, as ranges of sections) are there too. An exercise that builds on another one never comes before it.
- **Quick checks**: the questions live in `content/quizzes/<stage id>.md`, one `## <reading id>` block per reading. Each question is `Q:` the text, then `+` the right option, `-` the wrong ones and `?` the explanation; the options are shuffled when building. Nothing in them comes from the exams.
- **Your route** (settings): *Temario completo* (temas 1 to 7) or *Primer examen* (temas 1 to 3: the analysis stages and the analysis checkpoint). Everything outside the chosen route stays reachable, it just is not recommended or counted in the time left. The two routes are defined in `tools/roadmap.json` (`scopes`).
- **Organise by** (settings): *Etapas* (the stages above) or *Temas* (one block per lecture, as in the slides; tema 3.2 holds two stages). Only the grouping and the names change, not the order or the progress.
- **Siguiente paso**: after rating an exercise the app offers the next undone step. A *Fallé* does not block you: it enters spaced repetition and comes back in **Hoy**. Any step can be skipped.
- **Hoy**: a plan that fits your daily goal (gear menu → *Estudio*, 30 minutes by default): a few due reviews (at most about 40% of the time) and then the next steps of the roadmap until the goal is covered. What you already did today counts, so the plan shrinks as you work and says *Meta cumplida* when the time is full.
- **Time estimates**: every reading, exercise, stage and checkpoint shows an orientative time (`~12 min`), with the time left per stage and for the whole route. Reading is a study pace of about 35 words per minute (formulas count as three words, minimum 3 minutes); an exercise is the time the exam gives it ×1.25 plus the time to check it (warm-ups go by difficulty); a checkpoint is an exam plus 20 minutes to mark it. The model is in `app/logic.js`.
- **Streak flame**: the top bar and **Hoy** show a flame that is lit once you have done something today, dim while the streak is at risk and off at zero.
- **Gear menu** (top right): the only place for settings. Theme (system, light, dark) and accent colour (presets, a picker, or any CSS colour; it colours buttons, bars, the flame, the logo and the tab icon), route and organisation, daily goal, stopwatch, exam realism, and the data (export, import, reset, shared file). Theme, accent, route and organisation are saved in the browser apart from the progress; resetting progress keeps them. The old `#/ajustes` address now opens the menu.
- **Rating** after each exercise: Fallé / Dudoso / Dominado. The rating buttons appear after you have seen the whole solution, or at once if you press *Lo resolví sin ver la solución* (no help used, full XP). XP depends on points, hints used and rating; finishing a stage gives a bonus.
- **Examen**: every past exam can be sat whole (clock, then you mark your own answers) or done exercise by exercise from the list, with the hints and the solution of any other exercise. What the whole-exam simulator allows is set in the gear menu → *Simulador de examen*: the countdown, ending by itself when the time is up, hints and solutions while sitting. Two presets, *Examen real* and *Relajado*. Help used costs XP like in the exercises (a hint 25%, a solution 75% of that exercise's share); the mark you give yourself is never changed.
- **Sin papel** (its own tab in the top bar): practice for when you only have the laptop. Nothing to write by hand, everything is answered with clicks and checked at once, and every list shows how many you have got right.
  - *Ejercicios generados* (10 questions a round, 0.3 XP per right answer): questions made on the spot, so they never run out and the numbers change every time. Master theorem, recurrences by subtraction, cost of nested loops, ordering functions by growth, closed forms of sums, logarithms and powers. Each answer comes with the reason.
  - *Trazar el algoritmo* (6 questions, 0.5 XP each): run an algorithm in your head on a small random input and say what it does. Towers of Hanoi, Fibonacci calls, merge sort comparisons, binary search, Lomuto partition, activity selection, greedy coins (and when greedy is not optimal), n queens, subset sums, Dijkstra. The answers come from real implementations.
  - *Completar el código* (up to 5 questions per fragment, 0.3 XP each): a line of code from the lecture notes is hidden and you pick the right one among slips on it (a changed bound, operator or constant) and lines of the same kind. One entry per code block of the lectures, filterable by tema.
  - *Test mixto* (0.5 XP per right answer): 8 questions from the quick checks, each from a different reading you have done.
  - Every exercise also has a **cuaderno**: a box to write your working on screen, with formulas between `$...$`, a live preview and buttons for common symbols. It is saved with your progress (and marked *notas* in the lists); then compare with the hints and the solution as usual.
  Each finished round is one entry in the **Registro** (filter *Sin papel*). The generators are in `app/practice.js`.
- **Registro**: every reading, quick check, exercise, exam and skipped step with its day and time, its rating and XP, and how long it took when the stopwatch (gear menu → *Estudio*) was on. It can be filtered by type. Without the stopwatch each entry counts with its time estimate in the day totals.
- **Settings that travel with the progress** (daily goal, stopwatch, exam realism) are saved inside the progress, so a [shared progress file](#share-it-between-profiles-and-computers) carries them to your other profiles. Resetting the progress keeps them. The gear-menu options (theme, accent, route, organisation) stay per browser profile.
- **Resumen**: one sheet per etapa (per tema when organised by temas) with the formulas, schemes and typical mistakes to remember. It is a quick reference: it has its own tab, a row at the top of every block in **Ruta** and a link in the first hint of each exercise, and it is not a route step, so it does not count towards progress. The sheets live in `content/summaries/<stage id>.md`.
- **Peldaños**: short graded exercises that lead from each reading into the harder exercises, so that no step of the route is a jump. They live in `content/peldanos/<stage id>.md`: `stage:` the etapa, an `## Orden` list that says, reading by reading, the order of the route (`- t21-sumas-basicas: S08 S09 1.4 S10 ...`; a number like `1.4` is an existing extra exercise), and one `### S08 · Title` block per exercise with an optional `nivel:` (difficulty, never going down inside a reading), the statement, an optional `#### Pista` and a `#### Solución` written in steps (`**Paso 1.** ...`), which the app reveals one at a time. They are exercises like the others (hints, rating, notebook, log) and work without the exam data. Every peldaño prepares a topic that some exam or extra exercise actually asks; topics that no exercise uses (for example quicksort or k-means) get none. They are original and licensed CC BY-SA 4.0.
- **Hints**: the first hint names the skill and links the theory and the summary. Exercises with an official solution then show its first lines and, last, the whole solution. For the extra exercises that come without one, `content/exams/soluciones/<exam id>.md` can hold a proposed solution written in steps (`**Paso 1.** ...`); the app reveals it one step at a time and labels it *solución propuesta* (unofficial). Every exercise without an official solution has one.
- **Teoría**: the lecture notes, with deep links from hints and roadmap steps. Teoría and Resumen are browsed the same way: a picker (tema or etapa) at the top of the sidebar, a filter, the outline of the sections (it follows what you read), and previous/next at both ends of the text. The figures are cropped from the slides (`app/img/`, listed in `tools/figures.json`); `python3 tools/figures.py <folder with the slide PDFs>` regenerates them (needs `pdftoppm` and ImageMagick).

## Layout

```
content/lectures/   lecture notes (temas 1-7) converted from the slides (CC BY-SA 4.0)
content/summaries/  one summary sheet per etapa: formulas and things to remember (CC BY-SA 4.0)
content/quizzes/    the quick checks after each reading (CC BY-SA 4.0)
content/peldanos/   the graded exercises that lead into the harder ones, per etapa (CC BY-SA 4.0)
content/exams/      past exams and extra exercises (CC BY-SA 4.0, see Licensing), and soluciones/ with proposed, unofficial solutions
tools/build.py      Markdown -> app/data-lectures.js, app/data-exams.js (both committed)
tools/skills.json   skills, theory links, tagging patterns
tools/figures.*     slide figures: figures.json (page and crop of each) and figures.py (cuts them out of the PDFs)
tools/roadmap.json  stages, theory per stage, manual stage overrides
tools/check-*.js    node checks: math rendering, roadmap logic, app click-through
tools/route-table.js  prints the route (readings, checks, exercises) to review how it alternates
LICENSE, NOTICE    the code licence and the licences, changes and disclaimers of the content
app/                index.html, app.js, logic.js (pure roadmap/SRS/time logic), practice.js (generators of the practice without paper), theme.js (theme and accent, loaded in <head>), logo.js, md.js, style.css, img/ (figures), vendor/katex
```

## Legal notice and licensing

### Short version

| What | Licence | Where |
| --- | --- | --- |
| Code of the app and the tools | MIT | `app/*.js`, `app/*.html`, `app/*.css`, `tools/` (`LICENSE`) |
| Lecture notes (converted from the slides) and the 48 figures cut from them | CC BY-SA 4.0 | `content/lectures/`, `app/img/` |
| Past exams and additional exercises (converted from the author's PDF) | CC BY-SA (the PDF's cover shows the BY-SA badge, no version; taken as 4.0) | `content/exams/`, `app/data-exams.js` |
| Summaries, quick checks, peldaños, proposed solutions (written for this project) | CC BY-SA 4.0 | `content/summaries/`, `content/quizzes/`, `content/peldanos/`, `content/exams/soluciones/` |
| KaTeX (maths renderer) | MIT, its own licence | `app/vendor/katex/` |

The full text, the changes made and the disclaimers are in [`NOTICE`](NOTICE) and [`LICENSE`](LICENSE).

### What you must know

- **Unofficial.** This is an independent student project. It is **not** affiliated with, sponsored by or endorsed by the Universidad Rey Juan Carlos or by Manuel Rubio Sánchez, and he has not reviewed it. Their names only credit the source.
- **Source and credit.** The lecture notes, exams and additional exercises are by **Manuel Rubio Sánchez** (Universidad Rey Juan Carlos, *Diseño y Análisis de Algoritmos*, Grado en Ingeniería Informática), under Creative Commons Attribution-ShareAlike. The licence says what it allows: <https://creativecommons.org/licenses/by-sa/4.0/deed.en>.
- **They were changed.** The PDFs were converted to Markdown, the maths was transcribed to LaTeX, figures were replaced by descriptions or tables, and exams were split into statements and solutions by a script. **Errors may exist** and the text may differ from the official material. Check anything important against the official slides and your teachers.
- **The proposed solutions are not official.** For the exercises that come without a solution, a solution was written for this project (marked *solución propuesta* in the app). It can be wrong. It is not how the teachers will mark.
- **No warranty.** Everything is provided "as is". Using the app does not predict or guarantee any exam result. Your progress is stored only in your browser: back it up (see [Your progress](#your-progress-read-this)).
- **The exam licence is read from a badge.** The cover page of the author's PDF ("Exámenes de años anteriores y ejercicios adicionales", 17 Dec 2023) shows the CC BY-SA badge without a version number. It is taken to be 4.0, like the author's slides. If the author or the university says otherwise, or asks for the exams to be removed, open an issue and they will be removed.

### If you reuse or redistribute this

CC BY-SA lets you copy, share and adapt the content, even commercially, **if** you: (1) give credit to the original author and to this project, (2) say what you changed, (3) link the licence, (4) release your version under the **same** licence, and (5) add no extra restrictions. Keep `NOTICE` with the content. The code is MIT: keep `LICENSE`. A suggested credit line:

> Based on "Diseño y Análisis de Algoritmos" material by Manuel Rubio Sánchez (URJC), CC BY-SA 4.0, adapted in dyaa-practice (https://github.com/suto-sec/dyaa-practice). Changes: converted to Markdown/web app, exercises and solutions added.

### Aviso legal (resumen en español)

Proyecto independiente y **no oficial**: no está afiliado ni respaldado por la Universidad Rey Juan Carlos ni por el autor del material, Manuel Rubio Sánchez. Los apuntes, los exámenes y los ejercicios adicionales proceden de su material, publicado con licencia Creative Commons Reconocimiento-CompartirIgual (CC BY-SA); aquí están **adaptados** (convertidos a Markdown, con las fórmulas y las figuras transcritas), así que pueden contener **errores**. Las soluciones marcadas como *solución propuesta* las ha escrito este proyecto: **no son oficiales** y pueden estar mal. Todo se ofrece «tal cual», sin garantía, y no asegura ningún resultado en el examen: contrasta lo importante con el material oficial y con tus profesores. Si reutilizas el contenido debes citar al autor, indicar los cambios y mantener la misma licencia (CC BY-SA); el código es MIT.
