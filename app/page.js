import Image from "next/image";
import NetflixSignup from "./home/page";
import NetflixHeroBanner from "./components/HeroBanner";
import TrendingCarousel from "./components/Treanding";
import SnakeGame from "./components/snake";
import ContentOverviewModal from "./components/Modal";
import TrendingTv from "./components/TrendingTV";
import TopRatedMovies from "./components/TopRatedMovies";
import TopRatedTV from "./components/TopRatedTV";
import Nepali from "./components/Nepali";

export default function Home() {
  return (
    <>
      {/* <NetflixSignup /> */}
      <NetflixHeroBanner />
      <TrendingCarousel />
      <TrendingTv />
      <TopRatedMovies />
      <TopRatedTV />
      <Nepali />
    </>
  );
}
