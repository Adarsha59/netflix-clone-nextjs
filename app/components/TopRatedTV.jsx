"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CardTv from "./CradTv";

const TopRatedTV = () => {
  const Items = [
    {
      id: 1,
      title: "Stranger Things",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0",
      description: "A group of kids uncover dark secrets in their small town.",
      genre: ["Sci-Fi", "Horror"],
      rating: 4.8,
    },
  ];

  const [carouselItems, setCarouselItems] = useState(Items);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get("/api/tv/top_rated");
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
  console.log("tv", carouselItems);
  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Top Rated Series</h2>
      <CardTv carouselItems={carouselItems} />
    </div>
  );
};

export default TopRatedTV;
