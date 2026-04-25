"use client";

export default function Loader({
  text = "AI is working its magic...",
}: {
  text?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-white">

      {/* 🔹 Animated dots */}
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" />
        <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce delay-150" />
        <div className="w-3 h-3 rounded-full bg-pink-500 animate-bounce delay-300" />
      </div>

      {/* 🔹 Text */}
      <p className="text-sm text-gray-400 tracking-wide">
        {text}
      </p>
    </div>
  );
}