"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaPlay, FaInfoCircle, FaPlus } from "react-icons/fa";

const NetflixHeroBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [randomMovie, setRandomMovie] = useState(null);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const fetchMovies = async () => {
    try {
      const response = await axios.get("/api/trending/movie/day");
      const moviesWithFullImages = response.data.results.map((movie) => ({
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      }));

      // Select a random movie from the fetched list
      const randomIndex = Math.floor(
        Math.random() * moviesWithFullImages.length
      );
      setRandomMovie(moviesWithFullImages[randomIndex]);
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  if (!randomMovie) return null;
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-red-900">
        <img
          //   src="fit=crop&w=1470&q=80"
          src={randomMovie.backdrop_path}
          alt="Featured Content"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div
          className={`transition-all duration-1000 ease-in-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            {randomMovie.original_title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8"></p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href={`player/movie&${randomMovie.id}`}>
              <button className="flex items-center px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300">
                <FaPlay className="mr-2" /> Watch Now
              </button>
            </Link>
            <Link href={`/${randomMovie.id}/aboutmovie`}>
              <button className="flex items-center px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-300">
                <FaInfoCircle className="mr-2" /> More Info
              </button>
            </Link>
            <button className="flex items-center px-4 py-2 bg-transparent border border-gray-300 text-white rounded-md hover:bg-gray-700 transition-colors duration-300">
              <FaPlus className="mr-2" /> My List
            </button>
          </div>

          {/* User Ratings */}
          <div className="text-white mb-4">
            <span className="text-green-500 font-bold mr-2">
              {Math.ceil(randomMovie.vote_average * 10)}% Match
            </span>

            <span>{randomMovie.release_date}</span>
            <span className="mx-2">|</span>
            <span>{randomMovie.media_type}</span>
            <span className="mx-2">|</span>
            <span>{randomMovie.original_language}</span>
          </div>

          {/* User Reviews */}
          <div className="bg-gray-800 bg-opacity-75 p-4 rounded-md max-w-md">
            <h3 className="text-white font-bold mb-2">User Reviews</h3>
            <p className="text-gray-300 text-sm">{randomMovie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixHeroBanner;
