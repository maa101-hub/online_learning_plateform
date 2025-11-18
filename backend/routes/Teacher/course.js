const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");

const authenticate = require("../../middlewares/authentication");
const pool = require("../../db/db");
const cloudinary = require("../../utils/cloudinary");
const asyncHandler = require("../../utils/asyncHandler");
const AppError = require("../../utils/AppError");

const upload = multer();

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "uploads" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// ✅ Add Chapter
router.post(
  "/addchapter",
  authenticate,
  asyncHandler(async (req, res) => {
    const { course_id, title, description } = req.body;

    if (!course_id || !title || !description) {
      throw new AppError("All fields are required", 400);
    }

    await pool.query(
      "INSERT INTO chapters (course_id, title, description) VALUES ($1, $2, $3)",
      [course_id, title, description]
    );

    res.status(201).json({ message: "Chapter added successfully" });
  })
);

// ✅ Edit Chapter
router.put(
  "/editchapter",
  authenticate,
  asyncHandler(async (req, res) => {
    const { chapter_id, title, description } = req.body;

    if (!chapter_id || !title || !description) {
      throw new AppError("All fields are required", 400);
    }

    const result = await pool.query(
      "UPDATE chapters SET title = $1, description = $2 WHERE chapter_id = $3 RETURNING *",
      [title, description, chapter_id]
    );

    if (result.rowCount === 0) {
      throw new AppError("Chapter not found", 404);
    }

    res.status(200).json({
      message: "Chapter updated successfully",
      chapter: result.rows[0],
    });
  })
);



router.post(
  "/addTopic",
  authenticate,
  upload.single("resource"),
  asyncHandler(async (req, res) => {
    const { title, type, chapter_id } = req.body;

    if (!title || !type || !chapter_id || !req.file) {
      throw new AppError("All fields including file are required", 400);
    }

    const result = await uploadToCloudinary(req.file.buffer);

    await pool.query(
      `INSERT INTO topics (title, type, public_id, url, chapter_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [title, type, result.public_id, result.secure_url, chapter_id]
    );

    res.status(201).json({ message: "Topic added successfully" });
  })
);

// ✅ Get all chapters of course
router.get(
  "/allchapter/:course_id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { course_id } = req.params;

    if (!course_id) throw new AppError("Invalid course_id", 400);

    const data = await pool.query("SELECT * FROM chapters WHERE course_id = $1", [
      course_id,
    ]);

    res.status(200).json({ data: data.rows });
  })
);

// ✅ Get all topics of a chapter
router.get(
  "/alltopics/:chapter_id",
  authenticate,
  asyncHandler(async (req, res) => {
    const { chapter_id } = req.params;

    if (!chapter_id) throw new AppError("Invalid chapter_id", 400);

    const data = await pool.query("SELECT * FROM topics WHERE chapter_id = $1", [
      chapter_id,
    ]);

    res.status(200).json({ data: data.rows });
  })
);

// ✅ Delete Topic (from Cloudinary + DB)
router.delete(
  "/deleteTopic",
  authenticate,
  asyncHandler(async (req, res) => {
    const { topic } = req.body;

    if (!topic?.topic_id || !topic?.public_id) {
      throw new AppError("Invalid topic data", 400);
    }

    await cloudinary.uploader.destroy(topic.public_id, { resource_type: "raw" });

    await pool.query("DELETE FROM topics WHERE topic_id = $1", [topic.topic_id]);

    res.status(200).json({ message: "Topic and file deleted successfully" });
  })
);

// ✅ Delete Chapter
router.delete(
  "/deleteChapter/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const chapterId = parseInt(req.params.id, 10);

    if (isNaN(chapterId)) throw new AppError("Invalid chapter ID", 400);

    await pool.query("DELETE FROM chapters WHERE chapter_id = $1", [chapterId]);

    res.status(200).json({ message: "Chapter deleted successfully" });
  })
);

module.exports = router;
