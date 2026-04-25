"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Dashboard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      setLoadingJobs(false);
      return;
    }

    fetch(`http://127.0.0.1:8000/api/jobs/recommend/${user}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setJobs(data);
        else if (Array.isArray(data.jobs)) setJobs(data.jobs);
        else setJobs([]);
      })
      .catch(() => setJobs([]))
      .finally(() => setLoadingJobs(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-10 space-y-10">

        {/* 🔥 HEADER */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage your applications, AI insights, and recommendations
          </p>
        </div>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: "Resume Score", value: "82%", color: "blue" },
            { label: "Applications", value: "12", color: "green" },
            { label: "AI Answers", value: "34", color: "purple" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg"
            >
              <p className="text-sm text-gray-400">{item.label}</p>

              <p className="text-3xl font-bold mt-2">{item.value}</p>

              {/* Progress bar */}
              <div className="mt-4 h-2 bg-white/10 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    item.color === "blue"
                      ? "bg-blue-500"
                      : item.color === "green"
                      ? "bg-green-500"
                      : "bg-purple-500"
                  }`}
                  style={{ width: "80%" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🔥 ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "Resume Analyzer",
              desc: "Evaluate your resume against job descriptions",
              link: "/analyze",
            },
            {
              title: "AI Answers",
              desc: "Generate tailored answers for applications",
              link: "/answers",
            },
            {
              title: "Applications",
              desc: "Track and manage your job applications",
              link: "/applications",
            },
          ].map((card, i) => (
            <Link
              key={i}
              href={card.link}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
            >
              <h3 className="font-semibold group-hover:text-blue-400 transition">
                {card.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{card.desc}</p>
            </Link>
          ))}
        </div>

        {/* 🔥 JOB RECOMMENDATIONS */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-gray-200">
            Recommended Jobs
          </h3>

          {loadingJobs ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No recommendations yet
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {jobs.map((job, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="border border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition"
                >
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-gray-400">
                    {job.company}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* 🔥 AUTOFILL CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 rounded-2xl p-6 flex items-center justify-between backdrop-blur-xl">
          <div>
            <h3 className="font-semibold">Autofill Applications</h3>
            <p className="text-sm text-gray-400 mt-1">
              Automatically fill job forms using your profile
            </p>
          </div>

          <button
            onClick={() =>
              alert(
                "Autofill works via Chrome Extension 🚀\nOpen any job form to see it in action."
              )
            }
            className="px-4 py-2 bg-white text-black rounded-xl text-sm font-medium hover:opacity-90"
          >
            Use Autofill
          </button>
        </div>

      </div>
    </div>
  );
}