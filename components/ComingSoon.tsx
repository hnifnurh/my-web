"use client";

import { useState } from "react";
import Menu from "@/components/Menu";
import BoringButton from "@/components/ui/BoringButton";
import { IoMdArrowForward } from "react-icons/io";
import BLink  from "@/components/utils/BorderLink";

export default function ComingSoon() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="flex flex-col space-y-3 text-sm w-full">
          <div 
          onClick={() => setIsMenuOpen(true)} 
          style={{ cursor: 'pointer' }}
          className="flex justify-end w-full"
          >
            <BoringButton
              title="more info"
              icon={<IoMdArrowForward />}
              position="right"
            />
          </div>
          <p className="text-center lg:text-right">© 2025 hanif, all rights reserved.</p>
        </div>
        
      </main>

      {/* Overlay Menu */}
      {isMenuOpen && <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
