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
    inline-flex items-center px-1 text-black bg-transparent 
    border-b border-black-500 w-fit
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
