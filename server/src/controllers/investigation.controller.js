import { DEMO_CASE_001 } from '../services/game/caseData.js';
import { Investigation } from '../models/Investigation.model.js';
import { askGeminiMentor } from '../services/gemini/geminiService.js';

// In-memory fallback investigations store for development
const memoryInvestigations = new Map();

export async function startInvestigation(req, res, next) {
  try {
    const { caseId } = req.body;
    const userId = req.user?.id || 'anon_detective';

    const invId = `inv_${caseId}_${Date.now()}`;
    const newInv = {
      _id: invId,
      userId,
      caseId: caseId || '001',
      status: 'in_progress',
      discoveredEvidenceIds: [],
      completedObjectives: [],
      sceneCheckpoint: { position: [0, 1.6, 3], rotation: [0, 0, 0] },
      inventory: [],
      boardState: { cards: [], connections: [] },
      notes: '',
      hintsUsed: [],
      startedAt: new Date(),
    };

    try {
      const created = await Investigation.create(newInv);
      return res.status(201).json({ success: true, data: created });
    } catch {
      memoryInvestigations.set(invId, newInv);
      return res.status(201).json({ success: true, data: newInv });
    }
  } catch (error) {
    next(error);
  }
}

export async function getInvestigation(req, res, next) {
  try {
    const { id } = req.params;

    let inv = null;
    try {
      inv = await Investigation.findById(id).lean();
    } catch {
      // Memory check
    }

    if (!inv) {
      inv = memoryInvestigations.get(id);
    }

    if (!inv) {
      // Provide an initialized session for ease of use
      const defaultInv = {
        _id: id,
        caseId: '001',
        status: 'in_progress',
        discoveredEvidenceIds: [],
        completedObjectives: [],
        sceneCheckpoint: { position: [0, 1.6, 3], rotation: [0, 0, 0] },
        inventory: [],
        boardState: { cards: [], connections: [] },
        notes: '',
        hintsUsed: [],
      };
      memoryInvestigations.set(id, defaultInv);
      return res.json({ success: true, data: defaultInv });
    }

    res.json({ success: true, data: inv });
  } catch (error) {
    next(error);
  }
}

export async function saveProgress(req, res, next) {
  try {
    const { id } = req.params;
    const { sceneCheckpoint, completedObjectives } = req.body;

    let inv = memoryInvestigations.get(id);
    if (inv) {
      if (sceneCheckpoint) inv.sceneCheckpoint = sceneCheckpoint;
      if (completedObjectives) inv.completedObjectives = completedObjectives;
      return res.json({ success: true, data: inv });
    }

    try {
      const updated = await Investigation.findByIdAndUpdate(
        id,
        { $set: { sceneCheckpoint, completedObjectives } },
        { new: true }
      );
      if (updated) return res.json({ success: true, data: updated });
    } catch {
      // Ignore
    }

    res.status(404).json({ success: false, message: 'Investigation not found' });
  } catch (error) {
    next(error);
  }
}

export async function recordEvidence(req, res, next) {
  try {
    const { id, evidenceId } = req.params;

    // Validate that evidence exists in case
    const validEvidence = DEMO_CASE_001.evidence.find((e) => e.evidenceCode === evidenceId || e.id === evidenceId);
    if (!validEvidence) {
      return res.status(400).json({ success: false, message: 'Invalid evidence identifier' });
    }

    let inv = memoryInvestigations.get(id);
    if (!inv) {
      inv = {
        _id: id,
        caseId: '001',
        discoveredEvidenceIds: [],
        inventory: [],
        completedObjectives: [],
        hintsUsed: [],
        boardState: { cards: [], connections: [] },
      };
      memoryInvestigations.set(id, inv);
    }

    if (!inv.discoveredEvidenceIds.includes(validEvidence.evidenceCode)) {
      inv.discoveredEvidenceIds.push(validEvidence.evidenceCode);
      inv.inventory.push(validEvidence.evidenceCode);

      // Check corresponding objective
      const matchedObj = DEMO_CASE_001.objectives.find((o) => o.requiredEvidenceId === validEvidence.evidenceCode);
      if (matchedObj && !inv.completedObjectives.includes(matchedObj.id)) {
        inv.completedObjectives.push(matchedObj.id);
      }
    }

    try {
      await Investigation.findByIdAndUpdate(id, {
        $addToSet: {
          discoveredEvidenceIds: validEvidence.evidenceCode,
          inventory: validEvidence.evidenceCode,
        },
      });
    } catch {
      // Memory store was already updated
    }

    res.json({
      success: true,
      message: 'Evidence recorded',
      discoveredEvidence: validEvidence,
      currentProgress: {
        discoveredCount: inv.discoveredEvidenceIds.length,
        totalCount: DEMO_CASE_001.evidence.length,
        discoveredEvidenceIds: inv.discoveredEvidenceIds,
        completedObjectives: inv.completedObjectives,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function saveBoard(req, res, next) {
  try {
    const { id } = req.params;
    const { boardState } = req.body;

    let inv = memoryInvestigations.get(id);
    if (inv) {
      inv.boardState = boardState;
      return res.json({ success: true, data: inv.boardState });
    }

    try {
      const updated = await Investigation.findByIdAndUpdate(
        id,
        { $set: { boardState } },
        { new: true }
      );
      if (updated) return res.json({ success: true, data: updated.boardState });
    } catch {
      // Ignore
    }

    res.status(404).json({ success: false, message: 'Investigation not found' });
  } catch (error) {
    next(error);
  }
}

export async function saveNotes(req, res, next) {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    let inv = memoryInvestigations.get(id);
    if (inv) {
      inv.notes = notes;
      return res.json({ success: true, message: 'Notes saved' });
    }

    try {
      await Investigation.findByIdAndUpdate(id, { $set: { notes } });
      return res.json({ success: true, message: 'Notes saved' });
    } catch {
      // Ignore
    }

    res.status(404).json({ success: false, message: 'Investigation not found' });
  } catch (error) {
    next(error);
  }
}

export async function requestHint(req, res, next) {
  try {
    const { id } = req.params;
    const { level } = req.body; // 1, 2, or 3

    if (![1, 2, 3].includes(Number(level))) {
      return res.status(400).json({ success: false, message: 'Hint level must be 1, 2, or 3' });
    }

    const hintKey = `level${level}`;
    const hintText = DEMO_CASE_001.hints[hintKey];

    let inv = memoryInvestigations.get(id);
    if (inv) {
      inv.hintsUsed.push({ level: Number(level), hintText, timestamp: new Date() });
    }

    try {
      await Investigation.findByIdAndUpdate(id, {
        $push: { hintsUsed: { level: Number(level), hintText, timestamp: new Date() } },
      });
    } catch {
      // Ignore
    }

    res.json({
      success: true,
      hint: {
        level: Number(level),
        text: hintText,
        penaltyInfo: 'Hints reduce the final investigation evaluation score by 5 points each.',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function submitVerdict(req, res, next) {
  try {
    const { id } = req.params;
    const { suspectId, evidenceIds = [], reasoning = '' } = req.body;

    const canonical = DEMO_CASE_001.canonicalSolution;

    // 1. Authoritative Culprit Evaluation (Max 40 pts)
    const isCulpritCorrect = suspectId === canonical.culpritSuspectId;
    const culpritScore = isCulpritCorrect ? 40 : 0;

    // 2. Evidence Selection Scoring (Max 30 pts)
    // Compare selected evidence with key evidence IDs
    let matchedEvidenceCount = 0;
    canonical.keyEvidenceIds.forEach((keyId) => {
      if (evidenceIds.includes(keyId)) {
        matchedEvidenceCount++;
      }
    });
    const evidenceScore = Math.round((matchedEvidenceCount / canonical.keyEvidenceIds.length) * 30);

    // 3. Reasoning and Explanation Scoring (Max 30 pts)
    // Check keywords related to limp, ankle sprain, locker, pin code, coat
    let reasoningScore = 0;
    const lowerReason = reasoning.toLowerCase();
    const keywords = ['limp', 'ankle', 'locker', 'keycard', 'coat', '8821', 'pin', 'sprain', 'override'];
    let matchedKeywords = 0;
    keywords.forEach((kw) => {
      if (lowerReason.includes(kw)) matchedKeywords++;
    });

    if (reasoning.trim().length > 40) {
      reasoningScore += 10;
    }
    reasoningScore += Math.min(20, matchedKeywords * 4);

    // 4. Calculate Hints Penalty
    let inv = memoryInvestigations.get(id);
    const hintsCount = inv?.hintsUsed?.length || 0;
    const hintPenalty = hintsCount * 5;

    const rawTotal = culpritScore + evidenceScore + reasoningScore;
    const finalScore = Math.max(0, rawTotal - hintPenalty);

    const result = {
      isCorrect: isCulpritCorrect,
      culpritScore,
      evidenceScore,
      reasoningScore,
      hintPenalty,
      finalScore,
      maxScore: 100,
      submittedCulprit: suspectId,
      canonicalSummary: canonical.summary,
      feedback: isCulpritCorrect
        ? 'Outstanding detective work! You correctly pinned down Marcus Finch and reconstructed his calculated attempt to frame Dr. Vance.'
        : 'Case unsolved. Your indictment did not withstand evidentiary rigor. Review the eyewitness limp and physical access discrepancies.',
    };

    if (inv) {
      inv.status = isCulpritCorrect ? 'solved' : 'failed';
      inv.completedAt = new Date();
      inv.finalResult = result;
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function chatAssistant(req, res, next) {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Attempt calling Gemini API first if configured
    const geminiResult = await askGeminiMentor(message);
    if (geminiResult && geminiResult.reply) {
      return res.json({
        success: true,
        reply: geminiResult.reply,
        citedEvidence: geminiResult.citedEvidence,
        role: 'assistant',
      });
    }

    // Grounded detective mentor response fallback logic
    // Using case evidence data without leaking canonical answer
    const lower = message.toLowerCase();
    let reply = '';
    let citedEvidence = [];

    if (lower.includes('elena') || lower.includes('curator')) {
      reply = 'According to E-02, Elena Vance’s badge was used at 23:42. However, consider E-06: her locker cylinder was reported stiff and maintenance had security master access to her spare coat and badge. Take note of whether her physical condition matches the witness statement.';
      citedEvidence = ['E-02', 'E-06', 'E-03'];
    } else if (lower.includes('finch') || lower.includes('guard')) {
      reply = 'Marcus Finch was on overnight duty. The access log (E-02) notes he was patrolling the perimeter at 23:15. Examine E-05 carefully regarding his physical status and recent incident reports.';
      citedEvidence = ['E-02', 'E-05'];
    } else if (lower.includes('limp') || lower.includes('injury') || lower.includes('janitor')) {
      reply = 'Witness Thomas Gray (E-03) reported seeing a figure in a curator coat walking with a pronounced limp on their right leg. Does anyone on the staff roster match that description? Check E-05.';
      citedEvidence = ['E-03', 'E-05'];
    } else if (lower.includes('sensor') || lower.includes('override') || lower.includes('pin')) {
      reply = 'The display sensor report (E-04) reveals master PIN 8821 was entered to disarm the laser grid without triggering alarms. Who had authorization for this PIN?';
      citedEvidence = ['E-04'];
    } else {
      reply = 'As your detective partner, I recommend inspecting all evidence stations in the room. Compare the access logs (E-02) with the medical roster (E-05) and the janitor’s statement (E-03). Look for physical details that cannot be disguised.';
      citedEvidence = ['E-01', 'E-02', 'E-03'];
    }

    res.json({
      success: true,
      reply,
      citedEvidence,
      role: 'assistant',
    });
  } catch (error) {
    next(error);
  }
}

