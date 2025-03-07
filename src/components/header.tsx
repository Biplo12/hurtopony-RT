import React from "react";
import Link from "next/link";
import SearchBar from "./search-bar";
import Logo from "./logo";

const GITHUB_URL = "https://github.com/Biplo12/hurtopony-RT";

const Header: React.FC = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-white/5 bg-background backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <Logo />

        <div className="mx-4 w-full max-w-md">
          <SearchBar />
        </div>

        <nav className="hidden items-center space-x-1 md:flex">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-2 text-sm transition-all hover:bg-white/5"
          >
            Github
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
