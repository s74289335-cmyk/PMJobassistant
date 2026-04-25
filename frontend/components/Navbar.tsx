"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const linkClass = (path: string) =>
    `px-3 py-1 rounded-lg transition ${
      pathname === path
        ? "bg-white/10 text-white"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div className="flex justify-between items-center px-8 py-4 
      backdrop-blur-xl bg-white/5 border-b border-white/10 
      sticky top-0 z-50 text-white">

      {/* 🔹 LOGO */}
      <h1
        className="text-xl font-bold cursor-pointer 
        bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        onClick={() => router.push(user ? "/dashboard" : "/")}
      >
        AI Copilot
      </h1>

      {/* 🔹 NAV LINKS */}
      <div className="flex gap-3 items-center">

        {user ? (
          <>
            <Link href="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>

            <Link href="/profile" className={linkClass("/profile")}>
              Profile
            </Link>

            <Link href="/analyze" className={linkClass("/analyze")}>
              Analyze
            </Link>

            <Link href="/answers" className={linkClass("/answers")}>
              Answers
            </Link>

            <Link href="/applications" className={linkClass("/applications")}>
              Applications
            </Link>

            <button
              onClick={logout}
              className="bg-red-500/80 hover:bg-red-500 px-4 py-2 rounded-xl text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-400 hover:text-white">
              Login
            </Link>

            <Link
              href="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:opacity-90"
            >
              Get Started
            </Link>
          </>
        )}

      </div>
    </div>
  );
}