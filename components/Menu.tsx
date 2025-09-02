"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import BoringButton from "./ui/BoringButton";
import { IoMdArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { cubicBezier } from "framer-motion";

const menuLinks = [
  { label: "home", href: "/", external: false },
  { label: "showcase", href: "/showcase", external: false },
  { label: "contact/inquiries", href: "/contact", external: false },
  { label: "instagram", href: "https://www.instagram.com/hanifnurh_/", external: true },
  { label: "facebook", href: "https://www.facebook.com/hanif.nahwan", external: true },
  { label: "pinterest", href: "https://id.pinterest.com/hanifnurh_/", external: true },
  { label: "github", href: "https://github.com/hnifnurh", external: true },
  { label: "linkedin", href: "https://www.linkedin.com/in/hanifnurh/", external: true },
];

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const transition = {
  duration: 1,
  ease: cubicBezier(0.25, 0.1, 0.25, 1),
};

const blur1 = {
  hidden: { filter: "blur(1px)", y: 20, opacity: 0 },
  visible: { filter: "blur(0px)", y: 0, opacity: 1 },
};

const fadeInSmooth = {
  hidden: { opacity: 0, y: 0 }, 
  visible: { opacity: 2, y: 0 },
};

const Menu = ({ isOpen, onClose }: MenuProps) => {
  const container = useRef<HTMLDivElement>(null);
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Detect background theme when menu opens
      const detectBackgroundTheme = () => {
        const main = document.querySelector('main');
        if (main) {
          const computedStyle = window.getComputedStyle(main);
          const backgroundColor = computedStyle.backgroundColor;
          
          // Check if background color is dark
          if (backgroundColor.includes('rgb')) {
            const rgb = backgroundColor.match(/\d+/g);
            if (rgb) {
              const [r, g, b] = rgb.map(Number);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              setIsDarkBackground(brightness < 128);
            }
          } else {
            // Fallback: check background color classes or hex values
            const bgClass = main.className;
            setIsDarkBackground(bgClass.includes('#1A1C20') || bgClass.includes('bg-[#1A1C20]'));
          }
        }
      };

      detectBackgroundTheme();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkClick = (href: string, external: boolean) => {
    if (!external) {
      setTimeout(() => {
        onClose();
      }, 100);
    }
  };

  // Dynamic classes based on detected background
  const textColor = isDarkBackground ? "text-white" : "text-black";
  const logoSrc = isDarkBackground ? "/icons/logo-white.svg" : "/icons/logo-black.svg";
  const baseClass = isDarkBackground 
    ? "inline-flex items-center px-1 py-1 text-white bg-transparent border border-transparent hover:bg-white hover:text-black transition-colors"
    : "inline-flex items-center px-1 py-1 text-black bg-transparent border border-transparent hover:bg-black hover:text-white transition-colors";
  const buttonVariant = isDarkBackground ? "dark" : "light";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 1, ease: "easeOut" }}
      variants={fadeInSmooth}
      className="fixed inset-0 z-50 backdrop-blur-md"
    >
      <motion.nav 
        className="min-h-screen flex flex-start flex-col justify-between px-20 py-20" 
        ref={container} 
        variants={fadeInSmooth}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1.1 }}
      >
        <motion.div 
          className="flex-1 flex mix-blend-difference flex-col justify-center items-center pb-16 sm:px-10 px-5"
          transition={transition} 
          variants={blur1}
        >
          <div className="relative flex flex-col items-center gap-2">
            <img
              src={logoSrc} 
              alt="logo"
              className="h:16 w-16 lg:h-20 lg:w-20" 
            />
            <span className={`text-sm text-center lg:text-xl ${textColor}`}>
              fellthriver - hanifs personal website
            </span>
          </div>

          <div className="relative flex flex-col items-center py-10 text-sm sm:px-10 px-5">
            {menuLinks.map((link, index) => {
              return (
                <div className="menu-link-item" key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className={baseClass}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      href={link.href} 
                      className={baseClass}
                      onClick={() => handleLinkClick(link.href, link.external)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div 
          className="text-sm"
          variants={blur1}
          transition={{ duration: 1.3 }}
        >
          <div onClick={onClose} style={{ cursor: 'pointer' }}>
            <BoringButton
              title="back"
              icon={<IoMdArrowBack />}
              position="left"
              variant={buttonVariant}
            />
          </div>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
};

export default Menu;