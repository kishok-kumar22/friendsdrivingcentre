"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Phone, X, ExternalLink, RefreshCw } from "lucide-react";
import { contact, programs } from "@/lib/data";
import { WhatsApp } from "./SocialIcons";

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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<EnquiryFormData>(initialFormState);
  const [whatsappUrl, setWhatsappUrl] = useState<string>("");

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

          {/* Enquiry Modal Dialog */}
          <dialog
            ref={dialogRef}
            onCancel={handleClose}
            className="fixed inset-0 m-auto z-50 p-0 rounded-2xl bg-white shadow-2xl border border-[#E5EEEC] max-w-lg w-[92%] backdrop:bg-[#0B2F2A]/60 backdrop:backdrop-blur-sm max-h-[90vh] overflow-y-auto"
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
                <WhatsApp size={24} className="text-[#0B8F5A]" />
              </div>

              <h2 className="text-[22px] font-bold text-[#0B2F2A]">
                Book a Training Enquiry
              </h2>
              <p className="text-[13px] text-[#6B7280] mt-1 mb-6">
                Take the first step towards confident driving. Submitting directly connects you with our trainers on WhatsApp.
              </p>

              {submitted ? (
                <div className="py-2 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#E8F8F0] text-[#25D366] flex items-center justify-center mb-3">
                    <CheckCircle2 size={40} className="text-[#0B8F5A]" aria-hidden="true" />
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2F2A]">
                    Enquiry Details Prepared!
                  </h3>
                  <p className="text-sm text-[#4B5563] mt-1.5 max-w-sm">
                    We have redirected you to WhatsApp with all your filled details. If it did not open automatically, tap below:
                  </p>

                  {/* Summary card showing scraped details */}
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
                      className="inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-3 rounded-md transition-colors"
                    >
                      <RefreshCw size={14} />
                      <span>Edit Info</span>
                    </button>
                  </div>

                  <button
                    onClick={handleClose}
                    className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Close Dialog
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="enquiry-name" className="block text-xs font-semibold text-[#0B2F2A] mb-1">
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
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0B8F5A] focus:ring-1 focus:ring-[#0B8F5A]"
                      />
                    </div>
                    <div>
                      <label htmlFor="enquiry-phone" className="block text-xs font-semibold text-[#0B2F2A] mb-1">
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
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0B8F5A] focus:ring-1 focus:ring-[#0B8F5A]"
                      />
                    </div>

                  <div>
                    <label
                      htmlFor="enquiry-location"
                      className="block text-xs font-semibold text-[#0B2F2A] mb-1"
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
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0B8F5A] focus:ring-1 focus:ring-[#0B8F5A]"
                    />
                  </div>
                 

                  

                  

                  <div>
                    <label htmlFor="enquiry-message" className="block text-xs font-semibold text-[#0B2F2A] mb-1">
                      Message <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="enquiry-message"
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your driving experience or questions..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0B8F5A] focus:ring-1 focus:ring-[#0B8F5A] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#0B8F5A] hover:bg-[#087A4C] text-white text-sm font-semibold py-3 rounded-md shadow-sm transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
                  >
                    <WhatsApp size={18} className="text-white" />
                    <span>Submit Enquiry via WhatsApp</span>
                    <ArrowRight size={16} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[11px] text-center text-gray-500">
                    Clicking submit will redirect you directly to WhatsApp with your details pre-filled.
                  </p>

                  <div className="text-center pt-1 border-t border-gray-100">
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
