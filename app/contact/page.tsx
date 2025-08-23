"use client";

import { useState } from "react";
import Menu from "@/components/Menu";
import BoringButton from "@/components/ui/BoringButton";
import { IoMdArrowForward } from "react-icons/io";

export default function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleShowMenu = () => {
    console.log("Menu opening...");
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    console.log("Menu closing...");
    setIsMenuOpen(false);
  };

  return (
    <div className="page-content">
      <h1>
        contact<sup>(03)</sup>
      </h1>

      <div className="flex flex-col items-end space-y-3 text-sm">
        <div onClick={handleShowMenu} style={{ cursor: "pointer" }}>
          <BoringButton
            title="more info"
            icon={<IoMdArrowForward />}
            position="right"
          />
        </div>
        <p>© 2025 hanif, all rights reserved.</p>
      </div>

      {/* Render Menu kalau terbuka */}
      {isMenuOpen && <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} />}
    </div>
  );
}
