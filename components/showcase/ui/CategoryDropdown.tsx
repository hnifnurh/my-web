// components/showcase/ui/CategoryDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Project } from "@/lib/dataTypes";
import BoringButton from "@/components/ui/BoringButton";
import { IoIosArrowDown } from "react-icons/io";

interface CategoryDropdownProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  projects: Project[];
}

export default function CategoryDropdown({
  selectedCategory,
  onCategoryChange,
  projects
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allCategories = ["SHOW ALL", ...new Set(projects.map(project => project.type))];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown Button menggunakan BoringButton */}
      <BoringButton
        title={selectedCategory}
        icon={<IoIosArrowDown size={24} />}
        position="left"
        handleClick={() => setIsOpen(!isOpen)}
        variant="dark"
        otherClasses="px-2 text-sm"
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1 right-0 border border-white text-white">
          <div className="py-1">
            {allCategories.map((category) => (
              <button
                key={category}
                className={`block w-full text-right px-4 py-1 text-sm transition-all ${
                  selectedCategory="text-white hover:bg-white hover:text-black focus:bg-white focus:text-black"
                }`}
                onClick={() => {
                  onCategoryChange(category);
                  setIsOpen(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}