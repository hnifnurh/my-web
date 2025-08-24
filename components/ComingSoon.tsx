"use client";

import { useState } from "react";
import Menu from "@/components/Menu";
import BoringButton from "@/components/ui/BoringButton";
import { IoMdArrowForward } from "react-icons/io";
import BLink  from "@/components/utils/BorderLink";

export default function ComingSoon() {
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
    <>
      <main className="min-h-screen flex flex-col justify-between items-center px-6 py-6 lg:px-20 lg:py-16">
        
        <div className="flex flex-1 flex-col justify-center items-center space-y-6">
          <img
            src="/icons/logo-black.svg"
            alt="logo"
            className="h-14 w-14 lg:h-28 lg:w-28"
          />
          <BLink className="text-4xl lg:text-9xl font-mono" href="https://youtu.be/dQw4w9WgXcQ?si=rrNb6y_jqH_ppkkb">coming soon</BLink>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-end space-y-3 text-sm ml-auto">
          <div onClick={handleShowMenu} style={{ cursor: 'pointer' }}>
            <BoringButton
              title="more info"
              icon={<IoMdArrowForward />}
              position="right"
            />
          </div>
          <p>© 2025 hanif, all rights reserved.</p>
        </div>
        
      </main>

      {/* Overlay Menu */}
      {isMenuOpen && <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
