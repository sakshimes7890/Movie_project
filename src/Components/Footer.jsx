import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

          {/* Logo / About */}
          <div>
            <h2 className="text-2xl font-bold text-pink-500">
              🎬 MOVIES
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed mt-4 max-w-sm">
              Discover movies and shows you'll love.
              Explore different genres and find something
              interesting to watch.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Navigation
            </h3>

            <div className="flex flex-col gap-3">
              <NavLink
                to="/"
                className="text-gray-500 hover:text-white transition"
              >
                Home
              </NavLink>

              <NavLink
                to="/movies"
                className="text-gray-500 hover:text-white transition"
              >
                Movies
              </NavLink>

              <NavLink
                to="/favorites"
                className="text-gray-500 hover:text-white transition"
              >
                Favorites
              </NavLink>
            </div>
          </div>

          {/* Project */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Explore
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed">
              Browse shows, discover new genres, and
              save your favorite titles for later.
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-gray-600 text-sm text-center">
            © 2026 MOVIES. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};