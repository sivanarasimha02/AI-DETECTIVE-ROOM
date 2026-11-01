import { Router } from 'express';
import {
  listCases,
  getCaseById,
  getCaseEvidence,
  getCaseSuspects,
} from '../controllers/case.controller.js';

const router = Router();

router.get('/', listCases);
router.get('/:caseId', getCaseById);
router.get('/:caseId/evidence', getCaseEvidence);
router.get('/:caseId/suspects', getCaseSuspects);

export default router;

