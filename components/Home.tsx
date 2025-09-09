"use client";

import { useState } from "react";
import Menu from "@/components/Menu";
import BoringButton from "@/components/ui/BoringButton";
import { IoMdArrowForward } from "react-icons/io";
import Un from "@/components/ui/Underline";
import ULink from "@/components/ui/UnderLink";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      <main className="min-h-screen h-auto flex flex-start flex-col justify-between bg-[#FEFEFE] px-8 py-20 lg:px-20 lg:py-16">
        <div className="flex-1 flex flex-col justify-center w-full">
          <div className="relative h-48 w-full">
            <img
              className="h-48 w-full object-cover object-[26%_46%]"
              src="/images/hanif.webp"
              alt="hanif"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/icons/logo-white.svg" 
                alt="logo"
                className="h:16 w-16 lg:h-20 lg:w-20" 
              /> 
            </div>
          </div>

          <div className="relative w-[90%] md:w-5/6 flex flex-col py-10 text-sm sm:text-lg space-y-6">
            <p>
              hanif is a designer and digital creative who has worked on a variety of projects, from independent explorations to collaborative productions. His works move between visual and digital spaces, taking shape in graphic design, photography, post-production, <Un>front-end development</Un>, mobile development, and <Un>UI/UX</Un> design.
            </p>
            <p>
              Beyond personal projects, Hanif has also contributed through collective initiatives and organizational work. 
              Some of his experiences include collaborations with
              <ULink href="https://www.instagram.com/em_ubofficial/"> EM UB</ULink>, 
              <ULink href="https://www.instagram.com/raja_brawijaya/">RAJA Brawijaya</ULink>, 
              <ULink href="https://www.instagram.com/p/Cxkn-k3rzqf/">GDSC</ULink>, 
              <ULink href="https://www.instagram.com/p/DBXvSjySXXU/">GDGoC</ULink>, 
              <ULink href="https://www.instagram.com/gdgcloudjakarta/">GDGCLOUDJAKARTA</ULink>, 
              <ULink href="https://www.instagram.com/tedxuniversitasbrawijaya/">TEDx Brawijaya</ULink>, and others.
            </p>
            <p>
              hanif is currently being a <ULink href="">Media Creative lead at GDGoC.</ULink> <br />
              Undergraduate of Information Technology, Brawijaya University, Designer, Programmer, UI/UX.
            </p>
            <p
            className="inline-flex items-center px-1 text-black bg-transparent 
              border-b border-black-500 w-fit
              hover:border-transparent hover:bg-black hover:text-white 
              focus:border-transparent focus:bg-black focus:text-white 
              transition-colors"
            >
              hanif is open for commissioned work and collaboration.
            </p>
          </div>
        </div>
          
        <div className="flex flex-col space-y-3 text-sm w-full">
          <div 
          onClick={() => setIsMenuOpen(true)} 
          style={{ cursor: 'pointer' }}
          className="flex justify-end w-full"
          >
            <BoringButton
              title="more info"
              icon={<IoMdArrowForward />}
              position="right"
              variant="light"
            />
          </div>
          <p className="text-center lg:text-right">© 2025 hanif, all rights reserved.</p>
        </div>
      </main>

      {isMenuOpen && <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}