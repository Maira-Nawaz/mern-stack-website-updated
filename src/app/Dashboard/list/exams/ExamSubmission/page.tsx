"use client";
import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExamSubmission: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("⚠ Please upload a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/submissions/submit", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(✅ File "${file.name}" submitted successfully!);
        setFile(null);
      } else {
        toast.error(❌ Submission failed: ${data.error || "Unknown error"});
      }
    } catch (error) {
      toast.error("❌ Error submitting file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 flex items-center justify-center gap-2">
          <MdOutlineUploadFile className="text-blue-600 text-3xl" />
          Submit Your Exam
        </h2>

        {/* File Upload Box */}
        <label className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 transition">
          <input type="file" onChange={handleFileChange} className="hidden" />
          <FaFileUpload className="text-4xl text-gray-600 mb-2" />
          <span className="text-gray-700 font-medium">
            {file ? 📄 ${file.name} : "Choose Exam File"}
          </span>
        </label>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-purple-600 text-black px-4 py-2 rounded-md text-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-md disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Exam"}
        </button>
      </div>
    </div>
  );
};

export default ExamSubmission;
