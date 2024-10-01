"use client"; // Add this line at the top of your file

import React, { useState, useEffect } from "react";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";
import Card from "./Card"; // Make sure to import your Card component
import CardTv from "./CradTv";
const NetflixNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]); // Renamed from movie to movies for clarity
  const [tvShows, setTvShows] = useState([]); // Renamed from tv to tvShows for clarity

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "TV Shows", path: "/alltv" },
    { name: "Movies", path: "/allmovie" },
    { name: "New & Popular", path: "/new-popular" },
    { name: "My List", path: "/my-list" },
    { name: "Browse by Language", path: "/browse-language" },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await fetch(`/api/search?query=${query}`);
      if (!res.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await res.json();

      const moviesWithFullImages = data.results
        .map((item) => {
          // Create a base object with full image paths
          const fullImageItem = {
            ...item,
            poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            backdrop_path: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          };

          // Return item based on media type
          if (item.media_type === "movie") {
            console.log("Movie found:", fullImageItem);
            return fullImageItem; // Return movie item
          } else if (item.media_type === "tv") {
            console.log("TV show found:", fullImageItem);
            return fullImageItem; // Return TV show item
          }
          return null; // Return null for unsupported media types
        })
        .filter((item) => item !== null); // Filter out null values

      // Separate movies and TV shows into their respective state variables
      const filteredMovies = moviesWithFullImages.filter(
        (item) => item.media_type === "movie"
      );
      const filteredTvShows = moviesWithFullImages.filter(
        (item) => item.media_type === "tv"
      );

      setMovies(filteredMovies);
      setTvShows(filteredTvShows);
      setShowCard(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black bg-opacity-80"
            : "bg-gradient-to-b from-black to-transparent opacity-90"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
              alt="Netflix Logo"
              className="h-10 mr-4"
            />
            <div className="hidden md:flex space-x-2">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  className="text-white text-sm hover:text-red-600 transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                onClick={handleSearch}
                onKeyDown={handleKeyDown}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="bg-gray-800 text-white rounded-full py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
              />
              <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-white hover:text-red-600 transition-colors duration-300"
              >
                <FaUser className="text-2xl" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-90 rounded-md shadow-lg py-1 z-10">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white hover:bg-red-600 transition-colors duration-300"
                  >
                    Account Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white hover:bg-red-600 transition-colors duration-300"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-red-600 transition-colors duration-300"
            >
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-90 py-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="block px-4 py-2 text-white hover:text-red-600 transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Show the trending card when there are results */}
      {showCard && (
        <div className="fixed top-16 left-0 right-0 bg-black bg-opacity-90 p-6 rounded-md shadow-lg transition-opacity duration-300 z-50">
          <h2 className="text-3xl font-bold mb-4">Results</h2>
          {movies.length > 0 && <Card carouselItems={movies} />}
          {tvShows.length > 0 && <CardTv carouselItems={tvShows} />}
        </div>
      )}
    </>
  );
};

export default NetflixNavbar;
