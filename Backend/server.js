require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
const connectDB = require("./config/db"); // ✅ Sahi path for DB connection

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ** MongoDB Connection URI **
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/exams";

// ** MongoDB Connection **
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  console.log("✅ GridFS Connected!");
});

// ** GridFS Storage Setup **
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: ${Date.now()}_${file.originalname},
      bucketName: "uploads",
    };
  },
});

const upload = multer({ storage });

// ** API for Submissions (File Upload) **
app.post("/api/submissions/submit", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  console.log("📂 Received File:", req.file.filename);
  res.status(200).json({
    message: "✅ Exam submitted successfully!",
    filename: req.file.filename,
  });
});

// ** Start Server **
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(🚀 Server running on port ${PORT}));
