import React from "react";

interface BoringButtonProps {
  title: string;
  icon?: React.ReactNode;
  position?: "left" | "right";
  handleClick?: () => void;
  otherClasses?: string;
}

const BoringButton: React.FC<BoringButtonProps> = ({
  title,
  icon,
  position = "left",
  handleClick,
  otherClasses,
}) => {
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1 px-2 py-1 
                  border border-black text-black rounded-full bg-transparent 
                  hover:bg-black hover:text-white transition-colors 
                  ${otherClasses}`}
    >
      {position === "left" && icon}
      <span>{title}</span>
      {position === "right" && icon}
    </button>
  );
};

export default BoringButton;
