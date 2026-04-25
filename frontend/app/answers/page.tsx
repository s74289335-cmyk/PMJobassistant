"use client";

import { useState, useEffect } from "react";
import API from "@/lib/api";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";

export default function AnswerPage() {
  const [jd, setJd] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 AUTH + PROFILE CHECK
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "/login";
      return;
    }

    // 🔥 Ensure resume exists
    fetch(`http://127.0.0.1:8000/api/profile/${user}`)
      .then(res => res.json())
      .then(data => {
        if (!data.resume) {
          window.location.href = "/profile";
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
    } catch {
      setError("Failed to fetch job description");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Generate Answer
  const generate = async () => {
    if (!jd || !question) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const user = localStorage.getItem("user");

      const res = await API.post("/answers/generate", {
        user_id: user,
        jd,
        question,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate answer");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-[#0b0f19] text-gray-100 p-6">
    <Navbar />

    <div className="max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-semibold">
          AI Answer Generator
        </h2>
        <p className="text-gray-400 text-sm">
          Uses your resume to generate tailored answers
        </p>
      </div>

      {/* INPUT CARD */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">

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

        {/* JD */}
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Job Description"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 h-32 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
        />

        {/* QUESTION */}
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
        />

        {/* QUICK ACTIONS */}
        <div className="flex gap-2 flex-wrap">
          {[
            "Tell me about yourself",
            "Why are you a good fit?",
            "Why do you want this job?",
            "What are your strengths?",
            "Write a cover letter",
          ].map((q) => (
            <button
              key={q}
              onClick={() => setQuestion(q)}
              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={generate}
          className="w-full py-3 rounded-lg bg-white text-black font-medium hover:opacity-90 transition"
        >
          Generate Answer
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}

      {/* LOADER */}
      {loading && (
        <p className="text-gray-400 text-sm">Generating answer...</p>
      )}

      {/* RESULT */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4"
        >
          <h3 className="text-lg font-medium">
            Generated Answer
          </h3>

          <textarea
            value={result.answer || ""}
            onChange={(e) =>
              setResult({ ...result, answer: e.target.value })
            }
            className="w-full p-3 h-40 rounded-lg bg-white/5 border border-white/10 text-gray-100 focus:outline-none focus:ring-1 focus:ring-white/20"
          />

          {/* ACTIONS */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4 text-sm">
              <button className="text-green-400 hover:underline">
                👍 Helpful
              </button>
              <button className="text-red-400 hover:underline">
                👎 Not helpful
              </button>
            </div>

            {/* COPY BUTTON */}
            <button
              onClick={() => navigator.clipboard.writeText(result.answer)}
              className="text-xs bg-white text-black px-3 py-1 rounded-md hover:opacity-90"
            >
              Copy
            </button>
          </div>
        </motion.div>
      )}

    </div>
  </div>
);
}