import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { logger } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import routes
import universitiesRouter from './routes/universities.js';
import adminUniversitiesRouter from './routes/adminUniversities.js';
import applicationsRouter from './routes/applications.js';
import authRouter from './routes/auth.js';
import testimonialsRouter from './routes/testimonials.js';
import faqsRouter from './routes/faqs.js';
import blogsRouter from './routes/blogs.js';
import statsRouter from './routes/stats.js';
import uploadsRouter from './routes/uploads.js';
import paymentsRouter from './routes/payments.js';
import contactRouter from './routes/contact.js';
import settingsRouter from './routes/settings.js';

dotenv.config();
dotenv.config({ path: '.dev.vars' });

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(compression());

// CORS configuration
const extraAdmins = (process.env.ADMIN_URLS || '').split(',').filter(Boolean);
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:3000',
    'http://localhost:5173',
    process.env.ADMIN_URL || 'http://localhost:3002',
    ...extraAdmins
  ],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve locally stored uploads when Supabase is unavailable
const uploadsDir = path.resolve(process.cwd(), 'uploads');
app.use('/files', express.static(uploadsDir));

// API routes
app.use('/api/auth', authRouter);
app.use('/api/universities', universitiesRouter);
app.use('/api/admin/universities', adminUniversitiesRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/stats', statsRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/settings', settingsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`MATHWA API server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});

export default app;
