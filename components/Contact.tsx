"use client";

import { useState } from "react";
import Menu from "@/components/Menu";
import  BLink  from "@/components/ui/BorderLink";
import FooterNav from "./ui/FooterNav";

export default function ComingSoon() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
        <main className="relative min-h-screen flex flex-col justify-between bg-[#FEFEFE] px-6 py-6 lg:px-20 lg:py-16">
            <div className="flex justify-start items-start">
                <img
                src="/icons/logo-black.svg"
                alt="logo"
                className="h-16 w-16 lg:h-16 lg:w-16"
                />
            </div>

            <div className="flex-1 flex flex-col items-start justify-start text-sm lg:text-lg pt-14 gap-8">
                <p>
                Contact / Inquires <br />
                this place that you want to contact me sometimes
                </p>

                <div className="email">
                    <p className="font-bold">Email</p>
                    <BLink href="mailto:hanifnhwn@gmail.com">hanifnhwn@gmail.com</BLink>
                </div>

                <div className="contact">
                    <p className="font-bold">Contact</p>
                    <BLink href="https://wa.me/+6281211387568">+6281211387568</BLink>
                </div>

            </div>

            <div className="flex flex-col space-y-3 text-sm w-full">
                <FooterNav setIsMenuOpen={setIsMenuOpen} variant="light"/>
            </div>
        </main>

        {isMenuOpen && <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}
        </>
    )
}