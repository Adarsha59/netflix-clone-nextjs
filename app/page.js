import Image from "next/image";
import NetflixSignup from "./home/page";
import NetflixHeroBanner from "./components/HeroBanner";
import TrendingCarousel from "./components/Treanding";
import SnakeGame from "./components/snake";
import ContentOverviewModal from "./components/Modal";

export default function Home() {
  return (
    <>
      {/* <NetflixSignup /> */}
      <NetflixHeroBanner />
      <TrendingCarousel />
      <TrendingCarousel />
      <TrendingCarousel />
      <ContentOverviewModal />
      <TrendingCarousel />
    </>
  );
}
