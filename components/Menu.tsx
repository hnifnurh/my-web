"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import BoringButton from "./ui/BoringButton";
import { IoMdArrowBack } from "react-icons/io";
import { motion } from "framer-motion";

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

const Menu = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="flex flex-col justify-center min-h-screen mx-20 px-2" ref={container}>
      <div className="relative flex items-center flex-col overflow-hidden sm:px-10 px-5">
        {/* Logo */}
        <div className="menu-logo flex items-center gap-2">
          <div className="logo-image">
            {/* logohere */}
          </div>
          <span className="">
            fellthriver - hanif's personal website
          </span>
        </div>

        {/* Links */}
        <div className="menu-list flex items-center gap-1 flex-col py-10 sm:px-10 px-5">
          {menuLinks.map((link, index) => (
            <div className="menu-link-item" key={index}>
              {link.external ? (
                <a
                  href={link.href}
                  className="menu-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className="menu-link">
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Back button */}
      <div className="text-sm">
        <BoringButton
          title="back"
          icon={<IoMdArrowBack />}
          position="left"
        />
      </div>
    </nav>
  );
};

export default Menu;
