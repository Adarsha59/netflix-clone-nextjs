"use client";
import NetflixSignup from "./home/page"; // Signup page
import NetflixHeroBanner from "./components/HeroBanner"; // Other components
import TrendingCarousel from "./components/Treanding";
import SnakeGame from "./components/snake";
import ContentOverviewModal from "./components/Modal";
import TrendingTv from "./components/TrendingTV";
import TopRatedMovies from "./components/TopRatedMovies";
import TopRatedTV from "./components/TopRatedTV";
import Nepali from "./components/Nepali";
import Hindi from "./components/Hindi";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser(); // useUser hook for user state

  if (!isLoaded) {
    // Optionally, you can add a loading state
    return <div>Loading...</div>;
  }

  return (
    <>
      {isSignedIn ? (
        <>
          {/* Show these components if the user is signed in */}
          <NetflixHeroBanner />
          <TrendingCarousel />
          <Hindi />
          <TrendingTv />
          <TopRatedMovies />
          <TopRatedTV />
          <Nepali />
          {/* You can add more components here if needed */}
        </>
      ) : (
        <NetflixSignup /> // Show Signup component if the user is not signed in
      )}
    </>
  );
}
