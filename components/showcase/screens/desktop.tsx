"use client";
import { useState } from "react";
import FooterNav from "@/components/ui/FooterNav";
import Menu from "@/components/Menu";
import Starfield from '@/components/showcase/ui/StarField';
import { useSwitchCards } from '@/hooks/useSwitchCards';
import { projectsData } from '@/lib/data';
import FloatingCard from '@/components/showcase/ui/FloatingCard';
import ProjectCard from "@/components/showcase/ui/ProjectCard";



export default function ShowcasePageDesktop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeCards, completingCardIds } = useSwitchCards(projectsData, 10, 500, 10000);
  const handleCardComplete = (cardId: number) => {
    // Logic untuk menghapus kartu dari state jika diperlukan
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-between bg-[#1A1C20] px-20 py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Starfield
          starCount={1000}
          starColor={[255, 255, 255]}
          speedFactor={0.1}
          backgroundColor="#1A1C20"
        />
      </div>

      <div className="relative z-20 flex justify-start items-start pointer-events-none">
        <img
          src="/icons/logo-white.svg"
          alt="logo"
          className="h-16 w-16 lg:h-16 lg:w-16 pointer-events-auto"
        />
      </div>

      <div className="z-10 pointer-events-none">
        <div className="fixed inset-0 w-full h-full pointer-events-auto">
          {activeCards.map(card => (
            <FloatingCard
              key={card.key}
              cardId={card.id}
              onComplete={() => handleCardComplete(card.id)}
              shouldComplete={completingCardIds.includes(card.id)}
            >
              <ProjectCard project={projectsData[card.dataIndex]} />
            </FloatingCard>
          ))}
        </div>
      </div>



      <div className="relative z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <FooterNav setIsMenuOpen={setIsMenuOpen} variant="dark" />
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 relative z-30">
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
      )}
    </main>
  );
}
