"use client";

import Image from "next/image";
import { useState } from "react";
import Menu from "@/components/Menu";
import BoringButton from "@/components/ui/BoringButton";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleShowMenu = () => {
    console.log("Menu opening..."); 
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    console.log("Menu closing..."); 
    setIsMenuOpen(false);
  };

  return (
    <>
      <main className="fixed flex flex-start flex-col justify-between min-h-screen px-20 py-20">
        <div className="flex-1 flex flex-col justify-center w-full">
          <div className="relative h-48 w-full">
            <img
              className="h-48 w-full object-cover object-[26%_46%]"
              src="/images/hanif.JPG"
              alt="hanif"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/icons/logo-white.svg" 
                alt="logo"
                className="h-20 w-20" 
              />
            </div>
          </div>

          <div className="relative w-5/6 flex flex-col py-10 text-lg">
            <div className="home-work">
              <p>hanif is a designer and digital creative who has worked on a variety of projects, from independent explorations to collaborative productions. His works move between visual and digital spaces, taking shape in graphic design, photography, post-production, front-end development, mobile development, and UI/UX design.</p>
              <br />
            </div>
            <div className="home-experience">
              <p>Beyond personal projects, Hanif has also contributed through collective initiatives and organizational work. Some of his experiences include collaborations with EM UB, RAJA Brawijaya, GDSC, GDGoC, GDGCLOUDJAKARTA, TEDx Brawijaya, and others.</p>
              <br />
            </div>
            <div className="home-current">
              <p>hanif is currently being a Media Creative lead at GDGoC Undergraduate of Information Technology, Brawijaya University, Designer, Programmer, UI/UX</p>
              <br />
            </div>
            <div className="home-open">
              <p>hanif is open for commissioned work and collaboration.</p>
            </div>
          </div>
        </div>
          
        <div className="flex flex-col items-end space-y-3 text-sm">
          <div onClick={handleShowMenu} style={{ cursor: 'pointer' }}>
            <BoringButton
              title="more info"
              icon={<IoMdArrowForward />}
              position="right"
            />
          </div>
          <p>© 2025 hanif, all rights reserved.</p>
        </div>
      </main>

      {isMenuOpen && <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} />}
    </>
  );
}