import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import Logo from "@/components/Logo";

export const metadata = {
  title: "404 - Page Not Found | Friends Driving Centre",
  description: "The page you are looking for does not exist. Return to Friends Driving Centre homepage.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F1FAF9] text-[#374151]">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E5EEEC] py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B8F5A] hover:underline"
          >
            <Home size={14} />
            <span>Home</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#E5EEEC] shadow-[0_4px_24px_rgba(11,60,77,0.08)] p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#E6F5F3] flex items-center justify-center text-[#0B8F5A] mx-auto mb-4 font-bold text-2xl">
            404
          </div>
          <h1 className="text-2xl font-bold text-[#0B2F2A] tracking-tight">
            Page Not Found
          </h1>
          <p className="mt-2.5 text-sm text-[#6B7280] leading-relaxed">
            Sorry, we couldn&apos;t find the page you were looking for. Let&apos;s get
            you back on the right track!
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B8F5A] hover:bg-[#087A4C] text-white text-xs font-semibold px-5 py-2.5 rounded-md shadow-sm transition-all"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>
            <a
              href="/#programs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#E6F5F3] text-[#0B8F5A] border border-[#0B8F5A] text-xs font-semibold px-4 py-2.5 rounded-md transition-colors"
            >
              <span>Explore Programs</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="bg-white border-t border-[#E5EEEC] py-4 text-center text-xs text-[#6B7280]">
        &copy; 2025 Friends Driving Centre. All rights reserved.
      </footer>
    </div>
  );
}
