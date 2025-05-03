"use client";

import React from "react";
import HotelSearch from "./HotelSearch";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const location = "Cherrapunji"; // Consistent location

  return (
    <div
      className="relative w-full h-screen min-h-[600px] bg-cover bg-center mt-16"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb')",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-indigo-900/80"></div>

      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <header className="p-4 md:p-8">
          <div className="text-white max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <h3 className="text-lg md:text-xl font-bold tracking-wide">
                HOTELS IN {location.toUpperCase()}
              </h3>
              <p className="text-sm md:text-base opacity-80">
                Exclusive Availability and Rates
              </p>
            </div>

            {/* Language and Currency Selector */}
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <Image
                  src="https://flagcdn.com/w20/in.png"
                  alt="India Flag"
                  width={20}
                  height={14}
                />
                <span className="hidden sm:inline">English</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <span>INR</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col items-center justify-center px-4 text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Discover Hotels in {location}
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl opacity-80">
            Find the perfect stay for leisure, adventure, and business in{" "}
            {location}
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-4 pb-12 md:pb-20 flex justify-center"
        >
          <HotelSearch />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
