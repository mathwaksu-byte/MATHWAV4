import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { prisma } from '../config/prisma.js';

const router = express.Router();

router.get('/public', async (req, res, next) => {
  try {
    const settings = await prisma.siteSetting.findUnique({ where: { key: 'default' } });
    res.json({ settings });
  } catch (error) { next(error); }
});

router.get('/admin', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const settings = await prisma.siteSetting.findUnique({ where: { key: 'default' } });
    res.json({ settings });
  } catch (error) { next(error); }
});

router.put(
  '/admin',
  authenticate,
  requireAdmin,
  [
    body('hero_title').optional().trim(),
    body('hero_subtitle').optional().trim(),
    body('hero_video_mp4_url').optional().trim(),
    body('hero_video_webm_url').optional().trim(),
    body('hero_video_poster_url').optional().trim(),
    body('background_theme_id').optional().trim(),
    body('background_gradient_css').optional().trim(),
    body('logo_url').optional().trim(),
    body('default_title').optional().trim(),
    body('default_description').optional().trim(),
    body('default_og_image_url').optional().trim(),
    body('twitter_card_type').optional().trim(),
    validate
  ],
  async (req, res, next) => {
    try {
      const data = { ...req.body, updated_at: new Date() };
      const settings = await prisma.siteSetting.upsert({
        where: { key: 'default' },
        update: data,
        create: { key: 'default', ...data }
      });
      res.json({ settings });
    } catch (error) { next(error); }
  }
);

export default router;

