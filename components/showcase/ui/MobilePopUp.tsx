"use client";

import { Project } from "@/lib/dataTypes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type MobilePopUpProps = {
  project: Project;
  onClose: () => void;
  isVisible: boolean;
};

export default function MobilePopUp({ project, onClose, isVisible }: MobilePopUpProps) {
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
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-[85vw] max-h-[80vh] bg-gradient-to-br from-white/10 to-gray-100/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-10 bg-red-500/90 hover:bg-red-600/90 text-white rounded-full w-7 h-7 flex items-center justify-center transition-colors backdrop-blur-sm text-sm"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Media Section - 3:2 aspect ratio */}
            <div className="w-full aspect-[3/2] bg-black relative flex-shrink-0">
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
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Content section - stacked vertically for mobile */}
            <div className="flex flex-col p-3 space-y-3 flex-1 overflow-hidden">
              {/* Title and subtitle */}
              <div className="flex-shrink-0">
                <h2 className="text-lg font-bold text-white drop-shadow-md">{project.title}</h2>
                <h3 className="text-sm font-bold text-[#FF5768] drop-shadow-md">{project.company}</h3>
              </div>

              {/* Description with scroll */}
              <div className="overflow-y-auto max-h-[80px] flex-shrink">
                <p className="text-white/90 text-xs leading-relaxed drop-shadow-md pr-2">
                  {project.desc}
                </p>
              </div>

              {/* Tech stack */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wide drop-shadow-md">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.slice(0, 4).map((tech, i) => (
                    <div key={i} className="flex flex-col items-center backdrop-blur-sm bg-white/10 p-1">
                      <img
                        src={tech.url}
                        alt={tech.name}
                        className="w-5 h-5 object-contain mb-0.5 filter drop-shadow-md"
                      />
                      <span className="text-[10px] text-white/80">{tech.name}</span>
                    </div>
                  ))}
                  {project.techStack && project.techStack.length > 4 && (
                    <div className="flex flex-col items-center backdrop-blur-sm bg-white/10 p-1">
                      <div className="w-5 h-5 flex items-center justify-center mb-0.5">
                        <span className="text-[10px] font-bold text-white/80">+{project.techStack.length - 4}</span>
                      </div>
                      <span className="text-[10px] text-white/80">More</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Button section */}
            <div className="pb-3 px-3 flex-shrink-0">
              <a
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-all text-white text-center text-xs font-medium shadow-md hover:shadow-lg backdrop-blur-sm border border-white/20"
              >
                VISIT THE SITE
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}