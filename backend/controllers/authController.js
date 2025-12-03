import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register Customer
export const registerCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with customer role
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, 'customer']
    );

    const token = generateToken(newUser.rows[0].id);
    res.cookie('token', token, cookieOptions);

    return res.status(201).json({ user: newUser.rows[0] });
  } catch (error) {
    console.error('Register customer error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Register Provider
export const registerProvider = async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    const {
      name,
      email,
      password,
      yearsOfExperience,
      serviceCategory,
      serviceSubCategory,
      serviceDescription,
      serviceAddress,
      workingDays,
      preferredTime,
      serviceCharge,
      consultationIncluded,
      followupSupportIncluded,
      warrantyIncluded,
      contactNumber,
    } = req.body;

    // Validate required fields
    if (!name || !email || !password || !serviceCategory || !serviceSubCategory) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const userExists = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with provider role
    const newUser = await client.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, 'provider']
    );

    const userId = newUser.rows[0].id;

    // Create provider profile
    const providerProfile = await client.query(
      `INSERT INTO provider_profiles (
        user_id, years_of_experience, service_category_id, service_subcategory_id,
        service_description, service_address, working_days, preferred_time,
        service_charge, consultation_included, followup_support_included,
        warranty_included, contact_number
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id`,
      [
        userId,
        yearsOfExperience || null,
        serviceCategory,
        serviceSubCategory,
        serviceDescription || null,
        serviceAddress || null,
        workingDays || null,
        preferredTime || null,
        serviceCharge || null,
        consultationIncluded || false,
        followupSupportIncluded || false,
        warrantyIncluded || false,
        contactNumber || null,
      ]
    );

    await client.query('COMMIT');

    const token = generateToken(userId);
    res.cookie('token', token, cookieOptions);

    return res.status(201).json({
      user: {
        ...newUser.rows[0],
        providerId: providerProfile.rows[0].id,
      },
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Register provider error:', error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Get user
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const userData = user.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(userData.id);
    res.cookie('token', token, cookieOptions);

    // Return user without password
    const { password: _, ...userWithoutPassword } = userData;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user basic info
    const user = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = user.rows[0];

    // If provider, get provider profile
    if (userData.role === 'provider') {
      const providerProfile = await pool.query(
        `SELECT pp.*, sc.name as category_name, ssc.name as subcategory_name
         FROM provider_profiles pp
         LEFT JOIN service_categories sc ON pp.service_category_id = sc.id
         LEFT JOIN service_subcategories ssc ON pp.service_subcategory_id = ssc.id
         WHERE pp.user_id = $1`,
        [userId]
      );

      if (providerProfile.rows.length > 0) {
        userData.providerProfile = providerProfile.rows[0];
      }
    }

    res.json(userData);
  } catch (error) {
    console.error('Get me error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Logout
export const logout = (req, res) => {
  res.cookie('token', '', { ...cookieOptions, maxAge: 1 });
  res.json({ message: 'Logged out successfully' });
};