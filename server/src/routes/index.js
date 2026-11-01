import { Router } from 'express';
import authRoutes from './auth.routes.js';
import caseRoutes from './cases.routes.js';
import investigationRoutes from './investigations.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/cases', caseRoutes);
router.use('/investigations', investigationRoutes);

export default router;

