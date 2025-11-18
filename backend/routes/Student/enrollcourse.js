const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const pool = require("../../db/db");
const authenticate = require("../../middlewares/authentication");
const router = express.Router();
const AppError = require("../../utils/AppError");

router.get(
  "/meta/:course_id/:enroll_id",
  authenticate,
  asyncHandler(async (req, res) => {
    let { course_id, enroll_id } = req.params;

    course_id = Number(course_id);
    enroll_id = Number(enroll_id)

    if (!course_id || !enroll_id) {
      throw new AppError("Missing required parameters", 400);
    }
    
    const student_id = req.user.id;
    const metaData = await pool.query(
      "SELECT c.title, c.description, c.stream, c.thumbnail_url, e.enrolled_at, t.name  FROM enrolledcourse e JOIN courses c ON e.course_id = c.course_id JOIN teacher t ON c.teacher_id = t.id WHERE e.id = $1 AND e.student_id = $2 AND e.course_id = $3",
      [enroll_id, student_id, course_id]
    );
    console.log("this is backend");
    const chapterData = await pool.query(
      "Select title, chapter_id, description from chapters where course_id = $1",
      [course_id]
    );
    res
      .status(200)
      .json({ meta: metaData.rows[0], chapters: chapterData.rows });
  })
);


router.get('/topics/:chapter_id', authenticate,asyncHandler(async(req, res)=>{

    const {chapter_id} =req.params;

    const data = await pool.query('Select * from topics where chapter_id = $1', [chapter_id]);

    res.status(200).json(data.rows);
}) );

router.get('/tests/:chapter_id', authenticate,asyncHandler(async(req, res)=>{

    // const {chapter_id} =req.params;
    const tests= [
        {
          test_id: 5,
          title: "Project Evaluation",
          type: "test",
          url: "/test/ch5",
          total: 10,
          obtained: 9,
        },
        {
          test_id: 2,
          title: "JSX & Components Test",
          type: "test",
          url: "/test/ch2",
          total: 15,
          obtained: 12,
        },
        {
          test_id: 4,
          title: "Hooks Assessment",
          type: "test",
          url: "/test/ch4",
          total: 25,
          obtained: 21,
        },
        {
          test_id: 2,
          title: "JSX & Components Test",
          type: "test",
          url: "/test/ch2",
          total: 15,
          obtained: 12,
        },
      ];

    // const data = await pool.query('Select * from topics where chapter_id = $1', [chapter_id]);

    res.status(200).json(tests);
}) )
module.exports = router;
