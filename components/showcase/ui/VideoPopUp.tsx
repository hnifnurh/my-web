"use client";

import { Project } from "@/lib/dataTypes";

type VideoPopUpProps = {
  project: Project;
  onClose: () => void;
};

export default function VideoPopUp({ project, onClose }: VideoPopUpProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[885px] max-w-[95%] bg-gradient-to-br from-white/10 to-gray-100/10 backdrop-blur-xl border border-white/20 overflow-hidden shadow-2xl">
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

        {/* Content section */}
        <div className="flex flex-row p-8 space-y-6 bg-gradient-to-r from-white/15 to-gray-50/15 backdrop-blur-md">
          <div id="namedesc" className="flex-1 flex flex-col pr-6">
            {/* Title and subtitle */}
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-md">{project.title}</h2>
              <h3 className="text-lg font-bold text-[#FF5768] mt-1 drop-shadow-md">{project.company}</h3>
            </div>

            {/* Description */}
            <p className="text-white/90 text-xs leading-relaxed mt-4 drop-shadow-md">
              {project.desc}
            </p>
          </div>

          {/* Tech stack */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide drop-shadow-md">Tech Stack</h4>
            <div className="flex gap-3 flex-wrap">
              {project.techStack?.map((tech, i) => (
                <div key={i} className="flex flex-col items-center backdrop-blur-sm bg-black/20 rounded-lg p-2">
                  <img
                    src={tech.url}
                    alt={tech.name}
                    className="w-8 h-8 object-contain mb-1 filter drop-shadow-md"
                  />
                  <span className="text-xs text-white/80">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button section */}
        <div className="pb-8 px-8 bg-gradient-to-r from-white/15 to-gray-50/15 backdrop-blur-md">
          <div className="pt-4">
            <a
              href={project.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 transition-all text-white text-center tracking-wider font-medium shadow-md hover:shadow-lg backdrop-blur-sm border border-white/20"
            >
              VISIT THE SITE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}