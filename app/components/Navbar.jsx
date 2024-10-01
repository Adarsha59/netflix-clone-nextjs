"use client";
import React, { useState, useEffect } from "react";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";

const NetflixNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    "Home",
    "TV Shows",
    "Movies",
    "New & Popular",
    "My List",
    "Browse by Language",
  ];

  return (
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
                href="#"
                className="text-white text-sm hover:text-red-600 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
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
              href="#"
              className="block px-4 py-2 text-white hover:text-red-600 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NetflixNavbar;
