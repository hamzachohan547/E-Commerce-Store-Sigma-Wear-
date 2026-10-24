import Hero from "./components/Hero";
import Categories from "./components/Categories";
import NewReleases from "./components/NewReleases";
import BestSellers from "./components/BestSellers";
import Trending from "./components/Trending";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <NewReleases />
      <BestSellers />
      <Trending />
    </>
  );
}

export default Home;