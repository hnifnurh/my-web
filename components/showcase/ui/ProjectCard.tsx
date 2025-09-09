"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/dataTypes";
import React, { useState, useRef, useEffect } from "react";

type ProjectCardProps = {
  project: Project;
  onClick?: () => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video play/pause on hover
  useEffect(() => {
    if (videoRef.current && project.videoUrl) {
      if (isHovered) {
        videoRef.current.play().catch(error => {
          console.log("Autoplay prevented:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered, project.videoUrl]);

  return (
    <button
      onClick={onClick}
      className="space-y-3 text-left focus:outline-none w-full"
    >
      <motion.div
        className="relative w-56 aspect-[3/2] overflow-hidden cursor-pointer mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          filter: isHovered ? "drop-shadow(0 0 20px #FEFEFE)" : "none",
        }}
      >
        {project.videoUrl ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={project.videoUrl}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setIsVideoLoaded(true)}
              style={{
                opacity: isVideoLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
            
            {/* Loading placeholder */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="animate-pulse">
                  <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            )}

            {/* Play icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover pointer-events-none"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}

        {/* Glowing border effect on hover */}
        <motion.div
          className="absolute inset-0 border-1 border-white pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Bottom left corner - Always visible title */}
        <motion.div
          className="absolute bottom-4 left-4 text-white pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <h4 className="text-sm font-medium drop-shadow-lg">
            {project.title}
          </h4>
        </motion.div>
      </motion.div>

      {/* Text content outside card - shows on hover */}
      <motion.div
        className="text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: isHovered ? 0.15 : 0,
        }}
      >
        <p className="text-sm font-bold">{project.title}</p>
        <p className="text-xs text-gray-300 mb-1">{project.company}</p>
        <p className="text-[10px] text-gray-400">
          {project.videoUrl ? "Watch video" : "View project"}
        </p>
      </motion.div>
    </button>
  );
};

export default ProjectCard;