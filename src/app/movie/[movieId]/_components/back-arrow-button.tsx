import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackArrowButton: React.FC = () => {
  return (
    <Link
      href="/"
      className="fixed left-6 top-24 z-50 rounded-full border border-white/10 bg-background/30 p-2 backdrop-blur-md transition-colors hover:bg-background/50"
      aria-label="Back to home"
    >
      <ArrowLeft className="h-5 w-5" />
    </Link>
  );
};

export default BackArrowButton;
