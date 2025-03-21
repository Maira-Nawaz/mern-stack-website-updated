const Submission = require("../models/Submission");

// ✅ Student submits exam
const submitExam = async (req, res) => {
  try {
    console.log("Received Exam Submission Request");

    // Debugging logs
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { studentId, examId, answers } = req.body;
    const filePath = req.file ? req.file.path : null; // Get uploaded file path

    if (!studentId || !examId) {
      return res.status(400).json({ error: "Student ID and Exam ID are required" });
    }

    const newSubmission = new Submission({
      studentId,
      examId,
      answers,
      file: filePath, // Store file path in DB
    });

    await newSubmission.save();

    console.log("Submission Saved to Database:", newSubmission);
    res.status(201).json({ message: "Exam submitted successfully!", submission: newSubmission });
  } catch (error) {
    console.error("Error Submitting Exam:", error);
    res.status(500).json({ error: "Failed to submit exam" });
  }
};

module.exports = { submitExam };
