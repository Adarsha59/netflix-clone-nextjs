"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaServer, FaDownload } from "react-icons/fa";

const MoviePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedServer, setSelectedServer] = useState("Server 2");
  const [mediaType, setMediaType] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const path = usePathname();
  const [id, setId] = useState("1");

  useEffect(() => {
    const [mediaTypeFromPath, idString] = path
      .split("/")
      .slice(2)
      .join("/")
      .split("&");
    setMediaType(mediaTypeFromPath);
    const parsedId = parseInt(idString, 10);
    setId(parsedId); // Set the ID state after parsing
  }, [path]);

  const serverSources = {
    movie: {
      "Server 1": `https://vidsrc.vip/embed/movie/${id}`,
      "Server 2": `https://www.2embed.cc/embed/${id}`,
      "Server 3": `https://multiembed.mov/?video_id=${id}&tmdb=1`,
    },
    tv: {
      "Server 1": `https://vidsrc.vip/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`,
      "Server 2": `https://www.2embed.cc/embedtv/${id}&s=${selectedSeason}&e=${selectedEpisode}`,
      "Server 3": `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`,
    },
  };

  const downloadLinks = {
    "480p": "https://server1.com/download-480p.mp4",
    "720p": "https://server2.com/download-720p.mp4",
    "1080p": "https://server3.com/download-1080p.mp4",
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const seasons = [1, 2, 3];
  const episodes = [1, 2, 3, 4];

  return (
    <div className="bg-gray-900 min-h-screen mt-40 text-white">
      {/* Video Player */}
      <div className="w-full h-screen pb-9/16">
        {mediaType && serverSources[mediaType] && selectedServer && (
          <iframe
            src={serverSources[mediaType][selectedServer]}
            className="top-20 w-full h-screen"
            frameBorder="0"
            allowFullScreen
            title="Movie Embed"
          ></iframe>
        )}
      </div>

      {mediaType === "tv" && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Select Season and Episode</h2>
          <div className="flex gap-4 mb-4">
            <div className="flex flex-col">
              <label htmlFor="season" className="mb-2">
                Select Season
              </label>
              <select
                id="season"
                onChange={(e) => {
                  setSelectedSeason(e.target.value);
                  setSelectedEpisode(null); // Reset episode when season changes
                }}
                className="px-4 py-2 rounded bg-gray-800 text-gray-300"
              >
                <option value="">Select Season</option>
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    Season {season}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="episode" className="mb-2">
                Select Episode
              </label>
              <select
                id="episode"
                onChange={(e) => setSelectedEpisode(e.target.value)}
                className="px-4 py-2 rounded bg-gray-800 text-gray-300"
                disabled={!selectedSeason} // Disable if no season is selected
              >
                <option value="">Select Episode</option>
                {episodes.map((episode) => (
                  <option key={episode} value={episode}>
                    Episode {episode}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Server Selection */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Select Server</h2>
        <div className="flex flex-wrap gap-4">
          {mediaType &&
            Object.keys(serverSources[mediaType]).map((server) => (
              <button
                key={server}
                onClick={() => {
                  setSelectedServer(server);
                  setIsPlaying(false); // Reset play state when switching servers
                }}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all ${
                  selectedServer === server
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <FaServer className="inline-block mr-2" /> {server}
              </button>
            ))}
        </div>
      </div>

      {/* Download Options */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Download Options</h2>
        <div className="flex flex-wrap gap-4">
          {Object.keys(downloadLinks).map((quality) => (
            <a
              key={quality}
              href={downloadLinks[quality]}
              download
              className="px-6 py-3 rounded-full text-lg font-semibold bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white transition-all"
            >
              <FaDownload className="inline-block mr-2" /> {quality}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;
