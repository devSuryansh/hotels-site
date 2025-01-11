import Header from "@/components/header";
import Footer from "@/components/footer";
import CategoryCard from "@/components/category-card";
import {
  fiveStarHotels,
  fourStarHotels,
  threeStarHotels,
  twoStarHotels,
} from "@/data/hotels";

export default function HotelCategoriesPage() {
  const categories = [
    {
      name: "5 Star Hotels",
      hotels: fiveStarHotels,
      link: "/hotel-categories/5-star-hotels",
    },
    {
      name: "4 Star Hotels",
      hotels: fourStarHotels,
      link: "/hotel-categories/4-star-hotels",
    },
    {
      name: "3 Star Hotels",
      hotels: threeStarHotels,
      link: "/hotel-categories/3-star-hotels",
    },
    {
      name: "2 Star Hotels",
      hotels: twoStarHotels,
      link: "/hotel-categories/2-star-hotels",
    },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Hotel Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              count={category.hotels.length}
              link={category.link}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
