"use client";
import { useState } from "react";
import FooterNav from "@/components/ui/FooterNav";
import Menu from "@/components/Menu";
import Particles from "@/components/showcase/ui/ParticlesBackground";

export default function ShowcasePageDesktop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <main className="relative min-h-screen flex flex-col justify-between bg-[#1A1C20] px-20 py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#FEFEFE", "#E7B751", "#2AFADF"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 flex justify-start items-start pointer-events-none">
        <img
          src="/icons/logo-white.svg"
          alt="logo"
          className="h-16 w-16 lg:h-16 lg:w-16 pointer-events-auto"
        />
      </div>

      <div className="relative z-10 flex-1 flex justify-center items-center px-20 lg:py-16 pointer-events-none">
        <h1 className="text-3xl text-white font-bold pointer-events-auto">
          Showcase Page (Desktop)
        </h1>
      </div>

      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <FooterNav setIsMenuOpen={setIsMenuOpen} variant="dark" />
        </div>
      </div>

      {isMenuOpen && (
        <div className="relative z-20">
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
      )}
    </main>
  );
}