const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const pool = require('../db/db');
const AppError = require('../utils/AppError');
const authenticate = require('../middlewares/authentication');
const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    
    const data = await pool.query('SELECT c.course_id, c.title, c.stream AS category, c.price, c.offer, c.nums_of_students AS students, c.duration, c.teacher_id, c.thumbnail_url AS image, c.description, t.name AS instructor FROM courses c JOIN teacher t ON c.teacher_id = t.id');
    
    res.status(201).json(data.rows);
}));

router.get('/allchapters/:course_id', authenticate , asyncHandler(async (req, res) => {
    const {course_id} = req.params;
    if(!course_id)throw new AppError("Course id not fetched", 400);
    const data = await pool.query('SELECT chapter_id, title from chapters where course_id = $1', [course_id]);
    res.status(201).json(data.rows);
}));

module.exports = router;
