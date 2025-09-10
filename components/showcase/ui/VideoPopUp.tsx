"use client";

import { Project } from "@/lib/dataTypes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type VideoPopUpProps = {
  project: Project;
  onClose: () => void;
  isVisible: boolean;
};

export default function VideoPopUp({ project, onClose, isVisible }: VideoPopUpProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-[660px] max-w-[95%] bg-gradient-to-br from-white/10 to-gray-100/10 backdrop-blur-xl border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-red-500/90 hover:bg-red-600/90 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              ✕
            </button>

            {/* Video section */}
            <div className="w-full aspect-video bg-black relative">
              {project.videoUrl ? (
                <iframe
                  src={project.videoUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-500/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content section - GRADIENT SAMA PERSIS */}
            <div className="flex flex-row p-8 space-y-6 overflow-hidden">
              <div id="namedesc" className="flex-1 flex flex-col pr-6">
                {/* Title and subtitle */}
                <div>
                  <h2 className="text-xl font-bold text-white drop-shadow-md">{project.title}</h2>
                  <h3 className="text-lg font-bold text-[#FF5768] mt-1 drop-shadow-md">{project.company}</h3>
                </div>

                {/* Description */}
                <div className="overflow-y-auto max-h-[80px] flex-shrink">
                  <p className="text-white/90 text-md leading-relaxed mt-4 drop-shadow-md">
                    {project.desc}
                  </p>
                </div>
                
              </div>

              {/* Tech stack - BACKGROUND SAMA PERSIS */}
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide drop-shadow-md">Tech Stack</h4>
                <div className="flex gap-3 flex-wrap">
                  {project.techStack?.map((tech, i) => (
                    <div key={i} className="flex flex-col items-center backdrop-blur-sm bg-white/10 p-2">
                      <img
                        src={tech.url}
                        alt={tech.name}
                        className="w-8 h-8 object-contain mb-1 filter drop-shadow-md"
                      />
                      <span className="text-[10px] text-white/80">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Button section - GRADIENT SAMA PERSIS */}
            <div className="pb-8 px-8">
              <div className="pt-4">
                <a
                  href={project.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 transition-all text-white text-center tracking-wider font-medium shadow-md hover:shadow-lg active:shadow-lg backdrop-blur-sm border border-white/20"
                >
                  VISIT THE SITE
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}