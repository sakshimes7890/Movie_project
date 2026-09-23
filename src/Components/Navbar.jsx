import React from "react";
import { NavLink } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export const Navbar = ({ setSearch }) => {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4">
      
      <div className="flex items-center justify-between">

        {/* Logo */}
        <h2 className="text-2xl font-bold text-pink-500">
          🎬 MOVIES
        </h2>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-bold"
                : "text-gray-300 hover:text-red-400"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-bold"
                : "text-gray-300 hover:text-red-400"
            }
          >
            Movies
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-bold"
                : "text-gray-300 hover:text-red-400"
            }
          >
            Favorites
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-bold"
                : "text-gray-300 hover:text-red-400"
            }
          >
            Login
          </NavLink>

          <SearchBar setSearch={setSearch} />

        </div>

      </div>
    </nav>
  );
};