import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('AI Detective Room - API Verification', () => {
  it('GET / should return service info and status', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('AI Detective Room API');
    expect(res.body.version).toBe('2.0.0');
  });

  it('GET /api/v1/health should return ok status', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET /api/v1/cases should list available cases without exposing canonical solution', async () => {
    const res = await request(app).get('/api/v1/cases');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);

    const caseItem = res.body.data[0];
    expect(caseItem.title).toBe('The Missing Diamond');
    // Ensure canonical solution is NEVER exposed to public case endpoints
    expect(caseItem.canonicalSolution).toBeUndefined();
  });

  it('GET /api/v1/cases/001/evidence should return evidence list', async () => {
    const res = await request(app).get('/api/v1/cases/001/evidence');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(6);
    expect(res.body.data[0].evidenceCode).toBe('E-01');
  });

  it('GET /api/v1/cases/001/suspects should return suspect roster', async () => {
    const res = await request(app).get('/api/v1/cases/001/suspects');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(3);
    expect(res.body.data[0].name).toBe('Marcus Finch');
  });

  it('POST /api/v1/investigations/inv_001/evidence/E-01 should record discovery', async () => {
    const res = await request(app).post('/api/v1/investigations/inv_001/evidence/E-01');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.discoveredEvidence.evidenceCode).toBe('E-01');
  });

  it('POST /api/v1/investigations/inv_001/hints should return progressive hint', async () => {
    const res = await request(app)
      .post('/api/v1/investigations/inv_001/hints')
      .send({ level: 1 });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.hint.level).toBe(1);
    expect(res.body.hint.text).toBeDefined();
  });

  it('POST /api/v1/investigations/inv_001/verdict should authoritatively score verdict server-side', async () => {
    const res = await request(app)
      .post('/api/v1/investigations/inv_001/verdict')
      .send({
        suspectId: 'suspect_1',
        evidenceIds: ['E-02', 'E-03', 'E-04', 'E-05', 'E-06'],
        reasoning: 'Marcus Finch had a right leg ankle limp matching the janitor eyewitness testimony in E-03 and used the locker keycard override.',
      });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.isCorrect).toBe(true);
    expect(res.body.data.culpritScore).toBe(40);
    expect(res.body.data.finalScore).toBeGreaterThanOrEqual(80);
  });
});

