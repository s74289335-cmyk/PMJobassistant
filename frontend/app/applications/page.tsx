"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

// 🔥 DEMO JOBS WITH MATCH %
const DEMO_JOBS = [
  { id: "1", job_title: "Frontend Developer", company: "Google", status: "New", match: 92 },
  { id: "2", job_title: "Backend Engineer", company: "Amazon", status: "New", match: 88 },
  { id: "3", job_title: "Full Stack Developer", company: "Microsoft", status: "New", match: 85 },
  { id: "4", job_title: "AI Engineer", company: "OpenAI", status: "New", match: 95 },
];

export default function Applications() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
      return;
    }

    API.get(`/applications?user_id=${user}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setApps(data.length > 0 ? data : DEMO_JOBS);
      })
      .catch(() => setApps(DEMO_JOBS))
      .finally(() => setLoading(false));
  }, [router]);

  // 🔥 APPLY FUNCTION
  const applyToJob = async (job: any) => {
    const user = localStorage.getItem("user");

    setApps((prev) =>
      prev.map((app) =>
        app.id === job.id ? { ...app, status: "Applying" } : app
      )
    );

    try {
      await API.post("/applications/apply", {
        user_id: Number(user),
        job_id: job.id,
        job_title: job.job_title,
        company: job.company,
      });

      // 🔥 simulate real flow
      setTimeout(() => {
        setApps((prev) =>
          prev.map((app) =>
            app.id === job.id ? { ...app, status: "Applied" } : app
          )
        );
      }, 800);

      // 🔥 auto move to interview (demo magic)
      setTimeout(() => {
        setApps((prev) =>
          prev.map((app) =>
            app.id === job.id ? { ...app, status: "Interview" } : app
          )
        );
      }, 3000);

    } catch {
      setApps((prev) =>
        prev.map((app) =>
          app.id === job.id ? { ...app, status: "Failed" } : app
        )
      );
    }
  };

  // 🔥 APPLY ALL
  const applyAll = () => {
    apps.forEach((job, i) => {
      setTimeout(() => applyToJob(job), i * 800);
    });
  };

  const statusStyle = (status: string) => {
    if (status === "Applied") return "bg-green-500/20 text-green-400";
    if (status === "Applying") return "bg-yellow-500/20 text-yellow-400";
    if (status === "Interview") return "bg-purple-500/20 text-purple-400";
    if (status === "Failed") return "bg-red-500/20 text-red-400";
    return "bg-blue-500/20 text-blue-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto space-y-6 p-6 pt-24">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Applications 📋</h2>
            <p className="text-gray-400">AI-powered job applications</p>
          </div>

          <button
            onClick={applyAll}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-sm"
          >
            Apply All 🚀
          </button>
        </div>

        {loading && <p className="text-gray-400">Loading...</p>}

        {/* JOB LIST */}
        <div className="grid gap-4">
          {apps.map((app) => (
            <motion.div
              key={app.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{app.job_title}</h3>
                <p className="text-gray-400">{app.company}</p>

                {/* 🔥 MATCH */}
                <p className="text-sm text-green-400 mt-1">
                  Match: {app.match || 80}%
                </p>

                {/* STATUS */}
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${statusStyle(app.status)}`}>
                  {app.status}
                </span>
              </div>

              <button
                onClick={() => applyToJob(app)}
                disabled={app.status === "Applied" || app.status === "Applying"}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-sm"
              >
                {app.status === "Applied"
                  ? "Applied"
                  : app.status === "Applying"
                  ? "Applying..."
                  : "Apply"}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}