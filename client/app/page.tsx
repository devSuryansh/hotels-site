import React from "react";
import Header from "../components/header";
import Hero from "../components/hero";
import FeaturedHotels from "../components/featured-hotels";
import Footer from "../components/footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedHotels />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
