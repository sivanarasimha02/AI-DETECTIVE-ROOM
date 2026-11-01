import { Router } from 'express';
import {
  startInvestigation,
  getInvestigation,
  saveProgress,
  recordEvidence,
  saveBoard,
  saveNotes,
  requestHint,
  submitVerdict,
  chatAssistant,
} from '../controllers/investigation.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.post('/', startInvestigation);
router.get('/:id', getInvestigation);
router.patch('/:id/progress', saveProgress);
router.post('/:id/evidence/:evidenceId', recordEvidence);
router.patch('/:id/board', saveBoard);
router.post('/:id/notes', saveNotes);
router.post('/:id/hints', requestHint);
router.post('/:id/verdict', submitVerdict);
router.post('/:id/chat', chatAssistant);

export default router;

