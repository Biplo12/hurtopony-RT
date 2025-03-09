import { Film } from "lucide-react";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="group flex items-center space-x-2">
      <Film className="h-5 w-5" />
      <span className="text-lg font-bold tracking-tight transition-colors">
        Hurtopony RT
      </span>
    </Link>
  );
};

export default Logo;
