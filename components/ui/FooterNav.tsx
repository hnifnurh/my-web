"use client";

import { useRouter } from "next/navigation";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import BoringButton from "@/components/ui/BoringButton";

interface FooterNavProps {
  setIsMenuOpen: (val: boolean) => void;
  variant?: "light" | "dark" | "auto";
}

export default function FooterNav({ setIsMenuOpen, variant = "auto" }: FooterNavProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-3 text-sm w-full">
      <div className="flex justify-between w-full">
        <div onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
          <BoringButton
            title="back"
            icon={<IoMdArrowBack />}
            position="left"
            variant={variant}
          />
        </div>

        <div onClick={() => setIsMenuOpen(true)} style={{ cursor: "pointer" }}>
          <BoringButton
            title="more info"
            icon={<IoMdArrowForward />}
            position="right"
            variant={variant}
          />
        </div>
      </div>

      <p
        className={`text-center lg:text-right ${
          variant === "dark"
            ? "text-white"
            : variant === "light"
            ? "text-black"
            : "text-[var(--foreground)]"
        }`}
      >
        © 2025 hanif, all rights reserved.
      </p>
    </div>
  );
}
