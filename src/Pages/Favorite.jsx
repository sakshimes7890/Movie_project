import React, { useEffect, useState } from "react";
import { MovieCard } from "../Components/MovieCard";

export const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

      setFavorites(savedFavorites);
    };

    loadFavorites();

    // Jab page dobara focus ho, favorites refresh karo
    window.addEventListener("focus", loadFavorites);

    return () => {
      window.removeEventListener("focus", loadFavorites);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-purple-950 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16">

        {/* HEADER */}
        <header className="mb-12">
          <p className="text-red-500 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Your Collection
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            My Favorites
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl">
            Your saved movies and shows in one place.
          </p>
        </header>

        {/* EMPTY STATE */}
        {favorites.length === 0 ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-5">♡</div>

              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                No favorites yet
              </h2>

              <p className="text-gray-500 max-w-md">
                Start exploring movies and shows and add
                your favorites using the heart button.
              </p>
            </div>
          </div>
        ) : (
          /* FAVORITE GRID */
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
              gap-x-4
              sm:gap-x-5
              lg:gap-x-6
              gap-y-10
              sm:gap-y-12
            "
          >
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.rating}
                genre={movie.genre}
                image={movie.image}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};