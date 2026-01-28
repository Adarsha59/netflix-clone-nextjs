"use client";
import NetflixSignup from "./home/page"; // Signup page
import NetflixHeroBanner from "./components/HeroBanner"; // Other components
import TrendingCarousel from "./components/Treanding";
import TrendingTv from "./components/TrendingTV";
import TopRatedMovies from "./components/TopRatedMovies";
import TopRatedTV from "./components/TopRatedTV";
import Nepali from "./components/Nepali";
import Hindi from "./components/Hindi";

export default function Home() {
  return (
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
  );
}
