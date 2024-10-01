"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card"; // Make sure your Card component is properly exported

const English = () => {
  const [movies, setMovies] = useState([]); // To store all movies
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // Loading state for data fetching
  const [hasMore, setHasMore] = useState(true); // To know if more data is available

  // Fetch movies based on the current page
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/english?page=${page}`);
      const trendingMovies = response.data.results;

      // Format movie image paths
      const moviesWithFullImages = trendingMovies.map((movie) => ({
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      }));

      // Append the new movies to the existing list
      setMovies((prevMovies) => [...prevMovies, ...moviesWithFullImages]);

      // If no more movies are available, stop loading
      if (trendingMovies.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch when the component mounts
  useEffect(() => {
    fetchMovies();
  }, [page]); // Re-fetch whenever the page changes

  // Handle clicking the "Load More" button
  const loadMoreMovies = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Move to the next page
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">
        All English Movies Page {page}
      </h1>

      {/* Display movies */}
      <Card carouselItems={movies} />

      {/* Loading state */}
      {loading && <p>Loading more movies...</p>}

      {/* "Load More" button */}
      {hasMore && !loading && (
        <div className="text-center mt-6">
          <button
            onClick={loadMoreMovies}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Load More
          </button>
        </div>
      )}

      {/* If no more movies */}
      {!hasMore && (
        <p className="text-center mt-6">No more movies available.</p>
      )}
    </div>
  );
};

export default English;
