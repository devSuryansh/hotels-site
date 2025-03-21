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
import Image from "next/image";

const featureOptions = {
  mainFeatures: ["wifi", "pool", "gym", "spa"],
  dining: ["restaurant", "bar", "roomService"],
  leisure: ["garden", "terrace", "entertainment"],
  services: ["parking", "laundry", "concierge"],
  roomComforts: ["ac", "tv", "minibar"],
} as const;

type FeatureCategory = keyof typeof featureOptions;

// Updated schema matching the backend
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Hotel name must be at least 2 characters." }),
  slug: z.string().min(2, { message: "Slug must be at least 2 characters." }),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters." }),
  locationUrl: z.string().url({ message: "Must be a valid URL." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  policies: z
    .string()
    .min(10, { message: "Policies must be at least 10 characters." }),
  features: z
    .object({
      mainFeatures: z.array(z.string()).optional(),
      dining: z.array(z.string()).optional(),
      leisure: z.array(z.string()).optional(),
      services: z.array(z.string()).optional(),
      roomComforts: z.array(z.string()).optional(),
    })
    .optional(),
  roomTypes: z
    .array(
      z.object({
        category: z.string().min(1, { message: "Room category is required." }),
        pricePerNight: z.coerce
          .number()
          .min(1, { message: "Price must be at least 1." }),
      })
    )
    .min(1, { message: "At least one room type is required." }),
  nearbyAttractions: z.array(z.string()).optional(),
  landmarks: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface HotelFormProps {
  hotelId?: string; // For editing, we'll use slug instead of ID
}

export function HotelForm({ hotelId }: HotelFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [newAttraction, setNewAttraction] = useState("");
  const [newLandmark, setNewLandmark] = useState("");
  const isEditing = !!hotelId;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      address: "",
      locationUrl: "",
      description: "",
      policies: "",
      features: {
        mainFeatures: [],
        dining: [],
        leisure: [],
        services: [],
        roomComforts: [],
      },
      roomTypes: [{ category: "", pricePerNight: 0 }],
      nearbyAttractions: [],
      landmarks: [],
      images: [],
    },
  });

  useEffect(() => {
    if (hotelId) {
      setIsLoading(true);
      fetch(`/api/hotels?slug=${hotelId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          form.reset(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching hotel:", error);
          setIsLoading(false);
        });
    }
  }, [hotelId, form]);

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch("/api/hotels", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save hotel");
      }

      const hotel = await response.json();
      router.push(`/hotels?slug=${hotel.slug}`);
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

  const addRoomType = () => {
    const currentRoomTypes = form.getValues().roomTypes || [];
    form.setValue("roomTypes", [
      ...currentRoomTypes,
      { category: "", pricePerNight: 0 },
    ]);
  };

  const removeRoomType = (index: number) => {
    const currentRoomTypes = form.getValues().roomTypes || [];
    form.setValue(
      "roomTypes",
      currentRoomTypes.filter((_, i) => i !== index)
    );
  };

  const addAttraction = () => {
    if (
      newAttraction &&
      !form.getValues().nearbyAttractions?.includes(newAttraction)
    ) {
      const currentAttractions = form.getValues().nearbyAttractions || [];
      form.setValue("nearbyAttractions", [
        ...currentAttractions,
        newAttraction,
      ]);
      setNewAttraction("");
    }
  };

  const addLandmark = () => {
    if (newLandmark && !form.getValues().landmarks?.includes(newLandmark)) {
      const currentLandmarks = form.getValues().landmarks || [];
      form.setValue("landmarks", [...currentLandmarks, newLandmark]);
      setNewLandmark("");
    }
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="hotel-slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locationUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://maps.example.com" {...field} />
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
          name="policies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Policies</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hotel policies"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label>Room Types</Label>
          {form.watch("roomTypes")?.map((_, index) => (
            <div key={index} className="flex gap-4 mt-2 items-end">
              <FormField
                control={form.control}
                name={`roomTypes.${index}.category`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Deluxe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`roomTypes.${index}.pricePerNight`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeRoomType(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addRoomType} className="mt-2">
            <Plus className="mr-2 h-4 w-4" /> Add Room Type
          </Button>
        </div>

        <div>
          <Label>Features</Label>
          {Object.entries(featureOptions).map(([category, options]) => (
            <div key={category} className="mt-4">
              <Label className="capitalize">{category}</Label>
              <div className="mt-2 grid grid-cols-2 gap-4">
                {options.map((option) => (
                  <FormField
                    key={option}
                    control={form.control}
                    name={`features.${category as FeatureCategory}`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={
                              (field.value as string[] | undefined)?.includes(
                                option
                              ) || false
                            }
                            onCheckedChange={(checked) => {
                              const currentValues =
                                (field.value as string[] | undefined) || [];
                              field.onChange(
                                checked
                                  ? [...currentValues, option]
                                  : currentValues.filter((v) => v !== option)
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal">
                          {option}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <Label>Images</Label>
          <div className="mt-2 flex gap-2">
            <Input
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button type="button" onClick={addImage}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {form.watch("images")?.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Hotel image ${index + 1}`}
                    fill // Use fill for responsive images
                    className="object-cover"
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
          <Label>Nearby Attractions</Label>
          <div className="mt-2 flex gap-2">
            <Input
              placeholder="Enter attraction"
              value={newAttraction}
              onChange={(e) => setNewAttraction(e.target.value)}
            />
            <Button type="button" onClick={addAttraction}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {form.watch("nearbyAttractions")?.map((attraction, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-muted p-2 rounded"
              >
                {attraction}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    form.setValue(
                      "nearbyAttractions",
                      form
                        .getValues()
                        .nearbyAttractions!.filter((_, i) => i !== index)
                    )
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Landmarks</Label>
          <div className="mt-2 flex gap-2">
            <Input
              placeholder="Enter landmark"
              value={newLandmark}
              onChange={(e) => setNewLandmark(e.target.value)}
            />
            <Button type="button" onClick={addLandmark}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {form.watch("landmarks")?.map((landmark, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-muted p-2 rounded"
              >
                {landmark}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    form.setValue(
                      "landmarks",
                      form.getValues().landmarks!.filter((_, i) => i !== index)
                    )
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
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
