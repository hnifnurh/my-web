"use client";
import React from "react";
import Link from "next/link";

interface UnderLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

const UnderLink: React.FC<UnderLinkProps> = ({ href, children, external, className }) => {
  const baseClass = `
    hover:border-transparent hover:bg-black hover:text-white 
    focus:border-transparent focus:bg-black focus:text-white 
    transition-colors
  `;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${className || ""}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClass} ${className || ""}`}>
      {children}
    </Link>
  );
};

export default UnderLink;
