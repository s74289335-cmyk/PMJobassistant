"use client";

export default function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      
      <h1 className="text-3xl font-bold">{title}</h1>

      {subtitle && (
        <p className="text-gray-500 mt-1">{subtitle}</p>
      )}

    </div>
  );
}