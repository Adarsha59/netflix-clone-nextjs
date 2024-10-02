"use client";
import React, { useEffect, useState } from "react";
import { FaStar, FaPlay, FaShareAlt, FaList } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
const MovieDetailsPage = () => {
  const [tvData, setTvData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const path = usePathname();
  const tvId = parseInt(path.split("/")[1]);
  const pathname = usePathname();
  const handleShare = async () => {
    const fullUrl = `${window.location.origin}${pathname}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Share link copied");
    } catch (error) {
      console.error("Failed to copy the URL:", error);
    }
  };
  useEffect(() => {
    const fetchTvDetails = async () => {
      try {
        const response = await axios.get(`/api/tv/${tvId}`);
        const tv = response.data;

        // Update poster and backdrop paths with full URLs
        const tvWithFullImages = {
          ...tv,
          poster_path: tv.poster_path
            ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
            : null,
          backdrop_path: tv.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${tv.backdrop_path}`
            : null,
        };

        setTvData(tvWithFullImages);
      } catch (error) {
        console.error("Failed to fetch TV details:", error);
      }
    };

    fetchTvDetails();
  }, [tvId]);

  if (!tvData) {
    return <div>Loading...</div>;
  }

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${tvData.backdrop_path})`,
          filter: "brightness(0.3)",
        }}
      ></div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* TV Poster */}
          <div className="md:w-1/3">
            <div
              className="relative cursor-pointer transform hover:scale-105 transition duration-300"
              onClick={toggleModal}
            >
              <Image
                width={100}
                height={100}
                src={tvData.poster_path}
                alt={tvData.name}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                <FaPlay className="text-6xl text-white" />
              </div>
            </div>
          </div>

          {/* TV Details */}
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              {tvData.name}
            </h1>
            <p className="text-xl italic text-gray-300 mb-6">
              {tvData.tagline || "No tagline available"}
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
              <Link href={`player/movie&${tvId}`}>
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
                <span>{new Date(tvData.first_air_date).getFullYear()}</span>
              </div>
              <div className="flex items-center">
                <MdAccessTime className="mr-2" />
                <span>{tvData.episode_run_time[0]} min</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tvData.genres.map((genre, index) => (
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
              <span className="text-2xl font-bold">{tvData.vote_average}</span>
              <span className="text-gray-400 ml-2">
                ({tvData.vote_count} votes)
              </span>
            </div>

            {/* Overview */}
            <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-lg">{tvData.overview}</p>
            </div>

            {/* Seasons */}
            {tvData.seasons && (
              <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg mb-6">
                <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
                <div className="flex flex-col space-y-4">
                  {tvData.seasons.map((season) => (
                    <div
                      key={season.id}
                      className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg"
                    >
                      <Image
                        width={100}
                        height={100}
                        src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                        alt={season.name}
                        className="w-24 rounded-lg"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{season.name}</h3>
                        <p>{season.episode_count} Episodes</p>
                        {season.air_date && (
                          <p>
                            Aired: {new Date(season.air_date).getFullYear()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Homepage */}
            {tvData.homepage && (
              <div className="mb-6">
                <a
                  href={tvData.homepage}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Visit Official Website
                </a>
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
              src={tvData.poster_path}
              alt={tvData.name}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
