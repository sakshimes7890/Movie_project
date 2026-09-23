import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export const Navbar = ({ setSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-red-500 font-bold"
      : "text-gray-300 hover:text-red-400 transition-colors";

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="w-full max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 py-3 sm:py-4">

        {/* Top Row: Logo + Hamburger */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="text-xl sm:text-2xl font-bold text-pink-500 shrink-0"
          >
            🎬 MOVIES
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/movies" className={linkClass}>
              Movies
            </NavLink>
            <NavLink to="/favorites" className={linkClass}>
              Favorites
            </NavLink>
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>

            <div className="w-56 xl:w-64">
              <SearchBar setSearch={setSearch} />
            </div>
          </div>

          {/* Hamburger Button (mobile/tablet) */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-200 hover:text-red-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu (dropdown) */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 mt-3 sm:mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 sm:gap-2 pb-3 sm:pb-4 border-t border-gray-800 pt-3 sm:pt-4">

            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm sm:text-base ${
                  isActive
                    ? "text-red-500 font-bold bg-gray-800"
                    : "text-gray-300 hover:text-red-400 hover:bg-gray-800"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/movies"
              onClick={closeMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm sm:text-base ${
                  isActive
                    ? "text-red-500 font-bold bg-gray-800"
                    : "text-gray-300 hover:text-red-400 hover:bg-gray-800"
                }`
              }
            >
              Movies
            </NavLink>

            <NavLink
              to="/favorites"
              onClick={closeMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm sm:text-base ${
                  isActive
                    ? "text-red-500 font-bold bg-gray-800"
                    : "text-gray-300 hover:text-red-400 hover:bg-gray-800"
                }`
              }
            >
              Favorites
            </NavLink>

            <NavLink
              to="/login"
              onClick={closeMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm sm:text-base ${
                  isActive
                    ? "text-red-500 font-bold bg-gray-800"
                    : "text-gray-300 hover:text-red-400 hover:bg-gray-800"
                }`
              }
            >
              Login
            </NavLink>

            {/* Search inside mobile menu */}
            <div className="pt-2">
              <SearchBar setSearch={setSearch} />
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};