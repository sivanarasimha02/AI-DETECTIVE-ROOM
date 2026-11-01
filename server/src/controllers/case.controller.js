import mongoose from 'mongoose';
import { DEMO_CASE_001 } from '../services/game/caseData.js';
import { Case } from '../models/Case.model.js';

export async function listCases(req, res, next) {
  try {
    let cases = [];
    if (mongoose.connection.readyState === 1) {
      try {
        cases = await Case.find({}, '-canonicalSolution').lean();
      } catch {
        // In-memory fallback
      }
    }

    if (!cases || cases.length === 0) {
      // Strip canonicalSolution
      const { canonicalSolution, ...publicCase } = DEMO_CASE_001;
      cases = [publicCase];
    }

    res.json({
      success: true,
      data: cases,
    });
  } catch (error) {
    next(error);
  }
}

export async function getCaseById(req, res, next) {
  try {
    const { caseId } = req.params;

    if (caseId === '001' || caseId === DEMO_CASE_001.id) {
      const { canonicalSolution, hints, ...safeCase } = DEMO_CASE_001;
      return res.json({
        success: true,
        data: safeCase,
      });
    }

    try {
      const foundCase = await Case.findById(caseId, '-canonicalSolution').lean();
      if (foundCase) {
        return res.json({ success: true, data: foundCase });
      }
    } catch {
      // Ignore DB lookup error
    }

    return res.status(404).json({
      success: false,
      message: 'Case not found',
    });
  } catch (error) {
    next(error);
  }
}

export async function getCaseEvidence(req, res, next) {
  try {
    const { caseId } = req.params;
    if (caseId === '001' || caseId === DEMO_CASE_001.id) {
      return res.json({
        success: true,
        data: DEMO_CASE_001.evidence,
      });
    }

    res.status(404).json({ success: false, message: 'Case not found' });
  } catch (error) {
    next(error);
  }
}

export async function getCaseSuspects(req, res, next) {
  try {
    const { caseId } = req.params;
    if (caseId === '001' || caseId === DEMO_CASE_001.id) {
      return res.json({
        success: true,
        data: DEMO_CASE_001.suspects,
      });
    }

    res.status(404).json({ success: false, message: 'Case not found' });
  } catch (error) {
    next(error);
  }
}

