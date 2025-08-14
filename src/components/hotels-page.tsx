"use client";

import { useState, useMemo, useEffect } from "react";
import { HotelCard } from "@/components/hotel-card";
import { allFeatures, allAttractions, allLandmarks } from "@/lib/data";
import type { Hotel } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, Wifi, Car, Dog, Utensils, Waves, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const featureIcons: { [key: string]: React.ElementType } = {
  "Wi-Fi": Wifi,
  Parking: Car,
  "Pet-friendly": Dog,
  Restaurant: Utensils,
  "Swimming Pool": Waves,
  Spa: Star,
};

export default function HotelsPage() {
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([500, 20000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([]);
  const [selectedLandmarks, setSelectedLandmarks] = useState<string[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("/api/hotels");
        const data = await response.json();
        setAllHotels(data.hotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleAttractionChange = (attraction: string) => {
    setSelectedAttractions((prev) =>
      prev.includes(attraction)
        ? prev.filter((a) => a !== attraction)
        : [...prev, attraction]
    );
  };

  const handleLandmarkChange = (landmark: string) => {
    setSelectedLandmarks((prev) =>
      prev.includes(landmark)
        ? prev.filter((l) => l !== landmark)
        : [...prev, landmark]
    );
  };

  const filteredHotels = useMemo(() => {
    return allHotels.filter((hotel) => {
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice =
        hotel.priceRange[1] >= priceRange[0] &&
        hotel.priceRange[0] <= priceRange[1];
      const matchesFeatures = selectedFeatures.every((feature) =>
        hotel.features.includes(feature)
      );
      const matchesAttractions = selectedAttractions.every((attraction) =>
        hotel.nearbyAttractions.includes(attraction)
      );
      const matchesLandmarks = selectedLandmarks.every((landmark) =>
        hotel.landmarks.includes(landmark)
      );

      return (
        matchesSearch &&
        matchesPrice &&
        matchesFeatures &&
        matchesAttractions &&
        matchesLandmarks
      );
    });
  }, [
    searchTerm,
    priceRange,
    selectedFeatures,
    selectedAttractions,
    selectedLandmarks,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([500, 20000]);
    setSelectedFeatures([]);
    setSelectedAttractions([]);
    setSelectedLandmarks([]);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Find Your Perfect Stay
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Use our advanced filters to find the resort that matches your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center justify-between">
                Filters
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="search" className="font-semibold">
                  Search by name
                </Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="e.g. Serene Retreat"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="font-semibold">Price Range</Label>
                <div className="mt-4">
                  <Slider
                    min={1}
                    max={20000}
                    step={500}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value)}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>Rs. {priceRange[0]}</span>
                    <span>Rs. {priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-semibold">Features</Label>
                <div className="space-y-2 mt-2">
                  {allFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={`feature-${feature}`}
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={() => handleFeatureChange(feature)}
                      />
                      <label
                        htmlFor={`feature-${feature}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="font-semibold">Nearby Attractions</Label>
                <div className="space-y-2 mt-2">
                  {allAttractions.map((attraction) => (
                    <div
                      key={attraction}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`attraction-${attraction}`}
                        checked={selectedAttractions.includes(attraction)}
                        onCheckedChange={() =>
                          handleAttractionChange(attraction)
                        }
                      />
                      <label
                        htmlFor={`attraction-${attraction}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {attraction}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="font-semibold">Landmarks</Label>
                <div className="space-y-2 mt-2">
                  {allLandmarks.map((landmark) => (
                    <div key={landmark} className="flex items-center space-x-2">
                      <Checkbox
                        id={`landmark-${landmark}`}
                        checked={selectedLandmarks.includes(landmark)}
                        onCheckedChange={() => handleLandmarkChange(landmark)}
                      />
                      <label
                        htmlFor={`landmark-${landmark}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {landmark}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Hotel Grid */}
        <main className="lg:col-span-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-center bg-card rounded-lg p-8">
              <h3 className="font-headline text-2xl font-semibold">
                Loading Hotels...
              </h3>
              <p className="mt-2 text-muted-foreground">
                Please wait while we fetch the latest hotel information.
              </p>
            </div>
          ) : filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center bg-card rounded-lg p-8">
              <h3 className="font-headline text-2xl font-semibold">
                No Hotels Found
              </h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting or{" "}
                <span className="text-foreground">resetting</span> your filters
                to find more results.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
