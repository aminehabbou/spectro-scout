# Spectro Scout — AFS Solution Design Copilot (materials-grounded edition)

A polished React/Vite hackathon prototype for the Art Fiber Systems in-line spectroscopy solution-design challenge. This version is grounded in the supplied `materials.zip`, not generic internet content.

## Run on Windows using Docker (no Windows npm install required)

1. Extract the project ZIP.
2. Open Command Prompt in the `spectro-scout` folder (the folder containing `package.json`).
3. Make sure Docker Desktop is running.
4. Install dependencies:

   ```cmd
   docker run --rm -it -v "%cd%":/app -w /app node:24-slim npm install
   ```

5. Start the development server:

   ```cmd
   docker run --rm -it -v "%cd%":/app -w /app -p 5173:5173 node:24-slim npm run dev -- --host 0.0.0.0
   ```

6. Open http://localhost:5173/ and keep the terminal open.

If you already have Node.js/npm installed on Windows, you can instead run `npm install` and `npm run dev`.

## What's in this version

- Original dark technical dashboard and interactive intake/result tabs.
- Six official final-evaluation cases (H01–H06) preloaded as buttons, using their supplied wording and facts.
- Scenario-specific handling for calibration transfer, clear versus opaque dairy interfaces, fluorescence target validity, MIR fiber compatibility, undefined off-spec liquid, and clinical-readiness limits.
- Recommendations, explicit unknowns, feasibility experiments, decision status, and visible source references.
- Original `materials.zip` copied unchanged to `reference/materials.zip` for review.
- Local deterministic rules only; no external API, no web calls, no data upload, and no generative model.

## Source basis

See `reference/README.md` for a source inventory and how the app uses the files. The main technical sources are S01 (method/application guide), S02 (process-control slides), the method-comparison spreadsheet, and research papers S03/S04 for appropriately bounded research context. The supplied customer scenario file defines the H01–H06 presets.

## Important limitations

- The app is decision support, not an instrument specification or validated analyzer.
- Fit scores are heuristic ranking aids, not probabilities, detection limits, accuracy claims, or measured performance.
- A nominal method range is not a guarantee that a specific instrument/fiber/probe covers that range.
- The app does not have live spectral data, does not train calibrations, and does not validate medical or industrial performance.
- Confirm claims, fiber/probe compatibility, process ratings, safety, and acceptance criteria with AFS experts.

## Suggested demo

1. Load H01 to show why a new formulation must challenge the existing NIR calibration and why adding Raman cannot magically preserve it.
2. Load H02 to show separate measurement geometries for relatively clear whey and opaque concentrate.
3. Load H03 to show sensitivity is not the same as direct analyte specificity.
4. Load H04 to demonstrate spectral-range/fiber compatibility is a hard gate.
5. Load H05 to show the assistant refuses to invent a “best” configuration without a defined target.
6. Load H06 to demonstrate research evidence is not clinical readiness.
