import { Router } from 'express';
import { handleGetAnalytics } from '../controllers/analyticsController.js';

const router = Router();

router.get('/', handleGetAnalytics);

export default router;
