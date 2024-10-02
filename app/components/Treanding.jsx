"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const NetflixCarousel = () => {
  const Items = [
    {
      id: 1,
      title: "Stranger Things",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0",
      description: "A group of kids uncover dark secrets in their small town.",
      genre: ["Sci-Fi", "Horror"],
      rating: 4.8,
    },
    {
      id: 2,
      title: "The Crown",
      image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2",
      description: "A historical drama about the reign of Queen Elizabeth II.",
      genre: ["Drama", "History"],
      rating: 4.7,
    },
    {
      id: 3,
      title: "Bridgerton",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0",
      description: "A romantic drama set in Regency-era London.",
      genre: ["Romance", "Drama"],
      rating: 4.5,
    },
    {
      id: 4,
      title: "The Witcher",
      image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2",
      description:
        "A fantasy drama following a monster hunter with supernatural abilities.",
      genre: ["Fantasy", "Action"],
      rating: 4.6,
    },
  ];

  const [carouselItems, setCarouselItems] = useState(Items);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(
        "/api/trending/movie/day?language=hi-IN"
      );
      const trendingmovie = response.data.results;
      const moviesWithFullImages = response.data.results.map((movie) => ({
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      })); // Adjust the endpoint as needed
      setCarouselItems(moviesWithFullImages);
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
      <Card carouselItems={carouselItems} />
    </div>
  );
};

export default NetflixCarousel;
