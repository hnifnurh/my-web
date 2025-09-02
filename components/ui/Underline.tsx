"use client";
import React from "react";

interface UnderlineProps {
  children: React.ReactNode;
  className?: string;
}

const Underline: React.FC<UnderlineProps> = ({ children, className }) => {
  return (
    <span
      className={`underline decoration-black-500 decoration-1 underline-offset-4 ${className || ""}`}
    >
      {children}
    </span>
  );
};

export default Underline;
