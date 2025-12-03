import express from 'express';
import {
  getServiceCategories,
  getServiceSubcategories,
} from '../controllers/serviceController.js';

const router = express.Router();

// Get all categories
router.get('/categories', getServiceCategories);

// Get subcategories by category ID
router.get('/categories/:categoryId/subcategories', getServiceSubcategories);

export default router;