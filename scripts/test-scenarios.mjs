import assert from 'node:assert/strict';
import { evaluationScenarios, analyzeCase } from '../src/engine.js';
const byId = Object.fromEntries(evaluationScenarios.map(s => [s.id, s]));
const out = id => analyzeCase({ ...byId[id], scenarioId: id });
assert.equal(evaluationScenarios.length, 6, 'must include official H01-H06');
assert.match(out('H01').experiment.title, /calibration-transfer/i);
assert.ok(out('H01').recommendations.some(r => r.key === 'COMBO'));
assert.match(out('H02').experiment.title, /two-stream/i);
assert.equal(out('H03').status, 'Insufficient information');
assert.match(out('H04').status, /do not approve/i);
assert.equal(out('H05').status, 'Insufficient information');
assert.match(out('H06').status, /Outside supported scope/i);
for (const id of ['H01','H02','H03','H04','H05','H06']) {
 const r=out(id);
 assert.ok(r.sources?.length, `${id} should cite supplied sources`);
 assert.ok(r.experiment?.steps?.length >= 3, `${id} should include a practical experiment plan`);
}
console.log('Passed: H01–H06 scenario-grounding checks.');
