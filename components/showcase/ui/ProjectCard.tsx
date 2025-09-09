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

  const getVideoType = (url: string): 'youtube' | 'uploadthing' | 'other' => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('ufs.sh') || url.includes('uploadthing.com')) {
      return 'uploadthing';
    }
    return 'other';
  };

  const getYouTubeId = (url: string): string => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
  };

  const videoType = project.videoUrl ? getVideoType(project.videoUrl) : null;

  useEffect(() => {
    if (videoRef.current && project.videoUrl && videoType !== 'youtube') {
      if (isHovered) {
        videoRef.current.play().catch(error => {
          console.log("Autoplay prevented:", error);
        });
      } else {
        videoRef.current.pause();
        if (!videoRef.current.loop) {
          videoRef.current.currentTime = 0;
        }
      }
    }
  }, [isHovered, project.videoUrl, videoType]);

  // Handler untuk mobile (tap/click)
  const handleMobileInteraction = () => {
    if (window.innerWidth < 768) { // Mobile breakpoint
      setIsHovered(prev => !prev);
    }
  };

  return (
    <button
      onClick={() => {
        handleMobileInteraction();
        if (onClick) onClick();
      }}
      className="space-y-3 text-left focus:outline-none w-full group"
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-40 md:w-64 aspect-[3/2] overflow-hidden cursor-pointer mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: window.innerWidth >= 768 ? 1.02 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          filter: isHovered ? "drop-shadow(0 0 20px #FEFEFE)" : "none",
        }}
      >
        {project.videoUrl ? (
          <div className="relative w-full h-full">
            {videoType === 'youtube' ? (
              <>
                <img
                  src={`https://img.youtube.com/vi/${getYouTubeId(project.videoUrl)}/maxresdefault.jpg`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onLoad={() => setIsVideoLoaded(true)}
                  onError={(e) => {
                    e.currentTarget.src = project.imageUrl;
                    setIsVideoLoaded(true);
                  }}
                />
              </>
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  className="w-full h-full object-cover hide-video-controls"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls={false}
                  onLoadedData={() => setIsVideoLoaded(true)}
                  style={{
                    opacity: isVideoLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                />
              </>
            )}
            
            {/* Loading placeholder */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="animate-pulse">
                  <div className="w-6 h-6 md:w-10 md:h-10 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            )}

            {/* PLAY ICON OVERLAY UNTUK KEDUA TIPE VIDEO */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-focus:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-8 h-8 md:w-14 md:h-14 bg-black/60 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                <svg className="w-4 h-4 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

          </div>
        ) : (
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: window.innerWidth >= 768 ? 1.1 : 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onLoad={() => setIsVideoLoaded(true)}
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
          className="absolute bottom-2 left-2 md:bottom-3 md:left-3 text-white pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <h4 className="text-xs md:text-base font-medium drop-shadow-lg">
            {project.title}
          </h4>
        </motion.div>
      </motion.div>

      {/* Text content outside card - shows on hover/focus */}
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
        <p className="text-xs md:text-base font-bold">{project.title}</p>
        <p className="text-[10px] md:text-sm text-gray-300 mb-1">{project.company}</p>
        <p className="text-[9px] md:text-[11px] text-gray-400">
          {project.videoUrl ? 
            (videoType === 'youtube' ? "Watch on YouTube" : "Watch video") 
            : "View project"
          }
        </p>
      </motion.div>
    </button>
  );
};

export default ProjectCard;