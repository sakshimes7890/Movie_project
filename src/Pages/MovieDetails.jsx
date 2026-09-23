import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const MovieDetails = () => {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
   
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        setShow(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    
    axios
      .get(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then((response) => {
        setEpisodes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!show) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  const seasons = episodes.reduce((groups, episode) => {
    const season = episode.season;

    if (!groups[season]) {
      groups[season] = [];
    }

    groups[season].push(episode);

    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Hero / Show Header */}
      <section
        className="relative min-h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${show.image?.original})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

            {/* Poster */}
            <img
              src={show.image?.original}
              alt={show.name}
              className="w-64 rounded-2xl shadow-2xl"
            />

            {/* Information */}
            <div className="max-w-2xl">

              <p className="text-red-400 font-semibold uppercase">
                TV Show
              </p>

              <h1 className="text-5xl font-bold mt-2">
                {show.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-4">

                <span className="text-yellow-400 font-semibold">
                  ⭐ {show.rating?.average || "N/A"} / 10
                </span>

                <span className="text-gray-300">
                  {show.genres?.join(" • ") || "N/A"}
                </span>

              </div>

              
              <div
                className="mt-6 text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    show.summary || "No summary available.",
                }}
              />

              {/* Official Website */}
              {show.officialSite && (
                <a
                  href={show.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold"
                >
                  🌐 View Details
                </a>
              )}

            </div>
          </div>
        </div>
      </section>

    
      <section className="max-w-6xl mx-auto px-8 py-12">

        <h2 className="text-3xl font-bold mb-6">
          About the Show
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">

          <div className="bg-gray-900 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Language</p>
            <p className="text-lg font-semibold mt-2">
              {show.language || "N/A"}
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Premiered</p>
            <p className="text-lg font-semibold mt-2">
              {show.premiered || "N/A"}
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Status</p>
            <p className="text-lg font-semibold mt-2">
              {show.status || "N/A"}
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Runtime</p>
            <p className="text-lg font-semibold mt-2">
              {show.runtime
                ? `${show.runtime} min`
                : "N/A"}
            </p>
          </div>

        </div>

        {show.network && (
          <div className="mt-5 bg-gray-900 rounded-xl p-5">

            <p className="text-gray-400 text-sm">
              Network
            </p>

            <p className="text-xl font-semibold mt-2">
              {show.network.name}
            </p>

          </div>
        )}

      </section>

      <section className="max-w-6xl mx-auto px-8 pb-16">

        <h2 className="text-3xl font-bold mb-8">
          Episodes 🎬
        </h2>

        {Object.keys(seasons).map((season) => (

          <div key={season} className="mb-12">

            <h3 className="text-2xl font-bold mb-5">
              Season {season}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {seasons[season].map((episode) => (

                <div
                  key={episode.id}
                  className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
                >

                  {episode.image?.medium && (
                    <img
                      src={episode.image.medium}
                      alt={episode.name}
                      className="w-full h-52 object-cover"
                    />
                  )}

                  <div className="p-5">

                    <p className="text-red-400 font-semibold">
                      S{episode.season} E{episode.number}
                    </p>

                    <h4 className="text-xl font-bold mt-1">
                      {episode.name}
                    </h4>

                    <p className="text-gray-400 mt-2">
                      Air Date: {episode.airdate || "N/A"}
                    </p>

                    <div
                      className="text-gray-300 mt-4 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html:
                          episode.summary ||
                          "No episode summary available.",
                      }}
                    />

                  </div>
                </div>

              ))}

            </div>

          </div>

        ))}

      </section>

    </div>
  );
};