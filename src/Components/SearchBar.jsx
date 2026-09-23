import React, { useState } from "react";

export const SearchBar = ({ setSearch }) => {
  const [search, setSearchInput] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;

    setSearch(search);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="px-4 py-2 rounded-lg bg-gray-800 text-white outline-none"
      />

      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        🔍
      </button>
    </div>
  );
};