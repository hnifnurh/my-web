"use client";

import { Project } from "@/lib/dataTypes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type WidePopUpProps = {
  project: Project;
  onClose: () => void;
  isVisible: boolean;
};

export default function WidePopUp({ project, onClose, isVisible }: WidePopUpProps) {
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-[1000px] max-w-[95%] h-[500px] bg-gradient-to-br from-white/10 to-gray-100/10 backdrop-blur-xl border border-white/20 overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-red-500/90 hover:bg-red-600/90 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              ✕
            </button>

            {/* Left content - Text section */}
            <div className="flex-1 p-8 flex flex-col justify-between bg-gradient-to-r from-white/15 to-gray-50/15 backdrop-blur-md border-r border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white drop-shadow-md">{project.title}</h2>
                <h3 className="text-lg font-semibold text-red-400 drop-shadow-md">{project.company}</h3>
                
                <div className="my-2 border-t border-white/20"></div>
                
                <p className="text-white/90 text-xs leading-relaxed drop-shadow-md">{project.desc}</p>
                
                <div className="my-2 border-t border-white/20"></div>
                
                <h4 className="text-lg font-semibold text-white mb-3 drop-shadow-md">Tech Stack</h4>
                <div className="flex gap-3 flex-wrap">
                  {project.techStack?.map((tech, i) => (
                    <div key={i} className="flex flex-col items-center backdrop-blur-sm bg-black/20 p-2">
                      <img
                        src={tech.url}
                        alt={tech.name}
                        className="w-5 h-5 object-contain mb-1 filter drop-shadow-md"
                      />
                      <span className="text-xs text-white/80">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Link button */}
              <a
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 transition-all text-white tracking-wider font-medium text-center shadow-md hover:shadow-lg backdrop-blur-sm border border-white/20"
              >
                VISIT THE SITE
              </a>
            </div>

            {/* Right image section */}
            <div className="flex-1 relative overflow-hidden">
              <img
                src={project.imageUrl || "/placeholder-project.jpg"}
                alt={project.title}
                className="w-full h-full object-cover absolute inset-0"
              />
              {/* Glass overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent backdrop-blur-[1px]"></div>
              
              {/* Additional glass effect on top of image */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}