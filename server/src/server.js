import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import healthRoute from './routes/health.js';
import inspectRoute from './routes/inspect.js';
import auditRoute from './routes/audit.js';
import analyticsRoute from './routes/analytics.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security and utility middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

// Large payload support for high-res industrial inspection images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Routes
app.use('/api', healthRoute);
app.use('/api/inspect', inspectRoute);
app.use('/api/audit', auditRoute);
app.use('/api/analytics', analyticsRoute);

// Global Error Handler
app.use(errorHandler);

const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Naxcan AI Server running on http://localhost:${PORT}`);
  console.log(`📡 Gemini Vision Model: ${env.GEMINI_MODEL}`);
  console.log(`🗄️  Supabase URL: ${env.SUPABASE_URL ? env.SUPABASE_URL : 'Running in fallback memory mode'}`);
});

export default app;
