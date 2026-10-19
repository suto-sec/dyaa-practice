# dyaa-practice

Self-graded practice app for *Diseño y Análisis de Algoritmos*. Exercises are done on paper, so there is no automatic feedback on your work. The app handles the rest: it gives you a **roadmap** (what to read and which exercise to do after which), hides solutions behind a hint ladder, schedules reviews, and tracks XP, streaks and skill mastery.

Static web app: no server, no installation and no build step to use it (open `app/index.html`). Progress is stored in the browser (`localStorage`) and can be exported and imported as JSON. Nothing is locked: the roadmap recommends an order, but you can open any exercise or exam at any time.

## Contents

- [Install and open](#install-and-open): Linux, Windows, macOS
- [First minutes](#first-minutes)
- [Your progress](#your-progress-read-this) (and [sharing it between profiles](#share-it-between-profiles-and-computers))
- [Adding the exams](#adding-the-exams-optional)
- [Something does not work](#something-does-not-work)
- [How it works](#how-it-works), [Layout](#layout), [Licensing](#licensing)

## Install and open

There is nothing to install. The app is a folder of web files: you open one of them (`app/index.html`) in a browser. No account, no server, no internet connection needed (everything it uses, including the maths renderer, is in the folder). The app itself is in Spanish.

You need a recent browser (Firefox, Chrome, Chromium, Edge, Safari, Brave...). Python and Node are **not** needed to use it.

### Step 1. Get the folder

Pick one:

- **Download a ZIP**: on the GitHub page of the repository press the green **Code** button, then **Download ZIP**. Unzip it. (The repository is private: you must be logged in to an account with access, or ask the owner for the ZIP.)
- **With git**: `git clone https://github.com/suto-sec/dyaa-practice.git` (needs access to the private repository).

Put the unzipped folder somewhere permanent (for example `Documents`), because moving it later can make some browsers forget your progress (see [Your progress](#your-progress-read-this)).

### Step 2. Open `app/index.html`

**Linux**

1. Open the folder in your file manager, go into `app/`, and double-click `index.html`. If it opens in a text editor instead, right-click → *Open With* → your browser.
2. Or from a terminal, inside the folder: `xdg-open app/index.html` (or `firefox app/index.html`, `chromium app/index.html`).

**Windows**

1. Right-click the downloaded ZIP → *Extract All…* (do not run the app from inside the ZIP window: it will not work).
2. Open the extracted folder, go into `app`, and double-click `index.html`. If Windows asks which program to use, choose your browser (Edge is already installed).
3. Or in PowerShell, inside the folder: `start app\index.html`.

**macOS**

1. Double-click the ZIP to unzip it, open the folder, go into `app`, and right-click `index.html` → *Open With* → your browser (Safari is already installed). Double-clicking may open a text editor.
2. Or in Terminal, inside the folder: `open app/index.html`.

### Step 3. Bookmark it

When the page opens, the address starts with `file://`. That is normal. Bookmark it (Ctrl+D, or ⌘+D on macOS) so you can come back without searching for the file.

## First minutes

1. You land on **Hoy** (today). Press the suggested next step; it is either something to read or an exercise.
2. **Exercises are done on paper.** The app shows the statement (and, if you turn the stopwatch on in the gear menu, how long you take). Try it yourself, then open the hints one at a time (each one costs a bit of XP), and finally compare with the solution.
3. Rate yourself honestly: **Fallé**, **Dudoso** or **Dominado**. A *Fallé* is not a punishment: it just comes back later in **Hoy** for review.
4. **Every setting is in the gear icon** (top right), in sections: *Apariencia* (theme, accent colour), *Ruta de estudio* (*Temario completo* or *Primer examen*, organise by *Etapas* or *Temas*), *Estudio* (daily goal, stopwatch), *Simulador de examen* and *Datos y progreso compartido* (export, import, reset, shared file). Buttons in the pages that talk about a setting open the menu at that section.
5. Nothing is locked. **Ruta** only recommends an order; you can open any exercise, exam or lecture at any time.

## Your progress (read this)

Your progress lives **inside the browser**, not in the folder. So:

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

## Adding the exams (optional)

A fresh download only contains the lectures. The past exams and extra exercises are **not** in this repository (the author has not licensed them, see [Licensing](#licensing)), so without them the app runs and shows the theory, but the exercise bank, the roadmap exercises and the exam simulator are empty.

If you have the exams as `.md` files:

1. Install Python 3.
   - **Linux**: it is usually installed already (`python3 --version`); otherwise `sudo apt install python3` (Debian/Ubuntu), `sudo dnf install python3` (Fedora) or `sudo pacman -S python` (Arch).
   - **Windows**: install it from <https://www.python.org/downloads/> and tick *Add python.exe to PATH* in the installer. Then use `py` where this guide says `python3`.
   - **macOS**: `python3 --version` (macOS offers to install the developer tools the first time); or install it from <https://www.python.org/downloads/>.
2. Copy the exam files into `content/exams/`.
3. In a terminal inside the folder run `python3 tools/build.py` (Windows: `py tools\build.py`). It creates `app/data-exams.js`.
4. Reload the page in the browser.

Re-run step 3 whenever you change the exam files. `app/data-exams.js` and `content/exams/` are ignored by git on purpose; never publish them.

## Something does not work

| What you see | What to do |
| --- | --- |
| A blank page, or a message about JavaScript | Enable JavaScript in the browser, and reload. Open `app/index.html`, not another file. |
| The file opens as text, or in an editor | Open it with a browser instead (see Step 2). |
| Formulas appear as raw `$...$` text or look broken | The download is incomplete: `app/vendor/katex/` is missing. Download the repository again, and unzip all of it. |
| Pictures in the lectures are missing | Same: `app/img/` is missing. |
| A yellow box saying "Datos de examen no encontrados", or empty stages | The exams are not added yet, see [Adding the exams](#adding-the-exams-optional). |
| Progress disappeared | Different browser or window, cleared site data, or the folder was moved. Import your last backup from the gear menu (*Datos*). |
| Changes to the content do not show | Run `python3 tools/build.py` again and reload the page (Ctrl+F5). |
| Windows: nothing happens when you open it from the ZIP | Extract the ZIP first. |

## For developers

Checks (need Node 18 or newer): `node tools/check-math.js`, `node tools/check-logic.js`, `node tools/check-app.js`.

`python3 tools/build.py` regenerates `app/data-lectures.js` (committed) and `app/data-exams.js` (not committed) from `content/`. Edit `content/lectures/*.md` or `tools/roadmap.json` and run it again. Regenerating the slide figures needs `pdftoppm` and ImageMagick (`tools/figures.py`).

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
- **Rating** after each exercise: Fallé / Dudoso / Dominado. XP depends on points, hints used and rating; finishing a stage gives a bonus.
- **Examen**: every past exam can be sat whole (clock, then you mark your own answers) or done exercise by exercise from the list, with the hints and the solution of any other exercise. What the whole-exam simulator allows is set in the gear menu → *Simulador de examen*: the countdown, ending by itself when the time is up, hints and solutions while sitting. Two presets, *Examen real* and *Relajado*. Help used costs XP like in the exercises (a hint 25%, a solution 75% of that exercise's share); the mark you give yourself is never changed.
- **Sin papel** (its own tab in the top bar): for when you only have the laptop. *Test mixto*: 8 questions, each from a different reading you have done, taken from the quick checks (0.5 XP per right answer). *Ordenar los pasos*: an exercise with a proposed solution written in steps, shuffled; you tap the steps in order (needs `content/exams/soluciones/`). There is no mode to switch: you pick whichever entry fits what you have at hand.
- **Registro**: every reading, quick check, exercise, exam and skipped step with its day and time, its rating and XP, and how long it took when the stopwatch (gear menu → *Estudio*) was on. It can be filtered by type. Without the stopwatch each entry counts with its time estimate in the day totals.
- **Settings that travel with the progress** (daily goal, stopwatch, exam realism) are saved inside the progress, so a [shared progress file](#share-it-between-profiles-and-computers) carries them to your other profiles. Resetting the progress keeps them. The gear-menu options (theme, accent, route, organisation) stay per browser profile.
- **Resumen**: one sheet per etapa (per tema when organised by temas) with the formulas, schemes and typical mistakes to remember. It is a quick reference: it has its own tab, a row at the top of every block in **Ruta** and a link in the first hint of each exercise, and it is not a route step, so it does not count towards progress. The sheets live in `content/summaries/<stage id>.md`.
- **Hints**: the first hint names the skill and links the theory and the summary. Exercises with an official solution then show its first lines and, last, the whole solution. For the extra exercises that come without one, `content/exams/soluciones/<exam id>.md` can hold a proposed solution written in steps (`**Paso 1.** ...`); the app reveals it one step at a time and labels it *no oficial*.
- **Teoría**: the lecture notes, with deep links from hints and roadmap steps. Teoría and Resumen are browsed the same way: a picker (tema or etapa) at the top of the sidebar, a filter, the outline of the sections (it follows what you read), and previous/next at both ends of the text. The figures are cropped from the slides (`app/img/`, listed in `tools/figures.json`); `python3 tools/figures.py <folder with the slide PDFs>` regenerates them (needs `pdftoppm` and ImageMagick).

## Layout

```
content/lectures/   lecture notes (temas 1-7) converted from the slides (CC BY-SA 4.0)
content/summaries/  one summary sheet per etapa: formulas and things to remember (CC BY-SA 4.0)
content/quizzes/    the quick checks after each reading (CC BY-SA 4.0)
content/exams/      past exams and extra exercises, and soluciones/ with proposed solutions (NOT in git, see below)
tools/build.py      Markdown -> app/data-lectures.js, app/data-exams.js
tools/skills.json   skills, theory links, tagging patterns
tools/figures.*     slide figures: figures.json (page and crop of each) and figures.py (cuts them out of the PDFs)
tools/roadmap.json  stages, theory per stage, manual stage overrides
tools/check-*.js    node checks: math rendering, roadmap logic, app click-through
tools/route-table.js  prints the route (readings, checks, exercises) to review how it alternates
app/                index.html, app.js, logic.js (pure roadmap/SRS/time logic), theme.js (theme and accent, loaded in <head>), logo.js, md.js, style.css, img/ (figures), vendor/katex
```

## Licensing

- Code: MIT (`LICENSE`).
- Lectures: CC BY-SA 4.0, adapted from slides by Manuel Rubio Sánchez (URJC). See `NOTICE`.
- Exams and extra exercises: no license grant from the author, so they are excluded from version control and are for personal study only. See `NOTICE`.
- KaTeX is vendored under its own MIT license in `app/vendor/katex/`.
