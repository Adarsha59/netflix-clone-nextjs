"use client";
import React, { useState } from "react";
import { FaStar, FaSearch, FaPlay } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";

const MovieDetailsPage = () => {
  const [showModal, setShowModal] = useState(false);

  const movieData = {
    title: "Deadpool & Wolverine",
    tagline: "Come together.",
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop_path: "/dvBCdCohwWbsP5qAaglOXagDMtk.jpg",
    release_date: "2024-07-26",
    runtime: 120,
    genres: ["Action", "Comedy", "Science Fiction"],
    vote_average: 8.5,
    vote_count: 1000,
    overview:
      "Wolverine is back from the dead and he's coming to the MCU. The Merc with a Mouth will team up with the grumpy Canadian for an adventure that's sure to be filled with violence, comedy, and fourth-wall-breaking antics.",
    production_companies: [
      {
        name: "Marvel Entertainment",
        logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
      },
      {
        name: "20th Century Studios",
        logo_path: "/3zWmUMuiYjFPSliooCqrVNfSKQ.png",
      },
    ],
    belongs_to_collection: {
      name: "Deadpool Collection",
      poster_path: "/30YacPAcxpNemhhwX0PVUl9pVA3.jpg",
      backdrop_path: "/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
      description:
        "The Deadpool Collection features the wise-cracking anti-hero in his solo adventures and team-ups.",
    },
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
          filter: "brightness(0.3)",
        }}
      ></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black bg-opacity-70">
        {/* <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            <div className="text-red-600 font-bold text-2xl">NETFLIX</div>
            <div className="flex items-center space-x-6">
                <a href="#" className="hover:text-red-600 transition duration-300">
                Home
                </a>
                <a href="#" className="hover:text-red-600 transition duration-300">
                Movies
                </a>
                <a href="#" className="hover:text-red-600 transition duration-300">
                TV Shows
                </a>
                <a href="#" className="hover:text-red-600 transition duration-300">
                My List
                </a>
                <div className="relative">
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <FaSearch className="absolute right-3 top-3 text-gray-400" />
                </div>
            </div>
            </nav> */}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Movie Poster */}
          <div className="md:w-1/3">
            <div
              className="relative cursor-pointer transform hover:scale-105 transition duration-300"
              onClick={toggleModal}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt={movieData.title}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                <FaPlay className="text-6xl text-white" />
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              {movieData.title}
            </h1>
            <p className="text-xl italic text-gray-300 mb-6">
              {movieData.tagline}
            </p>

            {/* Release Info */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center">
                <IoCalendarOutline className="mr-2" />
                <span>{new Date(movieData.release_date).getFullYear()}</span>
              </div>
              <div className="flex items-center">
                <MdAccessTime className="mr-2" />
                <span>{movieData.runtime} min</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {movieData.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-600 text-white rounded-full text-sm cursor-pointer hover:bg-red-700 transition duration-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <FaStar className="text-yellow-400 mr-2" />
              <span className="text-2xl font-bold">
                {movieData.vote_average}
              </span>
              <span className="text-gray-400 ml-2">
                ({movieData.vote_count} votes)
              </span>
            </div>

            {/* Overview */}
            <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-lg">{movieData.overview}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex space-x-4 mb-8">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Watch Now
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Add to My List
              </button>
            </div>

            {/* Production Companies */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Production Companies
              </h2>
              <div className="flex space-x-6">
                {movieData.production_companies.map((company, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      className="h-16 object-contain mb-2"
                    />
                    <span className="text-sm text-center">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Collection */}
            {movieData.belongs_to_collection && (
              <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">
                  Part of the {movieData.belongs_to_collection.name}
                </h2>
                <div className="flex items-center space-x-6">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movieData.belongs_to_collection.poster_path}`}
                    alt={movieData.belongs_to_collection.name}
                    className="w-32 rounded-lg shadow-lg"
                  />
                  <p className="text-lg">
                    {movieData.belongs_to_collection.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-white text-lg font-semibold mb-2">
                Connect with Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Instagram
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-white text-lg font-semibold mb-2">Legal</h3>
              <ul>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-sm">
                © 2024 Netflix, Inc. All rights reserved. This website and its
                contents are protected by copyright and other intellectual
                property laws. Any unauthorized use or reproduction of the
                content is strictly prohibited.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <div
            className="max-w-4xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
              alt={movieData.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
