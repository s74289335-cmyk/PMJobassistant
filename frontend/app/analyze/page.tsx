"use client";

import { useState, useEffect } from "react";
import API from "@/lib/api";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

export default function AnalyzePage() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 AUTH + LOAD STORED RESUME
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "/login";
      return;
    }

    // 🔥 Load resume from backend
    fetch(`http://127.0.0.1:8000/api/profile/${user}`)
      .then(res => res.json())
      .then(data => {
        if (data.resume) {
          setResume(data.resume);
        }
      });
  }, []);

  // 🔹 Fetch JD from URL
  const fetchJD = async () => {
    if (!jobUrl) return;

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: jobUrl }),
      });

      const data = await res.json();
      setJd(data.text);
    } catch (err) {
      setError("Failed to fetch job description");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Analyze
  const analyze = async () => {
    if (!resume || !jd) {
      setError("Please provide both Resume and Job Description");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/resume/analyze", {
        resume,
        jd,
      });

      setResult(res.data);
    } catch (err) {
      setError("Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle file upload (optional override)
  const handleFileUpload = async (file: File) => {
    const text = await file.text();
    setResume(text);
  };

  return (
  <div className="min-h-screen bg-[#0b0f19] text-gray-100 p-6">

    <Navbar />

    <div className="max-w-3xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Resume Analyzer</h1>
        <p className="text-gray-400 text-sm">
          Using your saved resume (you can override below)
        </p>
      </div>

      {/* JOB URL */}
      <div className="flex gap-2">
        <input
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          placeholder="Paste Job URL"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
        <button
          onClick={fetchJD}
          className="px-4 rounded-lg bg-white text-black text-sm hover:opacity-90"
        >
          Fetch
        </button>
      </div>

      {/* FILE UPLOAD */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <label className="block text-sm mb-2 text-gray-300">
          Upload Resume (optional override)
        </label>
        <input
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={(e) =>
            e.target.files && handleFileUpload(e.target.files[0])
          }
          className="text-sm text-gray-400"
        />
      </div>

      {/* RESUME */}
      <textarea
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        className="w-full p-3 h-40 rounded-lg bg-white/5 border border-white/10 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
      />

      {/* JD */}
      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        placeholder="Job Description"
        className="w-full p-3 h-40 rounded-lg bg-white/5 border border-white/10 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
      />

      {/* BUTTON */}
      <button
        onClick={analyze}
        className="w-full py-3 rounded-lg bg-white text-black font-medium hover:opacity-90 transition"
      >
        Analyze Resume
      </button>

      {/* ERROR */}
      {error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}

      {/* LOADER */}
      {loading && (
        <p className="text-gray-400 text-sm">Analyzing...</p>
      )}

      {/* RESULT */}
      {result && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">

          <h2 className="text-xl font-semibold">
            Match Score: {result.match_score}%
          </h2>

          {/* Missing */}
          <div>
            <h3 className="font-medium mb-2">Missing Skills</h3>
            <ul className="list-disc ml-6 text-gray-300 text-sm">
              {result.missing_skills?.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="font-medium mb-2">Strengths</h3>
            <ul className="list-disc ml-6 text-gray-300 text-sm">
              {result.strengths?.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div>
            <h3 className="font-medium mb-2">Improvements</h3>
            <ul className="list-disc ml-6 text-gray-300 text-sm">
              {result.improvements?.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  </div>
);
}