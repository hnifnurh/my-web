"use client";
import { useState, useEffect, useMemo } from "react";
import FooterNav from "@/components/ui/FooterNav";
import Menu from "@/components/Menu";
import Particles from "@/components/showcase/ui/ParticlesBackground";
import { useSwitchCards } from '@/hooks/useSwitchCards';
import { projectsData } from '@/lib/data';
import FloatingCard from '@/components/showcase/ui/FloatingCard';
import ProjectCard from "@/components/showcase/ui/ProjectCard";
import VideoPopUp from "@/components/showcase/ui/VideoPopUp";
import WidePopUp from "@/components/showcase/ui/WidePopUp";
import { Project } from "@/lib/dataTypes";
import CategoryDropdown from "@/components/showcase/ui/CategoryDropdown";

export default function ShowcasePageDesktop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("SHOW ALL");
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredDataSource = useMemo(() => {
    if (selectedCategory === "SHOW ALL") {
      return projectsData;
    }
    return projectsData.filter(project => project.type === selectedCategory);
  }, [selectedCategory]);

  const { activeCards, completingCardIds } = useSwitchCards(
    isMounted ? filteredDataSource : [], 
    10, 
    500, 
    10000
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
    <main className="relative min-h-screen flex flex-col justify-between bg-[#1A1C20] px-20 py-16 overflow-hidden">
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
              const project = filteredDataSource[card.dataIndex];
              
              if (!project) return null;

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

      <div className="relative z-20 flex flex-row justify-between items-start pointer-events-auto">
        <img
          src="/icons/logo-white.svg"
          alt="logo"
          className="h-16 w-16 lg:h-16 lg:w-16 pointer-events-auto"
        />
        <CategoryDropdown
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          projects={projectsData}
        />
      </div>

      <div className="relative z-20 pointer-events-none items-end">
        <div className="pointer-events-auto">
          <FooterNav setIsMenuOpen={setIsMenuOpen} variant="dark" />
        </div>
      </div>

      {isMenuOpen && <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}

      {selectedProject && (
        selectedProject.videoUrl ? (
          <VideoPopUp
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            isVisible={!!selectedProject}
          />
        ) : (
          <WidePopUp
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            isVisible={!!selectedProject}
          />
        )
      )}
    </main>
  );
}