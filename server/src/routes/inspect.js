import { Router } from 'express';
import multer from 'multer';
import { handleInspect } from '../controllers/inspectController.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB max
});

const router = Router();

// Supports both multipart/form-data (file upload field 'image' or 'file') and JSON base64
router.post('/', upload.single('image'), handleInspect);

export default router;
