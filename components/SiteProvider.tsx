"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone, X, ExternalLink, RefreshCw } from "lucide-react";
import { contact } from "@/lib/data";
import { WhatsApp } from "./SocialIcons";
import { siteConfig } from "@/lib/siteConfig";

interface EnquiryFormData {
  name: string;
  phone: string;
  location: string;
  message: string;
}

const initialFormState: EnquiryFormData = {
  name: "",
  phone: "",
  location: "",
  message: "",
};

// Motion variants for text field cascading entrance animation
const formStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
};

const formFieldVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const EnquiryContext = createContext<(programOrEvent?: string | React.MouseEvent) => void>(() => {});

export function useEnquiry() {
  return useContext(EnquiryContext);
}

export function EnquiryButton({
  children,
  program,
  className = "inline-flex items-center gap-2 bg-[#0B8F5A] hover:bg-[#087A4C] text-white text-[13px] font-semibold px-4 py-2.5 rounded-md shadow-sm transition-all duration-200 cursor-pointer",
}: {
  children: React.ReactNode;
  program?: string;
  className?: string;
}) {
  const open = useEnquiry();
  return (
    <button className={className} onClick={() => open(program)} type="button">
      <span>{children}</span>
      <ArrowRight size={15} aria-hidden="true" />
    </button>
  );
}

export default function SiteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<EnquiryFormData>(initialFormState);
  const [whatsappUrl, setWhatsappUrl] = useState<string>("");
  const hasInteractedRef = useRef(false);

  // Auto-open modal after page is completely loaded (waits 7 seconds)
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const startTimer = () => {
      timerId = setTimeout(() => {
        if (!hasInteractedRef.current) {
          setIsOpen(true);
        }
      }, 7000);
    };

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        startTimer();
      } else {
        const onPageLoaded = () => {
          startTimer();
        };
        window.addEventListener("load", onPageLoaded, { once: true });
        return () => {
          window.removeEventListener("load", onPageLoaded);
          if (timerId) clearTimeout(timerId);
        };
      }
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  // Body scroll lock and Escape key listener when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleOpen = (programOrEvent?: string | React.MouseEvent) => {
    hasInteractedRef.current = true;
    setSubmitted(false);
    if (typeof programOrEvent === "string" && programOrEvent) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message || `Interested in: ${programOrEvent}`,
      }));
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    hasInteractedRef.current = true;
    setIsOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedLocation = formData.location.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedPhone || !trimmedLocation) {
      return;
    }

    const messageLines = [
      "*New Training Enquiry - Friends Driving Centre*",
      "",
      `👤 *Name:* ${trimmedName}`,
      `📞 *Phone:* ${trimmedPhone}`,
      `📍 *Location:* ${trimmedLocation}`,
    ];

    if (trimmedMessage) {
      messageLines.push(`💬 *Message:* ${trimmedMessage}`);
    }

    const messageText = messageLines.join("\n");
    const rawTarget = (contact.whatsappNumber || "919876543210").replace(/\D/g, "");
    const targetPhone =
      rawTarget.length === 10 ? `91${rawTarget}` : rawTarget;

    const generatedUrl =
      `https://wa.me/${targetPhone}?text=${encodeURIComponent(messageText)}`;

    setWhatsappUrl(generatedUrl);
    setSubmitted(true);

    try {
      const waWindow = window.open(
        generatedUrl,
        "_blank",
        "noopener,noreferrer"
      );

      if (!waWindow || waWindow.closed) {
        window.location.href = generatedUrl;
      }
    } catch {
      window.location.href = generatedUrl;
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <EnquiryContext.Provider value={handleOpen}>
          {children}

          {/* Enquiry Modal with Animation, Backdrop & Custom Scrollbar */}
          <AnimatePresence>
            {isOpen && (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="enquiry-modal-title"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
              >
                {/* Backdrop with smooth fade transition */}
                <m.div
                  key="modal-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  onClick={handleClose}
                  className="fixed inset-0 bg-[#0B2F2A]/65 backdrop-blur-sm cursor-pointer"
                  aria-hidden="true"
                />

                {/* Animated Modal Box */}
                <m.div
                  key="modal-card"
                  initial={{ opacity: 0, scale: 0.92, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                    mass: 0.8,
                  }}
                  className="relative z-10 w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-[#E5EEEC] flex flex-col overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Floating Close Button */}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-gray-100 transition-colors shadow-xs cursor-pointer"
                    aria-label="Close enquiry dialog"
                  >
                    <X size={19} aria-hidden="true" />
                  </button>

                  {/* Scrollable Container with sleek WebKit scrollbar */}
                  <div className="popup-scrollbar overflow-y-auto p-6 sm:p-7 pt-6">
                    {/* Header with gentle fade entrance */}
                    <m.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 }}
                      className="pr-8"
                    >
                      <div className="flex items-center gap-2.5 mb-1.5 flex-wrap sm:flex-nowrap">
                        <h2 id="enquiry-modal-title" className="text-[20px] sm:text-[22px] font-bold text-[#0B2F2A] leading-tight">
                          Book a Training Enquiry
                        </h2>
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E6F5F3] text-[#0B8F5A] flex-shrink-0 shadow-xs">
                          <WhatsApp size={18} className="text-[#0B8F5A]" />
                        </span>
                      </div>
                      <p className="text-[13px] text-[#6B7280] mb-5">
                        Take the first step towards confident driving. Submitting directly connects you with our trainers on WhatsApp.
                      </p>
                    </m.div>

                    {submitted ? (
                      <m.div
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="py-2 flex flex-col items-center text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#E8F8F0] text-[#25D366] flex items-center justify-center mb-3">
                          <CheckCircle2 size={40} className="text-[#0B8F5A]" aria-hidden="true" />
                        </div>

                        <h3 className="text-xl font-bold text-[#0B2F2A]">
                          Enquiry Details Prepared!
                        </h3>
                        <p className="text-sm text-[#4B5563] mt-1.5 max-w-sm">
                          We have redirected you to WhatsApp with all your filled details. If it did not open automatically, tap below:
                        </p>

                        {/* Summary card showing submitted details */}
                        <div className="w-full mt-4 p-4 rounded-xl bg-[#F8FAF9] border border-[#E5EEEC] text-left text-xs sm:text-[13px] space-y-1.5 text-[#374151]">
                          <div className="text-[11px] font-bold tracking-wider uppercase text-[#0B8F5A] mb-2">
                            Enquiry Summary
                          </div>

                          <div className="flex justify-between py-0.5 border-b border-gray-100">
                            <span className="font-semibold text-gray-500">Name:</span>
                            <span className="font-medium text-[#0B2F2A]">{formData.name}</span>
                          </div>

                          <div className="flex justify-between py-0.5 border-b border-gray-100">
                            <span className="font-semibold text-gray-500">Phone:</span>
                            <span className="font-medium text-[#0B2F2A]">{formData.phone}</span>
                          </div>

                          <div className="flex justify-between py-0.5 border-b border-gray-100">
                            <span className="font-semibold text-gray-500">Location:</span>
                            <span className="font-medium text-[#0B2F2A]">{formData.location}</span>
                          </div>

                          {formData.message && (
                            <div className="pt-1">
                              <span className="font-semibold text-gray-500 block mb-0.5">
                                Message:
                              </span>
                              <p className="italic text-gray-700 bg-white p-2 rounded border border-gray-100">
                                {formData.message}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="w-full mt-5 flex flex-col sm:flex-row gap-2.5">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold px-5 py-3 rounded-md shadow-md transition-all duration-200"
                          >
                            <WhatsApp size={18} />
                            <span>Continue on WhatsApp</span>
                            <ExternalLink size={15} aria-hidden="true" />
                          </a>

                          <button
                            type="button"
                            onClick={handleResetForm}
                            className="inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-3 rounded-md transition-colors cursor-pointer"
                          >
                            <RefreshCw size={14} />
                            <span>Edit Info</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={handleClose}
                          className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                          Close Dialog
                        </button>
                      </m.div>
                    ) : (
                      <m.form
                        initial="hidden"
                        animate="visible"
                        variants={formStaggerVariants}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        {/* Field 1: Name */}
                        <m.div variants={formFieldVariants}>
                          <label htmlFor="enquiry-name" className="block text-xs font-semibold text-[#0B2F2A] mb-1.5">
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="enquiry-name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Priya Sharma"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B8F5A] focus:ring-2 focus:ring-[#0B8F5A]/20 hover:border-gray-400 transition-all duration-200"
                          />
                        </m.div>

                        {/* Field 2: Phone */}
                        <m.div variants={formFieldVariants}>
                          <label htmlFor="enquiry-phone" className="block text-xs font-semibold text-[#0B2F2A] mb-1.5">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="enquiry-phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B8F5A] focus:ring-2 focus:ring-[#0B8F5A]/20 hover:border-gray-400 transition-all duration-200"
                          />
                        </m.div>

                        {/* Field 3: Location */}
                        <m.div variants={formFieldVariants}>
                          <label
                            htmlFor="enquiry-location"
                            className="block text-xs font-semibold text-[#0B2F2A] mb-1.5"
                          >
                            Location <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="enquiry-location"
                            name="location"
                            type="text"
                            required
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter your area or location"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B8F5A] focus:ring-2 focus:ring-[#0B8F5A]/20 hover:border-gray-400 transition-all duration-200"
                          />
                        </m.div>

                        {/* Field 4: Message */}
                        <m.div variants={formFieldVariants}>
                          <label htmlFor="enquiry-message" className="block text-xs font-semibold text-[#0B2F2A] mb-1.5">
                            Message <span className="text-gray-400 font-normal">(optional)</span>
                          </label>
                          <textarea
                            id="enquiry-message"
                            name="message"
                            rows={2}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your driving experience or questions..."
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B8F5A] focus:ring-2 focus:ring-[#0B8F5A]/20 hover:border-gray-400 transition-all duration-200 resize-none"
                          />
                        </m.div>

                        {/* Field 5: Action & Submit */}
                        <m.div variants={formFieldVariants} className="pt-1 space-y-3">
                          <button
                            type="submit"
                            className="w-full bg-[#0B8F5A] hover:bg-[#087A4C] active:scale-[0.99] text-white text-sm font-semibold py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
                          >
                            <WhatsApp size={18} className="text-white" />
                            <span>Submit Enquiry via WhatsApp</span>
                            <ArrowRight size={16} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
                          </button>

                          <p className="text-[11px] text-center text-gray-500">
                            Clicking submit will redirect you directly to WhatsApp with your details pre-filled.
                          </p>

                          <div className="text-center pt-2 border-t border-gray-100 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-[#0B8F5A]">
                            <span className="inline-flex items-center gap-1.5 text-gray-500">
                              <Phone size={13} aria-hidden="true" />
                              <span>Or call directly:</span>
                            </span>
                            <a
                              href={contact.phoneHref}
                              className="hover:underline text-[#0B8F5A]"
                            >
                              {siteConfig.telephone}
                            </a>
                            <span className="text-gray-300">/</span>
                            <a
                              href={contact.secondaryPhoneHref || "tel:+916369998935"}
                              className="hover:underline text-[#0B8F5A]"
                            >
                              {siteConfig.secondaryPhone}
                            </a>
                          </div>
                        </m.div>
                      </m.form>
                    )}
                  </div>
                </m.div>
              </div>
            )}
          </AnimatePresence>
        </EnquiryContext.Provider>
      </MotionConfig>
    </LazyMotion>
  );
}
