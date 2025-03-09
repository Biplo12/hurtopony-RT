"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { moviesStore } from "~/store/movies-store";
import useDebounce from "~/hooks/useDebounce";

const DEBOUNCE_DELAY = 500;

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const { setSearchQuery } = moviesStore((state) => state);
  const debouncedQuery = useDebounce({ value: query, delay: DEBOUNCE_DELAY });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    setSearchQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(debouncedQuery);
  };

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search movies..."
        className="w-full rounded-full border border-white/5 bg-secondary/50 py-2 pl-10 pr-10 text-sm transition-all focus:outline-none focus:ring-1"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
