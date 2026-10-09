"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";
import Logo from "@/components/Logo";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected client error to monitoring service
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F1FAF9] text-[#374151]">
      <header className="bg-white border-b border-[#E5EEEC] py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Logo />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#E5EEEC] shadow-[0_4px_24px_rgba(11,60,77,0.08)] p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mx-auto mb-4">
            <AlertCircle size={32} />
          </div>

          <h1 className="text-2xl font-bold text-[#0B2F2A] tracking-tight">
            Something Went Wrong
          </h1>
          <p className="mt-2.5 text-sm text-[#6B7280] leading-relaxed">
            An unexpected error occurred while loading this page. Please try again or return to the homepage.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B8F5A] hover:bg-[#087A4C] text-white text-xs font-semibold px-5 py-2.5 rounded-md shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#E6F5F3] text-[#0B8F5A] border border-[#0B8F5A] text-xs font-semibold px-4 py-2.5 rounded-md transition-colors"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-[#E5EEEC] py-4 text-center text-xs text-[#6B7280]">
        &copy; 2025 Friends Driving Centre. All rights reserved.
      </footer>
    </div>
  );
}
