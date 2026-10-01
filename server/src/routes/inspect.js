import { Router } from 'express';
import { handleInspect } from '../controllers/inspectController.js';

const router = Router();

router.post('/', handleInspect);

export default router;
