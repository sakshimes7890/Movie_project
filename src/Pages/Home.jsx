import React, { useEffect, useState } from "react";
import { Hero } from "../Components/Hero";
import { MovieCard } from "../Components/MovieCard";
import useData from "./useData.js";

export const Home = ({ search }) => {
  const [popularShows, setPopularShows] = useState([]);
  const [popularLoading, setPopularLoading] = useState(true);
  const [popularError, setPopularError] = useState("");

  const {
    data: searchResults,
    loading: searchLoading,
    error: searchError,
  } = useData(
    search.trim()
      ? `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(
          search.trim()
        )}`
      : null
  );

  useEffect(() => {
    const fetchPopularShows = async () => {
      try {
        setPopularLoading(true);
        setPopularError("");

        const titles = [
          "Wednesday",
          "Breaking Bad",
          "Stranger Things",
          "The Boys",
          "Sherlock",
          "Game of Thrones",
          "Peaky Blinders",
          "Money Heist",
          "The Walking Dead",
          "Black Mirror",
          "Prison Break",
          "The Last of Us",
        ];

        const responses = await Promise.all(
          titles.map((title) =>
            fetch(
              `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(
                title
              )}`
            ).then((res) => {
              if (!res.ok) {
                throw new Error("Failed to fetch show");
              }

              return res.json();
            })
          )
        );

        setPopularShows(responses);
      } catch (error) {
        console.log("Popular Shows Error:", error);
        setPopularError("Unable to load popular shows.");
      } finally {
        setPopularLoading(false);
      }
    };

    fetchPopularShows();
  }, []);

  const shows = Array.isArray(searchResults) ? searchResults : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-purple-950 text-white overflow-x-hidden">
      <Hero />

      <div className="w-full max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10">
        {/* Search Results */}
        {search.trim() && (
          <section className="py-8 sm:py-10 md:py-12">
            <div className="mb-6 sm:mb-8">
              <p className="text-red-500 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1.5 sm:mb-2">
                Search
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold break-words">
                Search Results for "{search}"
              </h2>
            </div>

            {searchLoading && (
              <p className="text-gray-400 text-sm sm:text-base">
                Searching shows...
              </p>
            )}

            {searchError && (
              <p className="text-red-500 text-sm sm:text-base">
                {searchError}
              </p>
            )}

            {!searchLoading && !searchError && shows.length === 0 && (
              <p className="text-gray-400 text-sm sm:text-base">
                No shows found.
              </p>
            )}

            {!searchLoading && !searchError && shows.length > 0 && (
              <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 xs:gap-x-4 sm:gap-x-5 gap-y-6 sm:gap-y-8 md:gap-y-10">
                {shows.slice(0, 12).map((item) => {
                  const show = item.show;

                  return (
                    <MovieCard
                      key={show.id}
                      id={show.id}
                      title={show.name}
                      rating={show.rating?.average}
                      genre={
                        show.genres?.length
                          ? show.genres.join(" • ")
                          : "Genre unavailable"
                      }
                      image={show.image?.medium}
                    />
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Popular Shows */}
        <section className="py-10 sm:py-12 md:py-14">
          <div className="mb-6 sm:mb-8">
            <p className="text-red-500 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1.5 sm:mb-2">
              Discover
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Popular Shows 🎬
            </h2>

            <p className="text-gray-500 text-xs sm:text-sm mt-1.5 sm:mt-2">
              Discover some of the most loved shows to watch.
            </p>
          </div>

          {popularLoading && (
            <div className="flex justify-center py-16 sm:py-20">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin"></div>
            </div>
          )}

          {popularError && (
            <p className="text-red-500 py-6 sm:py-8 text-sm sm:text-base">
              {popularError}
            </p>
          )}

          {!popularLoading && !popularError && popularShows.length > 0 && (
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 xs:gap-x-4 sm:gap-x-5 gap-y-6 sm:gap-y-8 md:gap-y-10 pb-12 sm:pb-16">
              {popularShows.map((show) => (
                <MovieCard
                  key={show.id}
                  id={show.id}
                  title={show.name}
                  rating={show.rating?.average}
                  genre={
                    show.genres?.length
                      ? show.genres.join(" • ")
                      : "Genre unavailable"
                  }
                  image={show.image?.medium}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};