
const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const pool = require("../../db/db");
const router = express.Router();

const authenticate = require("../../middlewares/authentication");


router.get("/enrollcourses",authenticate, asyncHandler(async(req, res)=>{
           
       const id = req.user.id;

const data = await pool.query("SELECT e.id, c.course_id, c.title, t.name, c.thumbnail_url FROM enrolledcourse e JOIN courses c ON e.course_id = c.course_id JOIN teacher t ON c.teacher_id = t.id WHERE e.student_id = $1", [id]);

       res.status(201).json(data.rows);
}))
module.exports = router;
