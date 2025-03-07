"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { moviesStore } from "~/store/movies-store";

const SearchBar: React.FC = () => {
  const { setSearchQuery } = moviesStore((state) => state);
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    setSearchQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, setSearchQuery]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search movies..."
          className="focus:ring-neon-blue focus:border-neon-blue w-full rounded-full border border-white/5 bg-secondary/50 py-2 pl-10 pr-10 text-sm transition-all focus:outline-none focus:ring-1"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="hover:text-neon-blue absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
