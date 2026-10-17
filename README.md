<div align="center">

# Spectro Scout

### A materials-grounded solution-design copilot for in-line spectroscopy

Turn an industrial measurement challenge into an explainable first assessment—with candidate methods, rationale, open questions, and a practical feasibility plan.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=20232A)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?logo=javascript&logoColor=222222)
![Node.js](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-Not_specified-lightgrey)

**Built for the Art Fiber Systems (AFS) in-line spectroscopy solution-design challenge.**

</div>

---

## Contents

- [Overview](#overview)
- [Features](#features)
- [Methods covered](#methods-covered)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Run with Docker](#run-with-docker)
- [Run the scenario checks](#run-the-scenario-checks)
- [How to use the app](#how-to-use-the-app)
- [Evidence and reference materials](#evidence-and-reference-materials)
- [Architecture and decision logic](#architecture-and-decision-logic)
- [Limitations and responsible use](#limitations-and-responsible-use)
- [Roadmap ideas](#roadmap-ideas)
- [Contributing](#contributing)

## Overview

**Spectro Scout** is a client-side React application that helps structure an initial spectroscopy solution-design discussion. A user describes the process, target analyte or property, sample matrix, operating environment, measurement goal, and available reference data. The app then generates a transparent, rule-based assessment.

The project is deliberately **materials-grounded and deterministic**: its recommendation logic is implemented locally in `src/engine.js` and informed by the supplied AFS reference pack. It does **not** call an LLM, external API, web service, or spectral database, and it does not upload the entered information.

> Spectro Scout is a decision-support prototype—not a validated analyzer, a final instrument specification, or a substitute for review by AFS technical experts.

## Features

- **Interactive application intake** for the customer’s process, target, matrix, environment, goal, and reference method/data.
- **Ranked method candidates** with heuristic fit scores, explanations, potential strengths, and watch-outs.
- **Explicit unknowns and clarifying questions** to make gaps visible rather than silently filling them with assumptions.
- **Feasibility-first experiment plans** with practical steps and proposed success criteria.
- **Decision gates and scope warnings** when the input does not support a defensible recommendation.
- **Method guide** for quickly comparing the spectroscopy families covered by the prototype.
- **Six preloaded evaluation scenarios (H01–H06)** based on the supplied final-evaluation cases.
- **Source references** surfaced with assessments to help reviewers trace the reasoning back to the supplied materials.
- **Responsive dark technical dashboard** built with React components and custom CSS.
- **Local-only operation** with deterministic rules; no API key or model download is needed.

## Methods covered

The local method library includes:

| Method | Abbreviation in the app | Typical role in the prototype |
|---|---|---|
| Near-infrared spectroscopy | NIR | Candidate for composition or concentration trends, depending on matrix and calibration evidence |
| Mid-infrared / Fourier-transform infrared | MIR / FTIR | Candidate for suitable liquid, paste, or contact-interface applications; compatibility must be checked |
| Raman spectroscopy | Raman | Complementary molecular fingerprinting candidate; fluorescence and signal quality need assessment |
| Fluorescence | Fluorescence | Appropriate only when a relevant fluorescent target/marker and validated relationship are established |
| Ultraviolet–visible spectroscopy | UV-Vis | Optical signal or composition-related candidate within a defined use case |
| Combined methods | NIR + Raman / combination | Considered only as a testable hypothesis after single-method baselines are evaluated |

The table describes how the prototype frames candidate methods, not guaranteed application performance. A method’s suitability depends on the target, sample matrix, instrument, probe/interface, process conditions, calibration, and reference measurements.

## Technology stack

All links below point to the official project or documentation pages.

| Technology | Purpose | Official link |
|---|---|---|
| React 18 | Component-based user interface and state | [react.dev](https://react.dev/) |
| Vite 6 | Front-end development server and production build | [vite.dev](https://vite.dev/) |
| JavaScript (ES modules) | UI and local assessment logic | [MDN JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) |
| Node.js | JavaScript runtime and scenario-check execution | [nodejs.org](https://nodejs.org/) |
| npm | Dependency installation and project scripts | [npm documentation](https://docs.npmjs.com/) |
| Lucide React | Interface icons | [lucide-react on GitHub](https://github.com/lucide-icons/lucide) |
| CSS | Custom dashboard styling and responsive layout | [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) |
| Docker (optional) | Run Node/npm commands in a container without a local Node installation | [Docker documentation](https://docs.docker.com/) |

### Badges

The badges at the top use Shields.io static badges, so they do not depend on a GitHub Actions workflow or repository statistics endpoint. Version labels reflect the versions declared in this project’s `package.json`; update them if dependencies change.

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Node.js](https://nodejs.org/)
- [Lucide](https://lucide.dev/)
- [Shields.io](https://shields.io/)

No GitHub Actions build badge is included because the repository archive does not contain a workflow under `.github/workflows/`. Add one before publishing a workflow-status badge.

## Project structure

```text
spectro-scout-main/
├── index.html                    # HTML entry point and page metadata
├── package.json                  # Scripts and dependencies
├── package-lock.json             # Locked npm dependency tree
├── .gitignore
├── scripts/
│   └── test-scenarios.mjs        # Assertions for official H01–H06 cases
├── reference/
│   ├── README.md                 # Inventory and provenance of reference pack
│   └── materials.zip             # Original supplied reference materials
└── src/
    ├── main.jsx                  # React application bootstrap
    ├── App.jsx                   # Dashboard, intake, tabs, and results UI
    ├── engine.js                 # Local method library and decision rules
    └── styles.css                # Dashboard styling
```

## Requirements

Choose one of the following:

- **Local development:** Node.js and npm installed. Node.js 20+ is a practical baseline for this Vite project; Node.js 24 is also suitable.
- **Docker-based development:** Docker Desktop or Docker Engine running. This avoids installing Node.js/npm directly on the host.

Check your installation:

```bash
node --version
npm --version
```

## Getting started

Run these commands from the directory containing `package.json`.

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Vite will print the local URL—normally [http://localhost:5173](http://localhost:5173). Open it in your browser. Keep the terminal running while using the development server.

### 3. Create a production build

```bash
npm run build
```

The optimized static site is written to `dist/`.

### 4. Preview the production build locally

```bash
npm run preview
```

Use the URL printed by Vite to view the production build.

## Run with Docker

These commands use the official Node image and mount the current project directory into the container. Run them from the project root.

### macOS / Linux

Install dependencies:

```bash
docker run --rm -it -v "$PWD":/app -w /app node:24-slim npm install
```

Start the development server:

```bash
docker run --rm -it -p 5173:5173 -v "$PWD":/app -w /app node:24-slim npm run dev -- --host 0.0.0.0
```

Open [http://localhost:5173](http://localhost:5173).

### Windows Command Prompt

Install dependencies:

```cmd
docker run --rm -it -v "%cd%":/app -w /app node:24-slim npm install
```

Start the development server:

```cmd
docker run --rm -it -p 5173:5173 -v "%cd%":/app -w /app node:24-slim npm run dev -- --host 0.0.0.0
```

Open [http://localhost:5173](http://localhost:5173). Keep the terminal open while using the app.

> **Docker note:** `node_modules` is installed into the mounted project directory by these commands. If you prefer to keep container dependencies isolated, use a named volume for `/app/node_modules` and adjust the commands accordingly.

## Run the scenario checks

The repository includes a Node.js assertion script for the six official evaluation scenarios. Run:

```bash
npm run test:scenarios
```

Expected successful output:

```text
Passed: H01–H06 scenario-grounding checks.
```

The checks confirm that all six cases exist, key decision outcomes and feasibility plans are present, and each case includes source references. They are lightweight regression checks—not scientific validation of spectroscopy performance.

## How to use the app

1. Open **Application assessment**.
2. Describe the process or customer problem in the use-case field.
3. Enter the target analyte/property and sample matrix.
4. Add operating conditions, the desired measurement goal, and available reference method/data where known.
5. Generate the assessment.
6. Review candidate methods, the reasoning behind their ranking, unknowns, watch-outs, and the feasibility plan.
7. Resolve high-priority questions with the customer and AFS experts before selecting hardware or making performance claims.

### Included evaluation scenarios

| Scenario | Main lesson demonstrated |
|---|---|
| H01 | A changed pharmaceutical formulation challenges calibration transfer; evaluate methods independently before testing a combined model |
| H02 | Relatively clear whey and opaque concentrate may require different measurement interfaces |
| H03 | Sensitivity alone does not establish that fluorescence directly measures glucose or viable biomass |
| H04 | Spectral range and fiber/interface compatibility are hard feasibility gates |
| H05 | An undefined target or off-spec condition is not enough to select a “best” configuration |
| H06 | Research proof-of-concept is not evidence of readiness for clinical decision-making |

Load a scenario using its button in the application, then inspect the assessment and feasibility plan.

## Evidence and reference materials

The `reference/materials.zip` file is retained for traceability. See [`reference/README.md`](reference/README.md) for the supplied-source inventory and how the local rules use it.

The reference pack includes:

- AFS method/application guidance and method-comparison information.
- Process-control and fiber-transmission context.
- Worked examples and the supplied H01–H06 customer evaluation scenarios.
- Research papers used as bounded context, not as proof of product or clinical readiness.

The assessment displays source references where available. Review the original documents and confirm page-level interpretations before using results in a customer-facing or engineering decision.

## Architecture and decision logic

The application is a **front-end-only prototype**:

1. `src/App.jsx` collects intake data, loads sample scenarios, and renders the results.
2. `src/engine.js` evaluates the inputs using explicit scenario handling and local rules.
3. The engine returns candidate methods, heuristic scores, rationale, missing information, source references, and feasibility steps.
4. `src/styles.css` styles the dashboard.

There is no separate backend service, database, authentication layer, generative AI integration, or remote inference call in the supplied project. The browser runs the assessment logic locally.

## Limitations and responsible use

- **Not a validated analyzer:** this prototype supports early-stage solution design only.
- **Heuristic scores are not probabilities:** they are ranking aids, not measured accuracy, detection limits, uncertainty estimates, or guarantees.
- **Calibration must be validated:** a method or model that works on one formulation, matrix, instrument, or process may not transfer to another.
- **Compatibility is a hard gate:** confirm the actual wavelength range, fiber, probe, interface materials, temperature/pressure ratings, cleaning requirements, and installation constraints with AFS.
- **Reference data matters:** establish appropriate laboratory/reference measurements, sample alignment, acceptance thresholds, and independent validation sets.
- **Research is not deployment evidence:** a paper or proof-of-concept does not establish industrial or clinical readiness.
- **Human review is required:** do not use the app alone to select equipment, approve a process, make safety-critical decisions, or support medical decisions.

## Roadmap ideas

Potential extensions, not currently implemented:

- Add unit and integration tests for general input combinations in addition to H01–H06.
- Add a documented, reproducible evidence schema for method claims and source/page citations.
- Export assessments to Markdown or PDF with assumptions and unresolved questions.
- Add structured user feedback and expert review workflows.
- Add an optional backend only if a clear requirement arises, with privacy, security, and deployment boundaries documented.
- Add CI using GitHub Actions, then publish a workflow badge tied to the actual workflow file.

## Contributing

Contributions that improve explainability, source traceability, accessibility, test coverage, and technical caution are welcome.

1. Fork the repository and create a feature branch.
2. Make a focused change.
3. Run `npm run test:scenarios` and `npm run build`.
4. Open a pull request describing the change, evidence, and any limitations.

## Acknowledgements

Developed for the **Art Fiber Systems in-line spectroscopy solution-design challenge**, using the supplied reference materials included in the project archive.
