"use client";

import { useState } from "react";
import FooterNav from "@/components/ui/FooterNav";
import Menu from "@/components/Menu"; 

export default function ShowcasePageDesktop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col justify-between bg-[#1A1C20] px-20 py-16">
        <div className="flex justify-start items-start">
            <img
                src="/icons/logo-white.svg"
                alt="logo"
                className="h-16 w-16 lg:h-16 lg:w-16"
            />
        </div>

        <div className="flex-1 flex justify-center items-center px-20 lg:py-16">
            <h1 className="text-3xl text-white font-bold">Showcase Page (Desktop)</h1>
        </div>

        <FooterNav setIsMenuOpen={setIsMenuOpen} variant="dark"/>

        {isMenuOpen && (
            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}
    </main>
  );
}
