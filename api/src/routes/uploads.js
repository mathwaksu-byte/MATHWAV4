import express from 'express';
import multer from 'multer';
import { supabaseAdmin } from '../config/supabase.js';
import { authenticate } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';
import { v4 as uuidv4 } from 'uuid';
import { uploadToStorage, deleteFromStorage } from '../utils/storageApi.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 200 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/jpg,image/webp,application/pdf,video/mp4,video/webm').split(',');
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Invalid file type', 400), false);
    }
  }
});

// Upload single file
router.post('/single', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('No file uploaded', 400);
    }

    const { bucket = 'uploads', folder = '' } = req.body;
    const fileExt = req.file.originalname.split('.').pop();
    const fileName = `${folder ? folder + '/' : ''}${uuidv4()}.${fileExt}`;

    try {
      // Use our custom storage API for upload
      const fileUrl = await uploadToStorage(bucket, fileName, req.file.buffer, req.file.mimetype);
      
      return res.json({
        file: {
          path: fileName,
          url: fileUrl,
          size: req.file.size,
          mimetype: req.file.mimetype
        }
      });
    } catch (uploadError) {
      console.error('Upload error:', uploadError);
      return next(new AppError('Storage upload failed. ' + uploadError.message, 500));
    }
  } catch (error) {
    next(error);
  }
});

// Upload multiple files
router.post('/multiple', upload.array('files', 10), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new AppError('No files uploaded', 400);
    }

    const { bucket = 'uploads', folder = '' } = req.body;
    const uploadPromises = req.files.map(async (file) => {
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${folder ? folder + '/' : ''}${uuidv4()}.${fileExt}`;

      const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(fileName);

      return {
        path: data.path,
        url: publicUrl,
        size: file.size,
        mimetype: file.mimetype
      };
    });

    const files = await Promise.all(uploadPromises);

    res.json({ files });
  } catch (error) {
    next(error);
  }
});

// Delete file
router.delete('/', authenticate, async (req, res, next) => {
  try {
    const { bucket = 'uploads', path } = req.body;

    if (!path) {
      throw new AppError('File path is required', 400);
    }

    try {
      // Use our custom storage API for deletion
      await deleteFromStorage(bucket, path);
      res.json({ message: 'File deleted successfully' });
    } catch (deleteError) {
      console.error('Delete error:', deleteError);
      return next(new AppError('File deletion failed. ' + deleteError.message, 500));
    }
  } catch (error) {
    next(error);
  }
});

export default router;
