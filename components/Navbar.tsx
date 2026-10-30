"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { navigation } from "@/lib/data";
import Logo from "./Logo";
import { useEnquiry } from "./SiteProvider";
import { buttonTap, slideDown } from "@/lib/motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const openEnquiry = useEnquiry();

  // Scroll detection for navbar shrink and shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleHash = () => {
      setActiveHash(window.location.hash || "#home");
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => {
      if (mediaQuery.matches) setOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("keydown", handleEscape);
    mediaQuery.addEventListener("change", handleResize);

    handleScroll();
    handleHash();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("keydown", handleEscape);
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [open]);

  // Lock body scroll when mobile navigation is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <m.header
      variants={slideDown}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 shadow-[0_4px_20px_rgba(11,60,77,0.08)] backdrop-blur-md border-b border-[#E5EEEC]"
          : "bg-white/95 backdrop-blur-sm border-b border-[#E5EEEC]"
      }`}
    >
      <div
        className={`max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-16 lg:h-[68px]"
        }`}
      >
        {/* Left: Logo with subtle scale-in */}
        <m.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex items-center"
        >
          <Logo scrolled={scrolled} />
        </m.div>

        {/* Center: Desktop Nav Links (Font upgraded to 15-16px with layoutId underline) */}
        <nav
          className="hidden lg:flex items-center gap-7 xl:gap-8 h-full"
          aria-label="Main Navigation"
        >
          {navigation.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveHash(item.href)}
                className={`relative h-full flex items-center text-[14px] xl:text-[15px] transition-colors py-1 ${
                  isActive
                    ? "font-semibold text-[#0B2F2A]"
                    : "font-medium text-[#4B5563] hover:text-[#0B2F2A]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{item.label}</span>
                {isActive && (
                  <m.span
                    layoutId="activeNavIndicator"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 30 }
                    }
                    className="absolute bottom-2.5 left-0 right-0 h-[3px] bg-[#0B8F5A] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Enquire Now Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <m.button
            variants={buttonTap}
            whileHover={reduceMotion ? undefined : "hover"}
            whileTap={reduceMotion ? undefined : "tap"}
            onClick={openEnquiry}
            className="hidden sm:inline-flex group items-center gap-2 bg-[#0B8F5A] hover:bg-[#087A4C] text-white text-[14px] font-semibold px-4.5 py-2.5 rounded-md shadow-sm transition-colors cursor-pointer"
          >
            <span>Enquire Now</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </m.button>

          {/* Mobile Hamburger Button: 44x44px Touch Target with Morph Icon */}
          <button
            ref={toggleBtnRef}
            onClick={() => setOpen(!open)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg text-[#0B2F2A] hover:bg-[#E6F5F3] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#0B8F5A]"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <m.div
              key={open ? "close" : "menu"}
              initial={reduceMotion ? false : { rotate: open ? -90 : 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </m.div>
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Panel */}
      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-navigation"
            aria-label="Mobile Navigation"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="lg:hidden border-t border-[#E5EEEC] bg-white overflow-hidden shadow-2xl"
          >
            <div className="max-w-[1360px] mx-auto px-4 py-5 flex flex-col gap-2">
              {navigation.map((item) => {
                const isActive = activeHash === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setActiveHash(item.href);
                      setOpen(false);
                    }}
                    className={`min-h-[44px] flex items-center px-4 rounded-lg text-[16px] font-medium transition-colors ${
                      isActive
                        ? "bg-[#E6F5F3] text-[#0B8F5A] font-semibold"
                        : "text-[#374151] hover:bg-gray-50 active:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

              <div className="pt-3 mt-1 border-t border-gray-100">
                <button
                  onClick={() => {
                    setOpen(false);
                    openEnquiry();
                  }}
                  className="w-full min-h-[46px] flex items-center justify-center gap-2 bg-[#0B8F5A] hover:bg-[#087A4C] text-white text-[16px] font-semibold px-4 py-3 rounded-lg shadow-sm active:scale-98 transition-all"
                >
                  <span>Enquire Now</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  );
}
