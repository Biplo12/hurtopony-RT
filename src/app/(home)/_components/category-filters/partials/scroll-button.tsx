import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollButtonProps {
  direction: "LEFT" | "RIGHT";
  onClick: () => void;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-background/80 text-white/70 shadow-md backdrop-blur-sm transition-colors hover:text-white"
      aria-label={`Scroll ${direction.toLowerCase()}`}
    >
      {direction === "LEFT" ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </button>
  );
};

export default ScrollButton;
