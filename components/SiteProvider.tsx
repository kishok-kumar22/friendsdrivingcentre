"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Phone, X } from "lucide-react";
import { contact, programs } from "@/lib/data";

const EnquiryContext = createContext<() => void>(() => {});

export function useEnquiry() {
  return useContext(EnquiryContext);
}

export function EnquiryButton({
  children,
  className = "inline-flex items-center gap-2 bg-[#0B8F5A] hover:bg-[#087A4C] text-white text-[13px] font-semibold px-4 py-2.5 rounded-md shadow-sm transition-all duration-200 cursor-pointer",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const open = useEnquiry();
  return (
    <button className={className} onClick={open} type="button">
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      document.body.style.overflow = "hidden";
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOpen = () => {
    setSubmitted(false);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <EnquiryContext.Provider value={handleOpen}>
          {children}

          {/* Enquiry Modal Dialog */}
          <dialog
            ref={dialogRef}
            onCancel={handleClose}
            className="fixed inset-0 m-auto z-50 p-0 rounded-2xl bg-white shadow-2xl border border-[#E5EEEC] max-w-lg w-[92%] backdrop:bg-[#0B2F2A]/60 backdrop:backdrop-blur-sm"
          >
            <div className="relative p-6 sm:p-7">
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Close enquiry dialog"
              >
                <X size={20} aria-hidden="true" />
              </button>

              <div className="w-12 h-12 rounded-full bg-[#E6F5F3] flex items-center justify-center text-[#0B8F5A] mb-4">
                <Mail size={22} aria-hidden="true" />
              </div>

              <h2 className="text-[22px] font-bold text-[#0B2F2A]">
                Book a Training Enquiry
              </h2>
              <p className="text-[13px] text-[#6B7280] mt-1 mb-6">
                Take the first step towards confident driving with our certified instructors.
              </p>

              {submitted ? (
                <div className="py-6 text-center flex flex-col items-center">
                  <CheckCircle2 size={44} className="text-[#0B8F5A] mb-3" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-[#0B2F2A]">
                    Enquiry Received!
                  </h3>
                  <p className="text-sm text-[#6B7280] mt-1 max-w-xs">
                    Thank you! Our team will contact you shortly on your provided phone number.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 inline-flex items-center justify-center bg-[#0B8F5A] text-white text-sm font-semibold px-6 py-2.5 rounded-md hover:bg-[#087A4C] transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B2F2A] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0B8F5A] focus:ring-1 focus:ring-[#0B8F5A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B2F2A] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0B8F5A] focus:ring-1 focus:ring-[#0B8F5A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B2F2A] mb-1">
                      Training Program
                    </label>
                    <select
                      defaultValue="One-to-One Mentor"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0B8F5A] focus:ring-1 focus:ring-[#0B8F5A] bg-white"
                    >
                      {programs.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                      <option value="Custom Consultation">Help me choose</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B2F2A] mb-1">
                      Preferred Timings
                    </label>
                    <select
                      defaultValue="Flexible"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0B8F5A] focus:ring-1 focus:ring-[#0B8F5A] bg-white"
                    >
                      <option value="Flexible">Flexible</option>
                      <option value="Early Morning (6 AM - 9 AM)">
                        Early Morning (6 AM - 9 AM)
                      </option>
                      <option value="Daytime (10 AM - 4 PM)">
                        Daytime (10 AM - 4 PM)
                      </option>
                      <option value="Late Evening (5 PM - 8 PM)">
                        Late Evening (5 PM - 8 PM)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B2F2A] mb-1">
                      Message <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us about your driving experience or questions..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0B8F5A] focus:ring-1 focus:ring-[#0B8F5A] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#0B8F5A] hover:bg-[#087A4C] text-white text-sm font-semibold py-2.5 rounded-md shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Enquiry</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>

                  <div className="text-center pt-2">
                    <a
                      href={contact.phoneHref}
                      className="inline-flex items-center gap-2 text-xs font-medium text-[#0B8F5A] hover:underline"
                    >
                      <Phone size={13} aria-hidden="true" />
                      <span>Or call directly: {contact.phone}</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </dialog>
        </EnquiryContext.Provider>
      </MotionConfig>
    </LazyMotion>
  );
}
