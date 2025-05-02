import React from "react";
import HotelSearch from "./HotelSearch";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-screen min-h-[600px] bg-hotel-map bg-cover bg-center mt-16">
      {/* Purple overlay */}
      <div className="absolute inset-0 bg-hotel-purple/80"></div>

      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <header className="p-4 md:p-8">
          <div className="text-white">
            <h3 className="text-lg md:text-xl font-bold">
              HOTELS IN RISHIKESH
            </h3>
            <p className="text-sm md:text-base">
              EXCLUSIVE AVAILABILITY AND RATES
            </p>
          </div>

          {/* Language and Currency Selector (top right) */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <Image
                src="https://flagcdn.com/w20/in.png"
                alt="India Flag"
                className="w-5 h-3.5"
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
                className="chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
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
                className="chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hotels in Rishikesh
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl">
            Find the perfect hotels in Rishikesh for leisure, adventure, and
            business
          </p>
        </div>

        {/* Search Box */}
        <div className="px-4 pb-12 md:pb-20 flex justify-center">
          <HotelSearch />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
