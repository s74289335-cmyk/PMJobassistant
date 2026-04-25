"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) window.location.href = "/dashboard";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-gray-100 overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">

        {/* Gradient glow */}
        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full top-[-100px] left-[-100px] animate-pulse" />

        <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px] animate-pulse" />

        {/* Animated moving orb */}
        <motion.div
          className="absolute w-[400px] h-[400px] bg-pink-500/10 blur-[100px] rounded-full"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

      </div>

      {/* 🔹 NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-white/10 backdrop-blur-xl bg-white/5">
        <h1 className="text-lg font-semibold tracking-tight">
          AI Job Copilot
        </h1>

        <div className="flex gap-4 text-sm">
          <a href="/login" className="text-gray-400 hover:text-white transition">
            Login
          </a>
          <a href="/signup" className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
            Sign Up
          </a>
        </div>
      </div>

      {/* 🔹 HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center mt-28 px-6"
      >
        <h1 className="text-5xl font-semibold tracking-tight mb-4">
          Your AI Job Copilot
        </h1>

        <p className="text-gray-400 max-w-xl mb-8 text-lg">
          Analyze resumes, generate answers, autofill applications,
          and track everything — in one streamlined workflow.
        </p>

        <div className="flex gap-4">
          <a
            href="/signup"
            className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Login
          </a>
        </div>
      </motion.div>

      {/* 🔹 FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 px-10">
        {[
          {
            title: "Resume Analysis",
            desc: "Understand how well your resume matches job requirements",
          },
          {
            title: "AI Answers",
            desc: "Generate tailored responses for any application question",
          },
          {
            title: "Application Tracking",
            desc: "Keep track of all your job applications in one place",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
          >
            <h3 className="font-medium mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 🔹 CTA */}
      <div className="text-center mt-28 pb-20 px-6">
        <h2 className="text-4xl font-semibold mb-4">
          Start building your career smarter
        </h2>

        <p className="text-gray-400 mb-8">
          Everything you need to prepare, apply, and succeed.
        </p>

        <a
          href="/signup"
          className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Start Free
        </a>
      </div>

    </div>
  );
}