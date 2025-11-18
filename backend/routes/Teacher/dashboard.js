const express = require('express');
const router = express.Router();
const multer = require('multer');
const streamifier = require('streamifier');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticate = require('../../middlewares/authentication');
const pool = require('../../db/db');
const cloudinary = require('../../utils/cloudinary');
const asyncHandler = require('../../utils/asyncHandler');
const AppError = require('../../utils/AppError');

const upload = multer();

const uploadToCloudinary = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'uploads' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(imageBuffer).pipe(stream);
  });
};

// =================== Profile Route ===================
router.get(
  '/profile',
  authenticate,
  asyncHandler(async (req, res) => {
    const id = req.user.id;

    const result = await pool.query('SELECT * FROM teacher WHERE id = $1', [id]);
    const teacher = result.rows[0];
    teacher.password = ''; // sanitize
    res.status(200).json({ teacher });
  })
);

// =================== Edit Profile ===================
router.put(
  '/editProfile',
  authenticate,
  upload.single('image'),
  asyncHandler(async (req, res) => {
    const data = req.body;
    const image = req.file;
    const id = req.user.id;
    const email = req.user.email;
    const MAX_SIZE = 1 * 1024 * 1024;

    const teacherDataResult = await pool.query(`SELECT * FROM teacher WHERE id = $1 OR email = $2`, [id, email]);
    const teacherData = teacherDataResult.rows[0];

    if (image && image.size > MAX_SIZE) {
      throw new AppError('File size exceeds 1MB limit', 400);
    }

    if (image) {
      if (teacherData?.public_id) {
        await cloudinary.uploader.destroy(teacherData.public_id);
      }
      const result = await uploadToCloudinary(image.buffer);
      data.public_id = result.public_id;
      data.image_url = result.secure_url;
    }

    const allowedFields = ['name', 'dob', 'yoe', 'description', 'email', 'phone', 'public_id', 'image_url', 'education'];
    const keys = [];
    const values = [];

    let index = 1;
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        keys.push(`${field} = $${index}`);
        values.push(data[field]);
        index++;
      }
    }

    if (keys.length === 0) throw new AppError('No valid fields provided for update', 400);

    values.push(id);
    const query = `UPDATE teacher SET ${keys.join(', ')} WHERE id = $${index}`;
    await pool.query(query, values);

    res.status(200).json({ message: 'Profile updated successfully' });
  })
);

// =================== Add Course ===================
router.post(
  '/addcourse',
  authenticate,
  upload.single('thumbnail'),
  asyncHandler(async (req, res) => {
    const data = req.body;
    const image = req.file;
    const id = req.user.id;
    const MAX_SIZE = 1 * 1024 * 1024;

    if (data.price !== undefined) {
      const parsedPrice = parseFloat(data.price);
      if (isNaN(parsedPrice)) throw new AppError('Invalid price format', 400);
      data.price = parsedPrice;
    }

    if (image) {
      if (image.size > MAX_SIZE) throw new AppError('File size exceeds 1MB limit', 400);
      const result = await uploadToCloudinary(image.buffer);
      data.public_id = result.public_id;
      data.thumbnail_url = result.secure_url;
    }

    const allowedFields = ['title', 'description', 'price', 'duration', 'stream', 'thumbnail_url', 'public_id'];
    const keys = [];
    const values = [];
    const placeholders = [];

    let index = 1;
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        keys.push(field);
        values.push(data[field]);
        placeholders.push(`$${index}`);
        index++;
      }
    }

    if (keys.length === 0) throw new AppError('No valid fields provided for course creation', 400);

    keys.push('teacher_id');
    values.push(id);
    placeholders.push(`$${index}`);

    const query = `INSERT INTO courses (${keys.join(', ')}) VALUES (${placeholders.join(', ')})`;
    await pool.query(query, values);

    res.status(200).json({ message: 'Course added successfully' });
  })
);

// =================== All Courses ===================
router.get(
  '/allcourse',
  authenticate,
  asyncHandler(async (req, res) => {
    const id = req.user.id;
    const query = `SELECT * FROM courses WHERE teacher_id = $1`;
    const data = await pool.query(query, [id]);
    res.status(200).json({ data: data.rows });
  })
);

// =================== Edit Course ===================
router.put(
  '/editcourse',
  authenticate,
  upload.single('thumbnail'),
  asyncHandler(async (req, res) => {
    const data = req.body;
    const image = req.file;
    const id = req.user.id;
    const MAX_SIZE = 1 * 1024 * 1024;

    const courseDataResult = await pool.query(
      `SELECT * FROM courses WHERE course_id = $1 AND teacher_id = $2`,
      [data.course_id, id]
    );
    const courseData = courseDataResult.rows[0];

    if (image && image.size > MAX_SIZE) {
      throw new AppError('File size exceeds 1MB limit', 400);
    }

    if (image) {
      if (courseData?.public_id) {
        await cloudinary.uploader.destroy(courseData.public_id);
      }
      const result = await uploadToCloudinary(image.buffer);
      data.public_id = result.public_id;
      data.thumbnail_url = result.secure_url;
    }

    const allowedFields = ['title', 'description', 'price', 'duration', 'stream', 'thumbnail_url', 'public_id'];
    const keys = [];
    const values = [];

    let index = 1;
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        keys.push(`${field} = $${index}`);
        values.push(data[field]);
        index++;
      }
    }

    if (keys.length === 0) throw new AppError('No valid fields provided for update', 400);

    values.push(data.course_id);
    const query = `UPDATE courses SET ${keys.join(', ')} WHERE course_id = $${index}`;
    await pool.query(query, values);

    res.status(200).json({ message: 'Course updated successfully' });
  })
);

module.exports = router;
