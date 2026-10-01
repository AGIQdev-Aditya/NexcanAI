import { Router } from 'express';
import { handleGetAuditLogs } from '../controllers/auditController.js';

const router = Router();

router.get('/', handleGetAuditLogs);

export default router;
