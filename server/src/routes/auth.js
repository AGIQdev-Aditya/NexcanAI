import { Router } from 'express';
import {
  handleRegister,
  handleLogin,
  handleGoogleAuth,
  handleGetMe,
  handleDemoLogin,
} from '../controllers/authController.js';

const router = Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/google', handleGoogleAuth);
router.get('/me', handleGetMe);
router.post('/demo', handleDemoLogin);

export default router;
