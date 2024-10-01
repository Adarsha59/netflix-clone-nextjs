"use client";
import React, { useState } from "react";
import { FaStar, FaPlay, FaPlus, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ContentOverviewModal = ({ isOpen, onClose, content }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  if (!isOpen) return null;

  // Destructure with default values to prevent undefined errors
  const {
    title = "Unknown Title",
    tagline = "No tagline available",
    coverImage = "",
    synopsis = "No synopsis available",
    genres = [],
    tags = [],
    rating = "N/A",
    cast = [],
    seasons = [],
    relatedContent = [],
  } = content || {}; // Use an empty object as default to prevent destructuring errors

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-75 p-4"
        onClick={onClose} // Close modal on outside click
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-4xl w-full bg-gray-900 rounded-lg shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            aria-label="Close modal"
          >
            <FaTimes size={24} />
          </button>

          <div className="p-6 md:p-8">
            {coverImage && (
              <img
                src={coverImage}
                alt={title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}

            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-xl text-gray-300 mb-4">{tagline}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                >
                  {genre}
                </span>
              ))}
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-white font-bold">{rating}</span>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center mr-2">
                <FaPlay className="mr-2" /> Play
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full flex items-center">
                <FaPlus className="mr-2" /> My List
              </button>
            </div>

            <p className="text-gray-300 mb-6">{synopsis}</p>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Cast & Crew</h3>
              <div className="flex flex-wrap gap-4">
                {cast.slice(0, 5).map((member) => (
                  <div key={member.name} className="text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-2"
                    />
                    <p className="text-white text-sm">{member.name}</p>
                    <p className="text-gray-400 text-xs">{member.character}</p>
                  </div>
                ))}
              </div>
            </div>

            {seasons.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Episodes</h3>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="bg-gray-700 text-white py-2 px-4 rounded-md mb-4"
                >
                  {seasons.map((season) => (
                    <option key={season.number} value={season.number}>
                      Season {season.number}
                    </option>
                  ))}
                </select>
                <div className="space-y-4">
                  {seasons
                    .find((s) => s.number === selectedSeason)
                    ?.episodes.map((episode) => (
                      <div
                        key={episode.number}
                        className="flex items-center bg-gray-800 rounded-lg p-4"
                      >
                        <img
                          src={episode.thumbnail}
                          alt={episode.title}
                          className="w-24 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h4 className="text-white font-bold">
                            {episode.number}. {episode.title}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {episode.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">
                More Like This
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedContent.map((item) => (
                  <div key={item.id} className="relative group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-center font-bold">
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContentOverviewModal;
