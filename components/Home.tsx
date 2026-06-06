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
              Hanif is a technology and IT enthusiast with a strong interest in building efficient, user-focused digital solutions. 
              He combines technical skills in <Un>web development</Un>, <Un>data handling</Un>, <Un>interface design</Un>, and <Un>front-end </Un>  
              to create practical, scalable, and impactful digital products.
            </p>
            <p>
              Beyond personal projects, Hanif has also contributed through collective initiatives and organizational work. 
              Some of his experiences include collaborations with <ULink href="https://www.instagram.com/em_ubofficial/">EM UB</ULink>, 
              <ULink href="https://www.instagram.com/raja_brawijaya/">RAJA Brawijaya</ULink>, 
              <ULink href="https://www.instagram.com/p/DBXvSjySXXU/">GDGoC</ULink>, 
              <ULink href="https://www.instagram.com/gdgcloudjakarta/">GDGCLOUDJAKARTA</ULink>, 
              <ULink href="https://www.instagram.com/tedxuniversitasbrawijaya/">TEDx Brawijaya</ULink>
              <ULink href="https://www.instagram.com/therapspoint/">The Rapspoint</ULink>
              , and others.
            </p>
            <p>
              Hanif is currently working at <ULink href="">UI/UX at Rapspoint</ULink> <br />
              Undergraduate of Information Technology, Brawijaya University, Designer, Programmer, UI/UX.
            </p>
            <p
            className="inline-flex items-center px-1 text-black bg-transparent 
              border-b border-black-500 w-fit
              hover:border-transparent hover:bg-black hover:text-white 
              active:border-transparent active:bg-black active:text-white 
              transition-colors"
            >
              hanif is open for commissioned work, collaboration, and creative-tech projects.
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