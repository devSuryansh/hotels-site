import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Search, TriangleAlert, Hotel } from "lucide-react";

export const dynamic = "force-dynamic";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <Card className="max-w-3xl w-full shadow-lg">
        <CardHeader className="text-center border-b pb-6">
          <CardTitle className="text-3xl md:text-4xl font-bold">
            Page Not Found
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            We couldn&apos;t locate the page you were looking for
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 pb-6 px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://plus.unsplash.com/premium_vector-1721386085379-8df3c43a062d?w=300&h=500"
                alt="Hotel lobby"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-background/90 px-4 py-2 rounded-md">
                  <p className="text-lg font-semibold flex items-center">
                    <TriangleAlert /> <span className="ml-2">404</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-xl font-semibold">Looking for something?</h2>
              <p className="text-muted-foreground">
                The page you requested seems to have checked out. Try one of
                these options to find your perfect stay or explore nearby
                attractions.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between border-t pt-6">
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/hotels" className="flex items-center gap-2">
              <Hotel size={16} />
              <span>Explore Hotels</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFoundPage;
