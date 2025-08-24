"use client";

import Image from "next/image";
import React, { useRef } from "react";
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

  if (!isOpen) return null;

  const handleLinkClick = (href: string, external: boolean) => {
    if (!external) {
      setTimeout(() => {
        onClose();
      }, 100);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.nav 
        className="backdrop-blur background-transparent flex flex-start flex-col justify-between min-h-screen px-20 py-20" 
        ref={container} 
        variants={fadeInSmooth}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1.1 }}
      >
        <motion.div 
          className="flex-1 flex flex-col justify-center items-center pb-16 sm:px-10 px-5"
          transition={transition} 
          variants={blur1}
        >
          <div className="relative flex flex-col items-center gap-2">
              <Image
                src="/icons/logo-white.svg"
                alt="logo"
                className="h-20 w-20"
                width={80}
                height={80}
              />
            <span className="text-lg text-white">
              fellthriver - hanifs personal website
            </span>
          </div>

          <div className="relative flex flex-col items-center py-10 text-sm sm:px-10 px-5">
            {menuLinks.map((link, index) => {
              const baseClass =
                "inline-flex items-center px-1 py-1 text-black bg-transparent border border-transparent hover:bg-black hover:text-white transition-colors";

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
            />
          </div>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
};

export default Menu;