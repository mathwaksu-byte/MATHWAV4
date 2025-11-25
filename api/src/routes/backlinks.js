import express from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { prisma } from '../config/prisma.js';

const router = express.Router();

// Admin: List backlinks
router.get('/admin', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const backlinks = await prisma.backlink.findMany({ orderBy: { created_at: 'desc' } });
    res.json({ backlinks });
  } catch (error) { next(error); }
});

// Admin: Get single backlink
router.get('/admin/:id', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const backlink = await prisma.backlink.findUnique({ where: { id } });
    res.json({ backlink });
  } catch (error) { next(error); }
});

// Admin: Create backlink
router.post(
  '/admin',
  authenticate,
  requireAdmin,
  [
    body('site_name').trim().notEmpty().withMessage('Site name is required'),
    body('url').trim().notEmpty().isURL().withMessage('Valid URL is required'),
    body('status').optional().trim(),
    body('contact_email').optional().isEmail().withMessage('Valid email is required'),
    body('notes').optional().trim(),
    body('published_at').optional().isISO8601().toDate(),
    validate
  ],
  async (req, res, next) => {
    try {
      const backlink = await prisma.backlink.create({ data: req.body });
      res.status(201).json({ backlink });
    } catch (error) { next(error); }
  }
);

// Admin: Update backlink
router.put(
  '/admin/:id',
  authenticate,
  requireAdmin,
  [param('id').isUUID().withMessage('Invalid backlink ID'), validate],
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const backlink = await prisma.backlink.update({ where: { id }, data: req.body });
      res.json({ backlink });
    } catch (error) { next(error); }
  }
);

// Admin: Delete backlink
router.delete(
  '/admin/:id',
  authenticate,
  requireAdmin,
  [param('id').isUUID().withMessage('Invalid backlink ID'), validate],
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await prisma.backlink.delete({ where: { id } });
      res.json({ message: 'Backlink deleted successfully' });
    } catch (error) { next(error); }
  }
);

export default router;
