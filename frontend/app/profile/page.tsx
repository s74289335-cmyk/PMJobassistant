"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔹 Protect page
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
    }
  }, [router]);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume file");
      return;
    }

    const user = localStorage.getItem("user");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await API.post(`/profile/upload/${user}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Resume uploaded successfully ✅");

      router.push("/dashboard"); // ✅ better than window.location
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white">

      {/* 🔹 Navbar */}
      <Navbar />

      {/* 🔹 Content */}
      <div className="flex items-center justify-center pt-24 p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-8"
        >

          {/* HEADER */}
          <h2 className="text-2xl font-bold mb-2">
            Complete Your Profile 👤
          </h2>

          <p className="text-gray-400 mb-6">
            Upload your resume to unlock AI-powered analysis, answers, and autofill.
          </p>

          {/* FILE INPUT */}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="mb-4 w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20"
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : null)
            }
          />

          {/* FILE NAME */}
          {file && (
            <p className="text-sm text-gray-400 mb-3">
              Selected: {file.name}
            </p>
          )}

          {/* BUTTON */}
          <button
            onClick={uploadResume}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white transition ${
              loading
                ? "bg-gray-500"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
            }`}
          >
            {loading ? "Uploading..." : "Upload Resume & Continue"}
          </button>

        </motion.div>
      </div>
    </div>
  );
}