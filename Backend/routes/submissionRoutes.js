const express = require("express");
const { submitExam, getSubmissions } = require("../controllers/submissionController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ✅ Use existing middleware

const router = express.Router();

// ✅ Student submits exam (with file upload)
router.post("/submit", protect, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  await submitExam(req, res);
});

// ✅ Teacher checks submissions
router.get("/submissions", protect, getSubmissions);

module.exports = router;
