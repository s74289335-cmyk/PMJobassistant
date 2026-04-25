"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home,
  User,
  FileText,
  Brain,
  Briefcase,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl transition ${
      pathname === path
        ? "bg-white/10 text-white font-semibold"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`;

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="w-64 h-screen fixed p-6 flex flex-col justify-between 
      bg-[#020617] border-r border-white/10 text-white">

      {/* 🔹 TOP */}
      <div>
        <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          AI Copilot
        </h1>

        <nav className="flex flex-col gap-2">

          <Link href="/dashboard" className={linkClass("/dashboard")}>
            <Home size={18} />
            Dashboard
          </Link>

          <Link href="/profile" className={linkClass("/profile")}>
            <User size={18} />
            Profile
          </Link>

          <Link href="/analyze" className={linkClass("/analyze")}>
            <FileText size={18} />
            Resume Analyzer
          </Link>

          <Link href="/answers" className={linkClass("/answers")}>
            <Brain size={18} />
            AI Answers
          </Link>

          <Link href="/applications" className={linkClass("/applications")}>
            <Briefcase size={18} />
            Applications
          </Link>

        </nav>
      </div>

      {/* 🔹 BOTTOM */}
      <button
        onClick={logout}
        className="flex items-center gap-2 text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-xl transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}