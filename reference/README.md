# Supplied hackathon reference materials

`materials.zip` is the original archive supplied for this task, included unchanged for traceability.

The local decision rules in `src/engine.js` were authored from these supplied sources:

- `AFS_Examples_and_Reference.docx`: development scenarios D01–D08, worked examples, method overview, fiber-family transmission table and source/page guidance.
- `AFS_method_comparison_table.xlsx`: machine-readable transcription of S01 Table 1, including measurement geometries and qualitative sensitivity/selectivity/cost ratings.
- `customer_scenarios_for_final_evaluation.txt`: official H01–H06 evaluation scenarios. The app exposes all six as loadable test cases.
- `S01_Multispectral_Laboratory.pdf`: method overview, probe geometry and pharmaceutical, bioprocess, dairy and other application examples.
- `S02_AFS_Process_Control_Slides.pdf`: fiber transmission, petroleum water and polymer extrusion context.
- `S03_LED_Kidney_Study_2017.pdf`: research proof-of-concept on in-vitro kidney samples; not evidence of live-surgery readiness.
- `S04_Combi_MIR_Fluorescence_2021.pdf`: research on combined MIR ATR and fluorescence measurements in model biological tissues.
- `S05_AFS_Flyer.pdf` and `S06_Laboratory_Link.txt`: business context, not technical-performance evidence.

The engine uses explicit scenario rules plus general rules grounded in the reference pack. It does not call an external API, browse the web, query a spectral database, or use a generative model. Scores are heuristic ordering aids, not probabilities or measured performance. Source/page references are displayed in the results when available. Verify every technical claim and exact component compatibility with AFS experts.
