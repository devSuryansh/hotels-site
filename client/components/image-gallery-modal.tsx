import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, Button } from "@/components/ui";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryModalProps {
  images: string[];
  hotelName: string;
}

export function ImageGalleryModal({
  images,
  hotelName,
}: ImageGalleryModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <Button className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={`${hotelName} - Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="hover:opacity-80 transition-opacity"
              />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <div className="relative aspect-video">
              <Image
                src={images[currentImageIndex]}
                alt={`${hotelName} - Image ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="contain"
              />
              <Button
                className="absolute top-2 right-2 rounded-full p-2"
                variant="ghost"
                onClick={() => setCurrentImageIndex(index)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
              <Button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full p-2"
                variant="ghost"
                onClick={goToPreviousImage}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-2"
                variant="ghost"
                onClick={goToNextImage}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
            <div className="text-center mt-2">
              Image {currentImageIndex + 1} of {images.length}
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
