"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaPlay, FaPause, FaServer, FaDownload } from "react-icons/fa";

const MoviePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedServer, setSelectedServer] = useState("Server 3");
  const path = usePathname();
  const [mediatype, idString] = path.split("/").slice(2).join("/").split("&");

  // Convert the idString to an integer
  const id = parseInt(idString, 10);

  // Log the results
  console.log("mediatype: " + mediatype); // should log "mediatype: tv"
  console.log("id: " + id);
  // Define movie sources for different servers
  const serverSources = {
    "Server 1": "https://vidsrc.vip/embed/movie/693134", // Direct video file URL
    "Server 2": "https://vidsrc.vip/embed/movie/438631", // YouTube embed URL
    "Server 3": "https://youtu.be/0RXnxRHGc6Q?list=RD0RXnxRHGc6Q", // Direct video file URL
  };

  // Define download links for different qualities
  const downloadLinks = {
    "480p": "https://server1.com/download-480p.mp4",
    "720p": "https://server2.com/download-720p.mp4",
    "1080p": "https://server3.com/download-1080p.mp4",
  };

  // Play/Pause functionality (only relevant for iframe, not directly controllable)
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gray-900 min-h-screen mt-40 text-white">
      {/* Video Player */}
      <div className=" w-full h-screen pb-9/16">
        <iframe
          src={serverSources[selectedServer]}
          className=" top-20   w-full h-screen"
          frameBorder="0"
          allowFullScreen
          title="Movie Embed"
        ></iframe>
      </div>

      {/* Server Selection */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Select Server</h2>
        <div className="flex flex-wrap gap-4">
          {Object.keys(serverSources).map((server) => (
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
