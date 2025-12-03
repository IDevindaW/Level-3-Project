import pool from '../config/db.js';

// Get all service categories
export const getServiceCategories = async (req, res) => {
  try {
    const categories = await pool.query(
      'SELECT * FROM service_categories ORDER BY name'
    );
    res.json(categories.rows);
  } catch (error) {
    console.error('Get categories error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get subcategories by category ID
export const getServiceSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await pool.query(
      'SELECT * FROM service_subcategories WHERE category_id = $1 ORDER BY name',
      [categoryId]
    );
    res.json(subcategories.rows);
  } catch (error) {
    console.error('Get subcategories error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};