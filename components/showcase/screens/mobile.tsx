"use client";
import { useState, useEffect, useMemo } from "react";
import FooterNav from "@/components/ui/FooterNav";
import Menu from "@/components/Menu";
import Particles from "@/components/showcase/ui/ParticlesBackground";
import { useSwitchCards } from '@/hooks/useSwitchCards';
import { projectsData } from '@/lib/data';
import FloatingCard from '@/components/showcase/ui/FloatingCard';
import ProjectCard from "@/components/showcase/ui/ProjectCard";
import MobilePopUp from "@/components/showcase/ui/MobilePopUp";
import { Project } from "@/lib/dataTypes";

export default function ShowcasePageMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { activeCards, completingCardIds } = useSwitchCards(
    isMounted ? projectsData : [], 
    6, 
    500, 
    8000
  );
  
  const handleCardComplete = (cardId: string) => {
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <main className="relative min-h-screen flex flex-col justify-between bg-[#1A1C20] px-6 py-6 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Particles
          particleColors={["#FEFEFE", "#E7B751", "#0033ffff", "#f4192fff"]}
          particleCount={800}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />

        <div className="z-10 pointer-events-none">
          <div className="absolute inset-0 w-full h-full pointer-events-auto">
            {activeCards.map(card => {
              const project = projectsData[card.dataIndex];
              return (
                <FloatingCard
                  key={card.key}
                  cardId={card.id}
                  onComplete={() => handleCardComplete(card.id)}
                  shouldComplete={completingCardIds.includes(card.id)}
                >
                  <ProjectCard 
                    project={project} 
                    onClick={() => handleProjectClick(project)}
                  />
                </FloatingCard>
              );
            })}
          </div>
        </div>
      </div>

      {/* HEADER SECTION - Diperbaiki */}
      <div className="relative z-20 flex justify-start items-start pointer-events-auto">
        <img
          src="/icons/logo-white.svg"
          alt="logo"
          className="h-16 w-16 lg:h-16 lg:w-16 pointer-events-auto"
        />
      </div>

      {/* FOOTER SECTION - Diperbaiki */}
      <div className="relative z-20 flex flex-col space-y-3 text-sm w-full items-end pointer-events-auto">
        <FooterNav setIsMenuOpen={setIsMenuOpen} variant="dark"/>
      </div>

      {isMenuOpen && <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}

      {/* Render Popups berdasarkan jenis project */}
      {selectedProject && (
        <MobilePopUp
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            isVisible={!!selectedProject}
        />
      )}
    </main>
  );
}