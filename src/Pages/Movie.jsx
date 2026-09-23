import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from "../Components/MovieCard";

export const Movie = ({ search }) => {
  const [dramaShows, setDramaShows] = useState([]);
  const [actionShows, setActionShows] = useState([]);
  const [horrorShows, setHorrorShows] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search states
  const [shows, setShows] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Fetch genre shows on mount
  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://api.tvmaze.com/shows?page=0"
        );

        const allShows = response.data;

        const drama = allShows
          .filter((show) => show.genres?.includes("Drama"))
          .slice(0, 12);

        const action = allShows
          .filter((show) => show.genres?.includes("Action"))
          .slice(0, 12);

        const horror = allShows
          .filter((show) => show.genres?.includes("Horror"))
          .slice(0, 12);

        setDramaShows(drama);
        setActionShows(action);
        setHorrorShows(horror);
      } catch (error) {
        console.log(error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  // Search effect - runs when `search` prop changes
  useEffect(() => {
    if (!search.trim()) {
      setShows([]);
      setSearchError("");
      return;
    }

    const searchShows = async () => {
      try {
        setSearchLoading(true);
        setSearchError("");

        const response = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(search)}`
        );

        setShows(response.data);
      } catch (error) {
        console.log(error);
        setSearchError("Failed to fetch search results.");
      } finally {
        setSearchLoading(false);
      }
    };

    searchShows();
  }, [search]);

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-purple-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading shows...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error
  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-purple-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 text-lg font-semibold mb-2">
                Something went wrong
              </p>
              <p className="text-gray-500">{error}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Reusable Genre Section
  const GenreSection = ({ title, shows }) => {
    return (
      <section className="mb-16">
        <div className="mb-7">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {title}
          </h2>
          <div className="w-12 h-1 bg-red-500 rounded-full mt-3"></div>
        </div>

        {shows.length > 0 ? (
          <div
            className="
              grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
              lg:grid-cols-5 xl:grid-cols-6
              gap-x-4 sm:gap-x-5 lg:gap-x-6
              gap-y-10 sm:gap-y-12
            "
          >
            {shows.map((show) => (
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
        ) : (
          <p className="text-gray-500">
            No shows found in this genre.
          </p>
        )}
      </section>
    );
  };

  // If searching, show search results instead of genre sections
  const isSearching = search.trim().length > 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-purple-950 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16">

        {isSearching ? (
          <section className="py-12">
            <div className="mb-8">
              <p className="text-red-500 text-sm font-semibold uppercase tracking-[0.2em] mb-2">
                Search
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Search Results for "{search}"
              </h2>
            </div>

            {searchLoading && (
              <p className="text-gray-400">Searching shows...</p>
            )}

            {searchError && (
              <p className="text-red-500">{searchError}</p>
            )}

            {!searchLoading && !searchError && shows.length === 0 && (
              <p className="text-gray-400">No shows found.</p>
            )}

            {!searchLoading && !searchError && shows.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-10">
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
        ) : (
          <>
            {/* PAGE HEADER */}
            <header className="mb-14">
              <p className="text-red-500 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                Explore
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Movies & Shows
              </h1>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
                Discover popular shows, explore new titles, and find
                something interesting to watch.
              </p>
            </header>

            {/* DRAMA */}
            <GenreSection title="🎭 Drama" shows={dramaShows} />

            {/* ACTION */}
            <GenreSection title="🔥 Action" shows={actionShows} />

            {/* HORROR */}
            <GenreSection title="👻 Horror" shows={horrorShows} />
          </>
        )}
      </div>
    </main>
  );
};