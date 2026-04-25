"use client";

type Color = "blue" | "green" | "purple";

export default function ScoreCard({
  title,
  value,
  color = "blue",
}: {
  title: string;
  value: string | number;
  color?: Color;
}) {
  const colors: Record<Color, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  // 🔹 Normalize value for progress bar
  const progress =
    typeof value === "number"
      ? Math.min(Math.max(value, 0), 100) // clamp 0–100
      : 80;

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow hover:bg-white/10 transition text-white">
      
      {/* Title */}
      <h2 className="text-gray-400 text-sm">{title}</h2>

      {/* Value */}
      <p className="text-3xl font-bold mt-2">{value}</p>

      {/* Progress bar */}
      <div className="w-full bg-white/10 rounded-full h-2 mt-4">
        <div
          className={`${colors[color]} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}