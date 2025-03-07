"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "./search-bar";
import Logo from "./logo";
import { Menu, X, Github } from "lucide-react";

const GITHUB_URL = "https://github.com/Biplo12/hurtopony-RT";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-white/5 bg-background backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <Logo />

        <div className="hidden w-full max-w-md px-4 sm:block">
          <SearchBar />
        </div>

        <nav className="hidden items-center md:flex">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-all hover:bg-white/5"
          >
            <Github className="h-4 w-4" />
            <span>Github</span>
          </Link>
        </nav>

        <button
          onClick={toggleMobileMenu}
          className="ml-auto rounded-md p-2 text-gray-400 hover:bg-white/5 md:hidden"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="container mx-auto px-4 py-3 md:hidden">
          <div className="mb-4">
            <SearchBar />
          </div>
          <nav className="flex flex-col space-y-2">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-all hover:bg-white/5"
            >
              <Github className="h-4 w-4" />
              <span>Github</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
