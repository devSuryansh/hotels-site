import { Button, Input, Label } from "@/components/ui";
import { CalendarIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
      <div className="container mx-auto px-6 lg:px-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
          Find Your Perfect Stay
        </h1>
        <p className="text-lg md:text-2xl mb-12 text-center">
          Discover amazing hotels at the best prices
        </p>
        <form className="bg-white p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <Label
                htmlFor="destination"
                className="text-gray-700 font-medium"
              >
                Destination
              </Label>
              <Input
                type="text"
                id="destination"
                placeholder="Where are you going?"
                className="w-full border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring focus:ring-blue-300 p-2"
              />
            </div>
            <div>
              <Label htmlFor="check-in" className="text-gray-700 font-medium">
                Check-in
              </Label>
              <Input
                type="date"
                id="check-in"
                className="w-full border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring focus:ring-blue-300 py-2 px-3"
              />
            </div>
            <div>
              <Label htmlFor="check-out" className="text-gray-700 font-medium">
                Check-out
              </Label>
              <Input
                type="date"
                id="check-out"
                className="w-full border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring focus:ring-blue-300 py-2 px-3"
              />
            </div>

            <div>
              <Label htmlFor="guests" className="text-gray-700 font-medium">
                Guests
              </Label>
              <Input
                type="number"
                id="guests"
                placeholder="Number of guests"
                className="w-full border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring focus:ring-blue-300 p-2"
                min="1"
              />
            </div>
          </div>

          <Button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Search Hotels
          </Button>
        </form>
      </div>
    </section>
  );
}
