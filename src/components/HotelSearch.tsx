import React from "react";
import SearchField from "./SearchField";

const HotelSearch: React.FC = () => {
  return (
    <div className="w-full max-w-5xl bg-hotel-search rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-white text-xl md:text-2xl font-semibold mb-6">
          SEARCH HOTELS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Check-in Date */}
          <SearchField label="CHECK-IN" value="2 May 2025" icon="calendar" />

          {/* Check-out Date */}
          <SearchField label="CHECK-OUT" value="3 May 2025" icon="calendar" />

          {/* Guests */}
          <SearchField label="GUESTS" value="2 guests" icon="person" />

          {/* Search Button */}
          <button className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md h-[60px] transition duration-300 text-lg font-medium mt-auto">
            <span>SEARCH</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide search w-5 h-5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelSearch;
