import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const MovieCard = ({
  id,
  title,
  rating,
  genre,
  image,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyFavorite = favorites.some(
      (movie) => movie.id === id
    );

    setIsFavorite(alreadyFavorite);
  }, [id]);

  const handleFavorite = () => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (movie) => movie.id !== id
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
    } else {
      const movie = {
        id,
        title,
        rating,
        genre,
        image,
      };

      const updatedFavorites = [...favorites, movie];

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(true);
    }
  };

  return (
    <article className="group min-w-0">

      {/*  POSTER  */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gray-900 shadow-lg">

        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              ease-out
              group-hover:scale-105
            "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <span className="text-gray-600 text-sm">
              No Image
            </span>
          </div>
        )}

        {/* Dark Hover Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-black/0
            group-hover:bg-black/45
            transition-colors
            duration-300
          "
        />

        {/*  FAVORITE  */}
        <button
          type="button"
          onClick={handleFavorite}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          className="
            absolute
            top-3
            left-3
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-full
            bg-black/75
            backdrop-blur-sm
            hover:bg-black/90
            transition
            duration-200
            z-10
          "
        >
          <span
            className={`text-lg transition ${
              isFavorite
                ? "text-red-500"
                : "text-white"
            }`}
          >
            {isFavorite ? "♥" : "♡"}
          </span>
        </button>

        {/* RATING  */}
        {rating && (
          <div
            className="
              absolute
              top-3
              right-3
              flex
              items-center
              gap-1
              px-2.5
              py-1
              rounded-md
              bg-black/75
              backdrop-blur-sm
            "
          >
            <span className="text-yellow-400 text-sm">
              ★
            </span>

            <span className="text-white text-xs font-semibold">
              {rating}
            </span>
          </div>
        )}

        {/*  VIEW DETAILS  */}
        <Link
          to={`/movie/${id}`}
          className="
            absolute
            left-1/2
            bottom-4
            -translate-x-1/2
            translate-y-3
            opacity-0
            group-hover:translate-y-0
            group-hover:opacity-100
            transition-all
            duration-300
            whitespace-nowrap
            bg-red-500
            hover:bg-red-600
            text-white
            text-xs
            sm:text-sm
            font-semibold
            px-3
            sm:px-4
            py-2
            rounded-lg
            shadow-lg
          "
        >
          View Details
        </Link>
      </div>

      {/* CARD INFO  */}
      <div className="pt-3 px-0.5">

        <h3
          className="
            text-white
            text-sm
            sm:text-base
            font-semibold
            truncate
            leading-5
          "
          title={title}
        >
          {title}
        </h3>

        <p
          className="
            text-gray-500
            text-xs
            mt-1.5
            truncate
          "
          title={genre}
        >
          {genre}
        </p>

      </div>
    </article>
  );
};