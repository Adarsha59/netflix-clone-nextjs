"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaPlay, FaInfo, FaStar, FaPlus, FaShare } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
const Card = ({ carouselItems }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const handleHover = (id) => {
    setHoveredItem(id);
    // Log hover event
    console.log(`Hovered over item: ${id}`);
  };

  const handlePlayNow = (id) => {
    // Log play event
    router.push("/player");
    console.log(`Play Now clicked for item: ${id}`);
    // Implement play functionality here
  };

  const handleViewMore = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    // Log view more event
    console.log(`View More clicked for item: ${item.id}`);
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
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {carouselItems.map((item) => (
          <div
            key={item.id}
            className="relative flex-shrink-0 w-64 h-96 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
            onMouseEnter={() => handleHover(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              transform: hoveredItem === item.id ? "scale(1.05)" : "scale(1)",
              boxShadow:
                hoveredItem === item.id
                  ? "0 10px 20px rgba(0,0,0,0.2)"
                  : "none",
            }}
          >
            <img
              src={item.poster_path}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            {hoveredItem === item.id && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-4">
                <h3 className="text-white text-xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">{item.overview}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePlayNow(item.id)}
                    className="flex items-center justify-center bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-200"
                    aria-label="Play Now"
                  >
                    <FaPlay className="mr-2" /> Play Now
                  </button>
                  <button
                    onClick={() => handleViewMore(item)}
                    className="flex items-center justify-center bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200"
                    aria-label="View More"
                  >
                    <FaInfo className="mr-2" /> View More
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
                aria-label="Close modal"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-2">{selectedItem.title}</h2>
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-gray-700">
                  {selectedItem.vote_average}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{selectedItem.overview}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedItem.genre_ids.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => handlePlayNow(selectedItem.id)}
                  className="flex items-center justify-center bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors duration-200"
                  aria-label="Play"
                >
                  <FaPlay className="mr-2" /> Play
                </button>
                <button
                  className="flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors duration-200"
                  aria-label="Add to My List"
                >
                  <FaPlus className="mr-2" /> My List
                </button>
                <button
                  className="flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors duration-200"
                  aria-label="Share"
                >
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
                      className="bg-gray-100 rounded overflow-hidden cursor-pointer"
                      onClick={() => handleViewMore(item)}
                    >
                      <img
                        src={item.image}
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
