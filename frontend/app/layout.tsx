"use client";

import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 🔥 Pages WITHOUT sidebar/header
  const publicRoutes = ["/", "/login", "/signup"];

  const isPublic = publicRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="bg-gray-100">

        {isPublic ? (
          // ✅ Public pages
          children
        ) : (
          // ✅ Protected layout
          <div className="flex">
            <Sidebar />

            <div className="ml-64 w-full">
              <main className="p-6">{children}</main>
            </div>
          </div>
        )}

      </body>
    </html>
  );
}