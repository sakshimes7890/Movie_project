import React, { useEffect, useState } from "react";
import axios from "axios";

export const Hero = () => {
  const [show, setShow] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=dark")
      .then((response) => {
        const darkShow = response.data[0].show;

        setShow(darkShow);

        // Check if Dark is already in Favorites
        const favorites =
          JSON.parse(localStorage.getItem("favorites")) || [];

        const alreadyFavorite = favorites.some(
          (movie) => movie.id === darkShow.id
        );

        setIsFavorite(alreadyFavorite);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFavorite = () => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Remove from Favorites
      const updatedFavorites = favorites.filter(
        (movie) => movie.id !== show.id
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
    } else {
      // Add to Favorites
      const movie = {
        id: show.id,
        title: show.name,
        rating: show.rating?.average,
        genre: show.genres?.join(" • "),
        image: show.image?.medium,
      };

      const updatedFavorites = [...favorites, movie];

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(true);
    }
  };

  if (!show) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <section
      className="relative min-h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${show.image?.original})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-24 text-white">

        <p className="text-red-400 font-semibold uppercase">
          Featured Show
        </p>

        <h1 className="text-5xl font-bold mt-3">
          {show.name}
        </h1>

        <div
          className="max-w-xl mt-4 text-gray-200 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: show.summary,
          }}
        />

        <p className="text-yellow-400 font-semibold mt-4">
          ⭐ {show.rating?.average || "N/A"} / 10
        </p>

        <div className="flex gap-4 mt-6">

          {/* View Details */}
          <a
            href={show.officialSite}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black"
          >
            View Details
          </a>

          {/* Add to Favorites */}
          <button
            type="button"
            onClick={handleFavorite}
            className={`border border-white px-6 py-3 rounded-lg text-white transition ${
            isFavorite
           ? "bg-red-600 hover:bg-red-700"
           : "bg-white-500 hover:bg-white-600"
          }`}
         >
  {isFavorite
    ? "♥ Added to Favorites"
    : "♡ Add to Favorites"}
</button>

        </div>
      </div>
    </section>
  );
};