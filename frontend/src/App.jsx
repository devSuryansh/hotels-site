import React from "react";
import { Header, Hero, FeaturedHotels, Footer } from "@/components";

const App = () => {
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

export default App;
