import React from "react";

interface BoringButtonProps {
  title: string;
  icon?: React.ReactNode;
  position?: "left" | "right";
  handleClick?: () => void;
  otherClasses?: string;
  variant?: "light" | "dark" | "auto";
}
const BoringButton: React.FC<BoringButtonProps> = ({
  title,
  icon,
  position = "left",
  handleClick,
  otherClasses,
  variant = "auto",
}) => {
  
  const getColorClasses = () => {
    if (variant === "light") {
      return "border-black text-black hover:bg-black hover:text-white active:bg-black active:text-white";
    } else if (variant === "dark") {
      return "border-white text-white hover:bg-white hover:text-black active:bg-white active:text-black";
    } else {
      return `border-black text-black hover:bg-black hover:text-white active:bg-black active:text-white
              dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black dark:active:bg-white dark:active:text-black`;
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1 px-2 py-1
                  border rounded-full bg-transparent
                  ${getColorClasses()}
                  transition-colors
                  ${otherClasses}`}
    >
      {position === "left" && icon}
      <span>{title}</span>
      {position === "right" && icon}
    </button>
  );
};
export default BoringButton;