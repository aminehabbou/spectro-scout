import React, { useMemo, useState } from 'react';
import { Activity, ArrowRight, Atom, Beaker, Check, ChevronDown, CircleHelp, ClipboardCheck, FlaskConical, Gauge, Microscope, RotateCcw, ShieldCheck, Sparkles, Waves } from 'lucide-react';
import { analyzeCase, evaluationScenarios } from './engine.js';

const examples = evaluationScenarios;

const empty = { useCase:'', target:'', matrix:'', environment:'', goal:'', reference:'' };

function Field({label, hint, children}) {
  return <label className="field"><span className="field-label">{label}</span>{children}{hint && <span className="field-hint">{hint}</span>}</label>;
}
function Pill({children, tone='neutral'}) { return <span className={`pill ${tone}`}>{children}</span>; }
function BookOpenIcon(){ return <div className="review-note-icon">SRC</div>; }

export default function App() {
  const [form, setForm] = useState(empty);
  const [result, setResult] = useState(null);
  const [tab, setTab] = useState('assessment');
  const [showAll, setShowAll] = useState(false);
  const update = (key, value) => setForm(prev => ({...prev, [key]: value}));
  const filled = [form.useCase, form.target, form.matrix].filter(v => v.trim()).length;
  const run = () => { setResult(analyzeCase(form)); setTab('assessment'); };
  const loadExample = (item) => { setForm({useCase:item.useCase,target:item.target,matrix:item.matrix,environment:item.environment,goal:item.goal,reference:item.reference,scenarioId:item.id}); setResult(null); setTab('assessment'); };
  const reset = () => { setForm(empty); setResult(null); setTab('assessment'); };

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Waves size={23}/></div><div><div className="brand-name">spectro<span>scout</span></div><div className="brand-sub">AFS SOLUTION DESIGN</div></div></div>
      <div className="side-section-label">WORKSPACE</div>
      <button className={`nav-item ${tab==='assessment'?'active':''}`} onClick={()=>setTab('assessment')}><Microscope size={17}/> Application assessment <span className="nav-dot"/></button>
      <button className={`nav-item ${tab==='method'?'active':''}`} onClick={()=>setTab('method')}><Atom size={17}/> Method guide</button>
      <div className="sidebar-bottom">
        <div className="expert-card"><div className="expert-icon"><ShieldCheck size={17}/></div><div><strong>Expert-in-the-loop</strong><p>Transparent recommendations. Human review required.</p></div></div>
        <div className="partner"><span className="partner-dot"/> Built for <strong>Art Fiber Systems</strong></div>
        <div className="version">MATERIALS-GROUNDED · v2.0</div>
      </div>
    </aside>

    <main className="main">
      <header className="topbar"><div className="breadcrumb">Solution design <span>/</span> <strong>New assessment</strong></div><div className="top-actions"><span className="status"><span/> Decision-support mode</span><button className="icon-btn" title="Reset assessment" onClick={reset}><RotateCcw size={17}/></button><div className="avatar">AFS</div></div></header>
      <div className="page">
        <section className="hero">
          <div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> IN-LINE SPECTROSCOPY COPILOT</div><h1>From process challenge<br/><em>to a testable solution.</em></h1><p>Turn an industrial measurement question into a structured first assessment—methods, rationale, unknowns, and a practical feasibility experiment.</p>
            <div className="hero-tags"><span><Check size={13}/> Explainable by design</span><span><Check size={13}/> Expert-reviewed</span><span><Check size={13}/> Feasibility-first</span></div>
          </div>
          <div className="hero-art"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orbit orbit-c"/><div className="orb-core"><Waves size={39}/></div><div className="float-tag tag-a"><span className="mini-wave">∿</span> Optical signal</div><div className="float-tag tag-b"><Activity size={14}/> Process insight</div><div className="spectrum"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div>
        </section>

        <div className="section-heading"><div><div className="eyebrow muted">01 / APPLICATION INTAKE</div><h2>Tell us about the process</h2><p>Start with what the customer knows. Unknowns are surfaced—not silently assumed.</p></div><div className="completion"><div className="completion-top"><span>Intake completeness</span><strong>{Math.round(filled/3*100)}%</strong></div><div className="progress"><span style={{width:`${filled/3*100}%`}}/></div></div></div>

        <div className="workspace-grid">
          <section className="panel intake-panel">
            <div className="panel-head"><div className="panel-icon"><ClipboardCheck size={18}/></div><div><h3>Customer use case</h3><p>Describe the measurement challenge in plain language.</p></div><Pill tone="blue">Required starting point</Pill></div>
            <Field label="USE CASE DESCRIPTION" hint="What is happening in the process, and what decision should the measurement support?">
              <textarea value={form.useCase} onChange={e=>update('useCase',e.target.value)} placeholder="e.g. We need to track moisture in a moving polymer stream before extrusion..." rows={4}/>
            </Field>
            <div className="two-col">
              <Field label="TARGET PROPERTY / ANALYTE"><input value={form.target} onChange={e=>update('target',e.target.value)} placeholder="e.g. moisture, conversion, impurity"/></Field>
              <Field label="SAMPLE MATRIX"><select value={form.matrix} onChange={e=>update('matrix',e.target.value)}><option value="">Select sample type…</option>{['Liquid solution','Water-rich liquid','Slurry / suspension','Gas','Powder / solid granules','Polymer / fiber','Oil / organic liquid','Unknown / mixed'].map(x=><option key={x}>{x}</option>)}</select></Field>
            </div>
            <Field label="PROCESS ENVIRONMENT" hint="Temperature, pressure, flow, vibration, cleaning, hazardous area, or access constraints."><input value={form.environment} onChange={e=>update('environment',e.target.value)} placeholder="e.g. 80°C, pressurized pipe, CIP cleaning"/></Field>
            <div className="two-col">
              <Field label="MEASUREMENT GOAL"><input value={form.goal} onChange={e=>update('goal',e.target.value)} placeholder="e.g. trend every 10 seconds, ±2%"/></Field>
              <Field label="REFERENCE METHOD"><input value={form.reference} onChange={e=>update('reference',e.target.value)} placeholder="e.g. lab assay, GC, Karl Fischer"/></Field>
            </div>
            <div className="form-footer"><span className="privacy-note"><ShieldCheck size={14}/> Local evidence rules · grounded in supplied AFS materials</span><button className="primary-btn" onClick={run}><Sparkles size={16}/> Generate assessment <ArrowRight size={16}/></button></div>
          </section>

          <aside className="right-rail">
            <div className="panel examples-panel"><div className="small-panel-title"><FlaskConical size={16}/> TRY A SAMPLE CASE</div><p className="rail-description">Load one of the six official final-evaluation cases from materials.zip.</p>{examples.map((ex,i)=><button key={ex.id} className="example" onClick={()=>loadExample(ex)}><span className={`example-number n${(i%3)+1}`}>{ex.id}</span><span><strong>{ex.label}</strong><small>{ex.id==='H01'?'Calibration transfer · powder':ex.id==='H02'?'Two dairy streams · interfaces':ex.id==='H03'?'Fluorescence · target validity':ex.id==='H04'?'MIR · optical fiber compatibility':ex.id==='H05'?'Unknown off-spec liquid':'Research evidence · clinical boundary'}</small></span><ArrowRight size={15}/></button>)}</div>
            <div className="tip-card"><div className="tip-icon"><CircleHelp size={18}/></div><div><strong>Good inputs beat confident guesses</strong><p>Target chemistry, matrix, optical access, and the required response time usually decide which technique is worth testing first.</p></div></div>
            <div className="method-strip"><div className="method-strip-head"><span>METHODS IN SCOPE</span><span>5 families</span></div><div className="method-chips"><span>NIR</span><span>MIR / FTIR</span><span>Raman</span><span>UV-Vis</span><span>Fluorescence</span></div></div>
          </aside>
        </div>

        {result && <section className="results" id="results">
          <div className="result-banner"><div className="result-banner-icon"><Sparkles size={20}/></div><div><div className="eyebrow">ASSESSMENT GENERATED</div><h2>{result.title}</h2><p>{result.summary}</p></div><Pill tone={result.confidence==='Low'?'amber':'blue'}>{result.confidence} confidence</Pill></div>
          <div className="result-tabs"><button className={tab==='assessment'?'selected':''} onClick={()=>setTab('assessment')}>Recommendations <span>{result.recommendations.length}</span></button><button className={tab==='questions'?'selected':''} onClick={()=>setTab('questions')}>Clarifying questions <span>{result.missing.length}</span></button><button className={tab==='experiment'?'selected':''} onClick={()=>setTab('experiment')}>Feasibility plan</button><button className={tab==='method'?'selected':''} onClick={()=>setTab('method')}>Method guide</button></div>
          {tab==='assessment' && <div className="result-section"><div className="section-subhead"><div><h3>Promising spectroscopy approaches</h3><p>Ranked heuristic candidates—not a final instrument specification.</p></div><Pill>Why this ranking?</Pill></div><div className="recommendation-list">{result.recommendations.map((r,i)=><article className={`recommendation ${i===0?'recommended':''}`} key={`${r.key}-${i}`}><div className="rec-rank">{String(i+1).padStart(2,'0')}</div><div className="rec-main"><div className="rec-title-row"><h4>{r.name}</h4>{i===0&&<Pill tone="green">First to screen</Pill>}<Pill>{r.range}</Pill></div><div className="score-row"><span>Heuristic fit</span><div className="score-track"><span style={{width:`${r.score}%`}}/></div><strong>{r.score}/100</strong></div><p className="reason">{r.why}</p><div className="rec-detail-grid"><div><span className="detail-label">POTENTIAL STRENGTH</span><p>{r.strengths}</p></div><div><span className="detail-label">WATCH-OUTS</span><p>{r.limits}</p></div></div><div className="setup"><Beaker size={15}/><span><strong>Setup to investigate:</strong> {r.setup}</span></div>{r.caveats?.length>0&&<ul className="caveats">{r.caveats.map(c=><li key={c}>{c}</li>)}</ul>}</div></article>)}</div><div className="review-note"><ShieldCheck size={17}/><div><strong>Expert review checkpoint</strong><p>Confirm target-specific spectral features, process-compatible probe geometry, and any applicable safety or regulatory requirements before proposing hardware.</p></div></div></div>}
          {tab==='questions' && <div className="result-section"><div className="section-subhead"><div><h3>What we still need to know</h3><p>Resolve high-impact unknowns before committing to a method.</p></div></div>{result.missing.length===0?<div className="empty-good"><Check size={18}/> No major intake gaps detected. Verify details with the customer.</div>:<div className="question-list">{result.missing.map((q,i)=><div className="question" key={q.question}><div className="q-number">{String(i+1).padStart(2,'0')}</div><div><div className="q-title">{q.question} <Pill tone={q.priority==='High'?'amber':'neutral'}>{q.priority} priority</Pill></div><p>{q.why}</p></div></div>)}</div>}<div className="action-row"><button className="secondary-btn" onClick={()=>setTab('assessment')}>Back to recommendations</button><button className="primary-btn" onClick={()=>setTab('experiment')}>View feasibility plan <ArrowRight size={15}/></button></div></div>}
          {tab==='experiment' && <div className="result-section"><div className="section-subhead"><div><h3>{result.experiment.title}</h3><p>A low-cost screening experiment designed to retire the biggest technical risks.</p></div><Pill tone="green">Bench-first</Pill></div><div className="experiment-layout"><div className="experiment-steps"><h4><span className="step-icon"><Beaker size={16}/></span> Proposed protocol</h4>{result.experiment.steps.map((s,i)=><div className="step" key={s}><span>{i+1}</span><p>{s}</p></div>)}</div><div className="success-card"><h4><Gauge size={17}/> Define success before testing</h4><p className="success-intro">Agree quantitative thresholds with the customer and AFS expert.</p>{result.experiment.success.map(s=><div className="success-item" key={s}><Check size={15}/><span>{s}</span></div>)}<div className="gate"><strong>Decision gate</strong><p>If the target signal is weak, confounded, or unstable, revisit technique, probe geometry, and sample presentation before building a calibration model.</p></div></div></div><div className="review-note"><CircleHelp size={17}/><div><strong>Reference data is essential</strong><p>Use representative samples and an independent reference method. Avoid claiming quantitative performance from calibration samples alone.</p></div></div></div>}
          {tab==='method' && <MethodGuide/>}
          {result.sources?.length>0 && <div className="review-note source-note"><BookOpenIcon/><div><strong>Evidence used from materials.zip</strong><p>These references are the basis for this assessment. They support feasibility reasoning, not a guaranteed product specification.</p><ul>{result.sources.map((source,i)=><li key={`${source}-${i}`}>{source}</li>)}</ul></div></div>}
          {result.status && <div className="status-line"><strong>Decision status:</strong> {result.status}</div>}
          <div className="disclaimer"><ShieldCheck size={15}/><span>{result.disclaimer}</span></div>
        </section>}

        {!result && <section className="empty-state"><div className="empty-icon"><Microscope size={24}/></div><div><h3>Your technical assessment will appear here</h3><p>Enter a use case or load a sample case, then generate the first-pass recommendation.</p></div><div className="empty-steps"><span><b>1</b> Interpret</span><ArrowRight size={14}/><span><b>2</b> Compare methods</span><ArrowRight size={14}/><span><b>3</b> Test feasibility</span></div></section>}
        <footer><span>© Spectro Scout · Hackathon prototype</span><span>Built to support—not replace—AFS technical judgment.</span></footer>
      </div>
    </main>
  </div>;
}

function MethodGuide() {
  const methods = [
    ['NIR','Near-infrared','Moisture and organic composition trends','Broad overlapping overtone/combination bands; calibration required.'],
    ['MIR / FTIR','Mid-infrared','Functional-group identification and chemical specificity','Water absorption and optical materials/path length can limit inline use.'],
    ['Raman','Raman scattering','Molecular fingerprinting, potentially useful in aqueous matrices','Fluorescence and laser safety must be assessed early.'],
    ['UV-Vis','Ultraviolet-visible absorption','Colored species, chromophores, and concentration tracking','Turbidity, bubbles, path length, and fouling can interfere.'],
    ['Fluorescence','Molecular emission','Highly sensitive measurements for suitable fluorescent targets','Requires an emitting target or validated marker; quenching may matter.']
  ];
  return <div className="result-section"><div className="section-subhead"><div><h3>Quick method guide</h3><p>Use these as screening heuristics; target-specific spectra and process constraints decide feasibility.</p></div></div><div className="method-table">{methods.map(m=><div className="method-row" key={m[0]}><div className="method-abbr">{m[0]}</div><div><strong>{m[1]}</strong><p>{m[2]}</p></div><div className="method-limit"><span>KEY LIMITATION</span><p>{m[3]}</p></div></div>)}</div></div>;
}
