"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "@/lib/api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) window.location.href = "/dashboard";
  }, []);

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await API.post("/auth/signup", form);

      window.location.href = "/login";
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0b0f19] text-gray-100 overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />
      </div>

      {/* 🔹 CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl w-96 p-8"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create account
        </h1>

        {/* NAME */}
        <input
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 mb-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
        />

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 mb-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 mb-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
        />

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-medium transition ${
            loading
              ? "bg-gray-500"
              : "bg-white text-black hover:opacity-90"
          }`}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-white underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}