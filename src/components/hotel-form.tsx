"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Plus, X } from "lucide-react";

const amenities = [
  { id: "wifi", label: "WiFi" },
  { id: "pool", label: "Swimming Pool" },
  { id: "gym", label: "Gym" },
  { id: "spa", label: "Spa" },
  { id: "restaurant", label: "Restaurant" },
  { id: "bar", label: "Bar" },
  { id: "parking", label: "Parking" },
  { id: "ac", label: "Air Conditioning" },
  { id: "roomService", label: "Room Service" },
  { id: "conferenceRoom", label: "Conference Room" },
  { id: "laundry", label: "Laundry Service" },
  { id: "petFriendly", label: "Pet Friendly" },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Hotel name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce.number().min(1, {
    message: "Price must be at least 1.",
  }),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface HotelFormProps {
  hotelId?: string;
}

export function HotelForm({ hotelId }: HotelFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEditing, setIsEditing] = useState(!!hotelId);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      price: 0,
      amenities: [],
      images: [],
    },
  });

  useEffect(() => {
    if (hotelId) {
      setIsLoading(true);
      // In a real app, you would fetch the hotel data from your API
      // For demo purposes, we'll simulate an API call
      setTimeout(() => {
        form.reset({
          name: "Grand Hotel",
          location: "New York, USA",
          description: "Luxury hotel in the heart of Manhattan",
          price: 299,
          amenities: ["wifi", "pool", "spa", "gym", "restaurant"],
          images: ["/placeholder.svg", "/placeholder.svg"],
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [hotelId, form]);

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // In a real app, you would send the data to your API
      console.log(values);

      // Generate slug from name
      const slug = values.name.toLowerCase().replace(/\s+/g, "-");
      console.log("Generated slug:", slug);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push("/hotels");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addImage = () => {
    if (imageUrl && !form.getValues().images?.includes(imageUrl)) {
      const currentImages = form.getValues().images || [];
      form.setValue("images", [...currentImages, imageUrl]);
      setImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues().images || [];
    form.setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
  };

  if (isLoading && isEditing) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter hotel name" {...field} />
                </FormControl>
                <FormDescription>
                  This will be used to generate the hotel slug.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the hotel"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per Night ($)</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label>Images</Label>
          <div className="mt-2 flex gap-2">
            <Input
              placeholder="Enter image URL (ImageKit link)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button type="button" onClick={addImage} className="shrink-0">
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {form.watch("images")?.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Hotel image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-6 w-6"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Label>Amenities</Label>
          <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {amenities.map((amenity) => (
              <FormField
                key={amenity.id}
                control={form.control}
                name="amenities"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(amenity.id)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          if (checked) {
                            field.onChange([...currentValues, amenity.id]);
                          } else {
                            field.onChange(
                              currentValues.filter(
                                (value) => value !== amenity.id
                              )
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer font-normal">
                      {amenity.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Update Hotel" : "Create Hotel"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/hotels")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
