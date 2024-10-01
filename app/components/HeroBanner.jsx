"use client";
import React, { useState, useEffect } from "react";
import { FaPlay, FaInfoCircle, FaPlus } from "react-icons/fa";

const NetflixHeroBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-red-900">
        <img
          src="https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Featured Content"
          className="w-full h-full object-cover opacity-50"
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
            Stranger Things
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            A thrilling journey into the supernatural
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="flex items-center px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300">
              <FaPlay className="mr-2" /> Watch Now
            </button>
            <button className="flex items-center px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-300">
              <FaInfoCircle className="mr-2" /> More Info
            </button>
            <button className="flex items-center px-4 py-2 bg-transparent border border-gray-300 text-white rounded-md hover:bg-gray-700 transition-colors duration-300">
              <FaPlus className="mr-2" /> My List
            </button>
          </div>

          {/* User Ratings */}
          <div className="text-white mb-4">
            <span className="text-green-500 font-bold mr-2">98% Match</span>
            <span>2016</span>
            <span className="mx-2">|</span>
            <span>4 Seasons</span>
            <span className="mx-2">|</span>
            <span>TV Mysteries</span>
          </div>

          {/* User Reviews */}
          <div className="bg-gray-800 bg-opacity-75 p-4 rounded-md max-w-md">
            <h3 className="text-white font-bold mb-2">User Reviews</h3>
            <p className="text-gray-300 text-sm">
              "An absolute masterpiece! The perfect blend of nostalgia and
              supernatural thrills."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixHeroBanner;
