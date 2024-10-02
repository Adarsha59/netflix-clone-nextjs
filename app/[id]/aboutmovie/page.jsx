"use client";
import React, { useEffect, useState } from "react";
import { FaStar, FaSearch, FaPlay, FaShareAlt, FaList } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

const MovieDetailsPage = () => {
  const [movieData, setMovieData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const path = usePathname();
  const movieId = parseInt(path.split("/")[1]);

  const pathname = usePathname();
  const handleShare = async () => {
    const fullUrl = `${window.location.origin}${pathname}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast.success("Share link copied");
    } catch (error) {
      console.error("Failed to copy the URL:", error);
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/api/movie/${movieId}`);
        const movie = response.data;

        // Update poster and backdrop paths with full URLs
        const movieWithFullImages = {
          ...movie,
          poster_path: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,
          backdrop_path: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            : null,
        };

        setMovieData(movieWithFullImages);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]); // movieId is stable and doesn't change on every render

  if (!movieData) {
    return <div>Loading...</div>;
  }

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${movieData.backdrop_path})`,
          filter: "brightness(0.3)",
        }}
      ></div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Movie Poster */}
          <div className="md:w-1/3">
            <div
              className="relative cursor-pointer transform hover:scale-105 transition duration-300"
              onClick={toggleModal}
            >
              <Image
                width={800}
                height={800}
                src={movieData.poster_path}
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
              {movieData.tagline || "No tagline available"}
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
              <Link href={`player/movie&${movieId}`}>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center">
                  <FaPlay className="mr-2" />
                  Watch Now
                </button>
              </Link>
              <button
                onClick={handleShare}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center"
              >
                <FaShareAlt className="mr-2" />
                Share
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center">
                <FaList className="mr-2" />
                Add to List
              </button>
            </div>

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
                    {genre.name}
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

            {/* Homepage */}
            {movieData.homepage && (
              <div className="mb-6">
                <a
                  href={movieData.homepage}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Visit Official Website
                </a>
              </div>
            )}

            {/* Production Companies */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Production Companies
              </h2>
              <div className="flex space-x-6">
                {movieData.production_companies?.map((company, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {company.logo_path && (
                      <Image
                        width={100}
                        height={100}
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        className="h-16 object-contain mb-2"
                      />
                    )}
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
                  <Image
                    width={800}
                    height={800}
                    src={`https://image.tmdb.org/t/p/w200${movieData.belongs_to_collection.poster_path}`}
                    alt={movieData.belongs_to_collection.name}
                    className="w-32 rounded-lg shadow-lg"
                  />
                  <p className="text-lg">
                    {movieData.belongs_to_collection.overview}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

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
            <Image
              width={100}
              height={100}
              src={movieData.poster_path}
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
