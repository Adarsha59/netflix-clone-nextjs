"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlay, FaInfoCircle, FaStar, FaPlus, FaShare } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Card = ({ carouselItems }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [genres, setGenres] = useState([]);

  const fetchGenre = async () => {
    try {
      const response = await axios.get("/api/genre/movie/list");
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Failed to fetch genres:", error);
    }
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.id === genreId);
    return genre ? genre.name : "Unknown Genre";
  };

  const router = useRouter();

  const handleHover = (id) => {
    setHoveredItem(id);
  };

  const handlePlayNow = (id) => {
    router.push("/player");
  };

  const handleViewMore = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div
        className="flex space-x-4  pb-4 scroll-container"
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
        }}
      >
        {carouselItems.map((item) => (
          <div
            key={item.id}
            className="relative flex-shrink-0 w-64 h-96 rounded-lg overflow-hidden transition-transform transform duration-300 hover:scale-110 hover:shadow-2xl"
            onMouseEnter={() => handleHover(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <img
              src={item.poster_path}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg"
            />
            {hoveredItem === item.id && (
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black bg-opacity-70 p-4 flex flex-col justify-end">
                <h3 className="text-white text-lg font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {item.overview}
                </p>
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handlePlayNow(item.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition duration-200"
                  >
                    <FaPlay className="mr-1" /> <span>Play</span>
                  </button>
                  <button
                    onClick={() => handleViewMore(item)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition duration-200"
                  >
                    <FaInfoCircle className="mr-1" /> <span>View More</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedItem.backdrop_path}
                alt={selectedItem.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-opacity duration-200"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-2">{selectedItem.title}</h2>
              <div className="flex items-center mb-4 space-x-3">
                <FaStar className="text-yellow-400" />
                <span className="text-gray-700">
                  {selectedItem.vote_average} ({selectedItem.vote_count} votes)
                </span>
                <span className="text-gray-500">
                  | Released:{" "}
                  {new Date(selectedItem.release_date).toDateString()}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{selectedItem.overview}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedItem.genre_ids.map((id) => (
                  <span
                    key={id}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
                  >
                    {getGenreName(id)}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => handlePlayNow(selectedItem.id)}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-red-700 transition duration-200"
                >
                  <FaPlay className="mr-2" /> Play Now
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg flex items-center hover:bg-gray-300 transition duration-200">
                  <FaPlus className="mr-2" /> My List
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg flex items-center hover:bg-gray-300 transition duration-200">
                  <FaShare className="mr-2" /> Share
                </button>
              </div>
              <h3 className="text-xl font-bold mb-2">Related Titles</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {carouselItems
                  .filter((item) => item.id !== selectedItem.id)
                  .slice(0, 3)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleViewMore(item)}
                    >
                      <img
                        src={item.poster_path}
                        alt={item.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2">
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
