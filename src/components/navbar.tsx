import React from "react";
import Link from "next/link";
import { Film } from "lucide-react";
import SearchBar from "./search-bar";

const GITHUB_URL = "https://github.com/Biplo12/hurtopony-RT";

const NavBar: React.FC = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-white/5 bg-background backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center space-x-2">
          <Film className="text-neon-blue h-5 w-5 animate-pulse-slow" />
          <span className="group-hover:text-neon-blue text-lg font-bold tracking-tight transition-colors">
            Cinematic
          </span>
        </Link>

        <div className="mx-4 w-full max-w-md">
          <SearchBar />
        </div>

        <nav className="hidden items-center space-x-1 md:flex">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neon-blue rounded-md px-3 py-2 text-sm transition-all hover:bg-white/5"
          >
            Github
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
