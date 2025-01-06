import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";

const hero = () => {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Stay</h1>
        <p className="text-xl mb-8">
          Discover amazing hotels at the best prices
        </p>
        <form className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="destination" className="text-gray-700">
                Destination
              </Label>
              <Input
                type="text"
                id="destination"
                placeholder="Where are you going?"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="check-in" className="text-gray-700">
                Check-in
              </Label>
              <div className="relative">
                <Input type="date" id="check-in" className="w-full" />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="check-out" className="text-gray-700">
                Check-out
              </Label>
              <div className="relative">
                <Input type="date" id="check-out" className="w-full" />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="guests" className="text-gray-700">
                Guests
              </Label>
              <Input
                type="number"
                id="guests"
                placeholder="Number of guests"
                className="w-full"
                min="1"
              />
            </div>
          </div>
          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Search Hotels
          </Button>
        </form>
      </div>
    </section>
  );
};

export default hero;
