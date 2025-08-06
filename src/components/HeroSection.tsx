"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const HeroSection: React.FC = () => {
  const phoneNumber = "+91 999 205 2201";

  return (
    <div
      className="relative w-full h-screen min-h-[600px] bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1586375300773-8384e3e4916f')", // Changed to a more scenic Cherrapunji image
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/90 to-slate-900/90"></div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight">
            Experience the Magic of Cherrapunji
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your stay in the land of living root bridges and majestic
            waterfalls. Our expert team is ready to help you find the perfect
            resort.
          </p>

          <motion.a
            href={`tel:${phoneNumber}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-white text-emerald-900 px-8 py-4 rounded-full 
              text-lg md:text-xl font-semibold hover:bg-emerald-50 transition-colors duration-300
              shadow-lg hover:shadow-xl"
          >
            <Phone className="w-6 h-6" />
            <span>{phoneNumber}</span>
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-white/80"
          >
            Available 24/7 for resort bookings and inquiries
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
