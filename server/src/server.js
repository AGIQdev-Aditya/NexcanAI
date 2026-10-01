import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import healthRoute from './routes/health.js';
import inspectRoute from './routes/inspect.js';
import auditRoute from './routes/audit.js';
import analyticsRoute from './routes/analytics.js';
import authRoute from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();

// Security and utility middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false, // Ensure video and fonts load without CSP blocks
  })
);
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

// Large payload support for high-res industrial inspection images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static frontend build with full HTTP 206 byte-range streaming for MP4 videos
app.use(
  express.static(clientDistPath, {
    maxAge: '1h',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.mp4')) {
        res.setHeader('Accept-Ranges', 'bytes');
      }
    },
  })
);

// API Routes
app.use('/api', healthRoute);
app.use('/api/auth', authRoute);
app.use('/api/inspect', inspectRoute);
app.use('/api/audit', auditRoute);
app.use('/api/analytics', analyticsRoute);

// Fallback all non-API GET requests to index.html (SPA routing)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Global Error Handler
app.use(errorHandler);

const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Nexcan AI Server running on http://localhost:${PORT}`);
  console.log(`📡 Gemini Vision Model: ${env.GEMINI_MODEL}`);
  console.log(`🗄️  Supabase URL: ${env.SUPABASE_URL ? env.SUPABASE_URL : 'Running in fallback memory mode'}`);
  console.log(`📁 Serving client bundle from: ${clientDistPath}`);
});

export default app;
