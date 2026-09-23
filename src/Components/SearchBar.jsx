import React, { useState } from "react";

export const SearchBar = ({ setSearch }) => {
  const [search, setSearchInput] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;
    setSearch(search.trim());
  };

  const handleClear = () => {
    setSearchInput("");
    setSearch("");
  };

  return (
    <div className="w-full flex items-center gap-2">
      {/* Input wrapper */}
      <div className="relative flex-1 min-w-0">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search shows..."
          value={search}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
            if (e.key === "Escape") handleClear();
          }}
          aria-label="Search shows"
          className="w-full pl-9 pr-8 py-2 text-sm sm:text-base rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none border border-transparent focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
        />

        {/* Clear button */}
        {search && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute inset-y-0 right-2 flex items-center px-1 text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search button */}
      <button
        type="button"
        onClick={handleSearch}
        aria-label="Submit search"
        className="shrink-0 px-3 sm:px-4 py-2 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
      >
        <span className="hidden sm:inline">Search</span>
        <span className="sm:hidden">🔍</span>
      </button>
    </div>
  );
};