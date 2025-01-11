import Link from "next/link";
import { Star } from "lucide-react";

interface CategoryCardProps {
  name: string;
  count: number;
  link: string;
}

export default function CategoryCard({ name, count, link }: CategoryCardProps) {
  const starCount = parseInt(name.split(" ")[0]);

  return (
    <Link href={link} className="block">
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <div className="flex items-center mb-2">
          {[...Array(starCount)].map((_, index) => (
            <Star
              key={index}
              className="w-5 h-5 text-yellow-400 fill-current"
            />
          ))}
        </div>
        <p className="text-gray-600">{count} hotels available</p>
      </div>
    </Link>
  );
}
