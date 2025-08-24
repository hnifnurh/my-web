"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import BoringButton from "@/components/ui/BoringButton";
import Menu from "@/components/Menu";
import  BLink  from "@/components/utils/BorderLink";



export default function ComingSoon() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter(); 

    return (
        <>
        <main className="relative min-h-screen flex flex-col justify-between px-6 py-6 lg:px-20 lg:py-16">
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
                    <BLink href="mailto:h4nifnhwn@gmail.com">h4nifnhwn@gmail.com</BLink>
                </div>

                <div className="contact">
                    <p className="font-bold">Contact</p>
                    <BLink href="https://wa.me/+6281211387568">+6281211387568</BLink>
                </div>

            </div>

            <div className="flex flex-col space-y-3 text-sm w-full">
                <div className="flex justify-between w-full">
                    <div onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
                        <BoringButton
                        title="back"
                        icon={<IoMdArrowBack />}
                        position="left"
                        />
                    </div>

                    <div onClick={() => setIsMenuOpen(true)} style={{ cursor: "pointer" }}>
                        <BoringButton
                        title="more info"
                        icon={<IoMdArrowForward />}
                        position="right"
                        />
                    </div>
                </div>

                <p className="text-center lg:text-right">© 2025 hanif, all rights reserved.</p>
            </div>
        </main>

        {isMenuOpen && <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}
        </>
    )
}