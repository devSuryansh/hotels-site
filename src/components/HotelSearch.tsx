"use client";

import React, { useState, FormEvent } from "react";
import { Calendar, Users, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchForm {
  checkIn: string;
  checkOut: string;
  guests: number;
}

const HotelSearch: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SearchForm>({
    checkIn: "2025-05-02",
    checkOut: "2025-05-03",
    guests: 2,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests.toString(),
    }).toString();
    router.push(`/search?${query}`);
  };

  const handleInputChange = (
    field: keyof SearchForm,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-5xl bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]">
      <div className="p-6 md:p-8">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-6 tracking-tight">
          Find Your Perfect Stay
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {/* Check-in Date */}
          <div className="relative">
            <label className="block text-white text-sm font-medium mb-2">
              Check-In
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => handleInputChange("checkIn", e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div className="relative">
            <label className="block text-white text-sm font-medium mb-2">
              Check-Out
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => handleInputChange("checkOut", e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                min={formData.checkIn}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="relative">
            <label className="block text-white text-sm font-medium mb-2">
              Guests
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <select
                value={formData.guests}
                onChange={(e) =>
                  handleInputChange("guests", parseInt(e.target.value))
                }
                className="w-full pl-10 pr-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all appearance-none"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num} className="text-black">
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-white text-purple-600 rounded-lg h-[60px] transition duration-300 text-lg font-semibold mt-auto hover:bg-purple-100 transform hover:-translate-y-1"
          >
            <Search className="h-5 w-5" />
            <span>Search Hotels</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HotelSearch;
