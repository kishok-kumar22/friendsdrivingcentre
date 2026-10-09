import { Mail, MapPin, Phone } from "lucide-react";
import { Facebook, Instagram, Youtube } from "./SocialIcons";
import { siteConfig } from "@/lib/siteConfig";
import Logo from "./Logo";

const socialIconMap = {
  Facebook,
  Instagram,
  YouTube: Youtube,
};

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0B3C4D] text-white pt-9 sm:pt-11 pb-6 scroll-mt-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Footer Row: Stacks into 1 column on mobile */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8">
          {/* Logo (White Variant) */}
          <div className="w-full lg:w-auto flex justify-start">
            <Logo light />
          </div>

          {/* Contact Details Stack: 1 column on mobile, 3 columns on tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10 w-full lg:w-auto">
            {/* Email (Label 13px, Value 14px) */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3.5 text-white/90 hover:text-white transition-colors group"
            >
              <Mail
                size={20}
                className="text-white/80 group-hover:text-[#E6F5F3] flex-shrink-0"
                aria-hidden="true"
              />
              <div className="flex flex-col text-[12px] sm:text-[13px] leading-snug">
                <span className="font-semibold text-white/70">Email</span>
                <span className="text-[13px] sm:text-[14px] mt-0.5 text-white">
                  {siteConfig.email}
                </span>
              </div>
            </a>

            {/* Phone (Label 13px, Value 14px) */}
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-3.5 text-white/90 hover:text-white transition-colors group"
            >
              <Phone
                size={20}
                className="text-white/80 group-hover:text-[#E6F5F3] flex-shrink-0"
                aria-hidden="true"
              />
              <div className="flex flex-col text-[12px] sm:text-[13px] leading-snug">
                <span className="font-semibold text-white/70">Phone</span>
                <span className="text-[13px] sm:text-[14px] mt-0.5 text-white">
                  {siteConfig.telephone}
                </span>
              </div>
            </a>

            {/* Location (Label 13px, Value 14px) */}
            <div className="flex items-center gap-3.5 text-white/90">
              <MapPin size={20} className="text-white/80 flex-shrink-0" aria-hidden="true" />
              <div className="flex flex-col text-[12px] sm:text-[13px] leading-snug">
                <span className="font-semibold text-white/70">Location</span>
                <span className="text-[13px] sm:text-[14px] mt-0.5 text-white">
                  {siteConfig.displayAddress}
                </span>
              </div>
            </div>
          </div>

          {/* Social Icons with hover scale + lift */}
          <div className="flex items-center gap-5 text-white/85" aria-label="Social media profiles">
            {siteConfig.socialLinks.map((social) => {
              const IconComp = socialIconMap[social.name];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Friends Driving Centre on ${social.name}`}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0B8F5A] hover:text-white hover:-translate-y-1 hover:scale-110 transition-all duration-200"
                >
                  <IconComp size={19} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider Line & Copyright (upgraded to 12-13px) */}
        <div className="border-t border-white/15 pt-5 text-center">
          <p className="text-[12px] sm:text-[13px] text-white/75 tracking-wide">
            &copy; 2025 Friends Driving Centre. All rights reserved. Serving Chennai, Tambaram &amp; Velachery.
          </p>
        </div>
      </div>
    </footer>
  );
}
