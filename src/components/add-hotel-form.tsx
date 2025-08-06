"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { X, Plus, Upload, Trash2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { authenticatedFetch } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const roomSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  amenities: z.array(z.string()),
  price: z.coerce.number().min(0, "Price must be positive"),
});

const addonSchema = z.object({
  name: z.string().min(1, "Add-on name is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
});

const metaTagsSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(60, "Title should be under 60 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(160, "Description should be under 160 characters"),
  keywords: z.string().min(1, "Keywords are required"),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
});

const hotelFormSchema = z.object({
  name: z.string().min(2, "Hotel name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only"
    ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  longDescription: z
    .string()
    .min(50, "Long description must be at least 50 characters"),
  location: z.string().min(5, "Location must be at least 5 characters"),
  policies: z.string().min(10, "Policies must be at least 10 characters"),
  priceRange: z
    .object({
      min: z.coerce.number().min(0, "Minimum price must be positive"),
      max: z.coerce.number().min(0, "Maximum price must be positive"),
    })
    .refine((data) => data.max >= data.min, {
      message: "Maximum price must be greater than or equal to minimum price",
      path: ["max"],
    }),
  features: z.array(z.string()),
  nearbyAttractions: z.array(z.string()),
  landmarks: z.array(z.string()),
  rooms: z.array(roomSchema),
  addons: z.array(addonSchema),
  metaTags: metaTagsSchema.optional(),
});

type HotelFormValues = z.infer<typeof hotelFormSchema>;

interface AddHotelFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onHotelAdded: () => void;
}

// Image upload component
function ImageUpload({
  images,
  onImagesChange,
}: {
  images: string[];
  onImagesChange: (images: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        throw new Error("Please select a valid image file");
      }

      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        throw new Error("File size must be less than 10MB");
      }

      // Get authentication parameters
      const authResponse = await fetch("/api/imagekit/auth");
      if (!authResponse.ok) {
        throw new Error("Failed to get authentication parameters");
      }
      const authData = await authResponse.json();

      // Create FormData for upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", `hotel-${Date.now()}-${file.name}`);
      formData.append("folder", "/hotels");
      formData.append("token", authData.token);
      formData.append("expire", authData.expire.toString());
      formData.append("signature", authData.signature);
      formData.append(
        "publicKey",
        process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ""
      );
      formData.append(
        "urlEndpoint",
        process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""
      );

      // Upload to ImageKit (correct upload endpoint)
      const uploadResponse = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (uploadResponse.ok && uploadData.url) {
        onImagesChange([...images, uploadData.url]);
        toast({
          title: "Image uploaded successfully",
          description: "Your image has been uploaded and added to the hotel.",
        });
      } else {
        throw new Error(
          uploadData.message || uploadData.error?.message || "Upload failed"
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
      // Reset the input value to allow selecting the same file again
      event.target.value = "";
    }
  };

  const triggerFileInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        uploadImage(file);
      }
    };
    input.click();
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="flex-1"
          style={{ display: "none" }}
          id="hotel-image-upload"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={triggerFileInput}
          className="flex-1"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Hotel image ${index + 1}`}
                className="w-full h-24 object-cover rounded border"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// String array input component
function StringArrayInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
        />
        <Button type="button" onClick={addItem} size="sm" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {value.map((item, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {item}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => removeItem(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export function AddHotelForm({
  open,
  onOpenChange,
  onHotelAdded,
}: AddHotelFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedMetaTags, setGeneratedMetaTags] = useState<any>(null);
  const [isGeneratingMetaTags, setIsGeneratingMetaTags] = useState(false);

  const form = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      longDescription: "",
      location: "",
      policies: "",
      priceRange: { min: 0, max: 0 },
      features: [],
      nearbyAttractions: [],
      landmarks: [],
      rooms: [],
      addons: [],
      metaTags: {
        title: "",
        description: "",
        keywords: "",
        ogTitle: "",
        ogDescription: "",
      },
    },
  });

  const {
    fields: roomFields,
    append: appendRoom,
    remove: removeRoom,
  } = useFieldArray({
    control: form.control,
    name: "rooms",
  });

  const {
    fields: addonFields,
    append: appendAddon,
    remove: removeAddon,
  } = useFieldArray({
    control: form.control,
    name: "addons",
  });

  // Generate meta tags using AI
  const generateMetaTags = async () => {
    setIsGeneratingMetaTags(true);
    try {
      const formData = form.getValues();

      if (!formData.name || !formData.description || !formData.location) {
        toast({
          title: "Missing Information",
          description:
            "Please fill in hotel name, description, and location first.",
          variant: "destructive",
        });
        return;
      }

      const response = await authenticatedFetch(
        "/api/hotels/generate-meta-tags",
        {
          method: "POST",
          body: JSON.stringify({
            hotelName: formData.name,
            hotelDescription: formData.description,
            hotelLocation: formData.location,
            hotelFeatures: formData.features,
            nearbyAttractions: formData.nearbyAttractions,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate meta tags");
      }

      const metaTags = await response.json();

      // Set the generated meta tags in the form
      form.setValue("metaTags.title", metaTags.title);
      form.setValue("metaTags.description", metaTags.description);
      form.setValue("metaTags.keywords", metaTags.keywords);
      form.setValue("metaTags.ogTitle", metaTags.ogTitle);
      form.setValue("metaTags.ogDescription", metaTags.ogDescription);

      setGeneratedMetaTags(metaTags);

      toast({
        title: "Meta Tags Generated!",
        description:
          "AI has generated SEO meta tags. You can edit them if needed.",
      });
    } catch (error) {
      console.error("Error generating meta tags:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate meta tags. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingMetaTags(false);
    }
  };

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const onSubmit = async (data: HotelFormValues) => {
    setIsSubmitting(true);
    try {
      const hotelData = {
        ...data,
        images,
        priceRange: [data.priceRange.min, data.priceRange.max],
        metaTags: data.metaTags || null,
      };

      const response = await authenticatedFetch("/api/hotels/create", {
        method: "POST",
        body: JSON.stringify(hotelData),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Hotel created successfully!",
          description: "The hotel has been added with custom meta tags.",
        });
        form.reset();
        setImages([]);
        setGeneratedMetaTags(null);
        onHotelAdded();
        onOpenChange(false);
      } else {
        throw new Error(result.error || "Failed to create hotel");
      }
    } catch (error) {
      console.error("Error creating hotel:", error);
      toast({
        title: "Error creating hotel",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Add New Hotel</SheetTitle>
          <SheetDescription>
            Create a new hotel listing with AI-generated meta tags and ImageKit
            integration.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pr-4"
            >
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hotel Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              if (!form.getValues("slug")) {
                                form.setValue(
                                  "slug",
                                  generateSlug(e.target.value)
                                );
                              }
                            }}
                          />
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
                        <FormLabel>URL Slug</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Used in the URL (e.g., /hotels/your-slug)
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
                          <Input
                            {...field}
                            placeholder="e.g., Near Seven Sisters Falls, Cherrapunji"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Brief description for cards and previews"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="longDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Long Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Detailed description for the hotel page"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUpload images={images} onImagesChange={setImages} />
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="priceRange.min"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Price (Rs. )</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="priceRange.max"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Price (Rs. )</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Features and Attractions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Features & Attractions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Features</FormLabel>
                        <FormControl>
                          <StringArrayInput
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="e.g., Wi-Fi, Swimming Pool, Parking"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nearbyAttractions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nearby Attractions</FormLabel>
                        <FormControl>
                          <StringArrayInput
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="e.g., Nohkalikai Falls, Mawsmai Cave"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="landmarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Landmarks</FormLabel>
                        <FormControl>
                          <StringArrayInput
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="e.g., Seven Sisters Falls, Thangkharang Park"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Rooms */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Rooms
                    <Button
                      type="button"
                      onClick={() =>
                        appendRoom({ name: "", amenities: [], price: 0 })
                      }
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Room
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {roomFields.map((room, index) => (
                    <div
                      key={room.id}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Room {index + 1}</h4>
                        <Button
                          type="button"
                          onClick={() => removeRoom(index)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`rooms.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Room Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="e.g., Deluxe Room"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`rooms.${index}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price per Night (Rs. )</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`rooms.${index}.amenities`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amenities</FormLabel>
                            <FormControl>
                              <StringArrayInput
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="e.g., King Bed, Valley View, Wi-Fi"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Add-ons */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Add-ons
                    <Button
                      type="button"
                      onClick={() => appendAddon({ name: "", price: 0 })}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Add-on
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addonFields.map((addon, index) => (
                    <div
                      key={addon.id}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Add-on {index + 1}</h4>
                        <Button
                          type="button"
                          onClick={() => removeAddon(index)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`addons.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Add-on Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="e.g., Breakfast Buffet"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`addons.${index}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price (Rs. )</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Policies */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Policies</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="policies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hotel Policies</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Check-in/check-out times, cancellation policy, pet policy, etc."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Meta Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    SEO Meta Tags
                    <Button
                      type="button"
                      onClick={generateMetaTags}
                      size="sm"
                      variant="outline"
                      disabled={isGeneratingMetaTags}
                    >
                      {isGeneratingMetaTags ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="metaTags.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Meta Title{" "}
                          <span className="text-xs text-muted-foreground">
                            (50-60 characters)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Luxury Hotel in Cherrapunji - Mountain Views & Modern Amenities"
                            maxLength={60}
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value?.length || 0}/60 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaTags.description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Meta Description{" "}
                          <span className="text-xs text-muted-foreground">
                            (150-160 characters)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="e.g., Experience luxury accommodation in Cherrapunji with stunning mountain views, modern amenities, and easy access to waterfalls and attractions."
                            maxLength={160}
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value?.length || 0}/160 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaTags.keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keywords</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="e.g., Cherrapunji hotel, luxury accommodation, mountain view hotel, waterfall tours, Meghalaya tourism"
                            rows={2}
                          />
                        </FormControl>
                        <FormDescription>
                          Comma-separated keywords for SEO
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium text-sm text-muted-foreground">
                      Open Graph (Social Media)
                    </h4>

                    <FormField
                      control={form.control}
                      name="metaTags.ogTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OG Title (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Title for social media sharing"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="metaTags.ogDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OG Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Description for social media sharing"
                              rows={2}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Generated Meta Tags Display */}
              {generatedMetaTags && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">
                      AI Generated Meta Tags Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <strong>Title:</strong> {generatedMetaTags.title}
                    </div>
                    <div>
                      <strong>Description:</strong>{" "}
                      {generatedMetaTags.description}
                    </div>
                    <div>
                      <strong>Keywords:</strong> {generatedMetaTags.keywords}
                    </div>
                    {generatedMetaTags.ogTitle && (
                      <div>
                        <strong>OG Title:</strong> {generatedMetaTags.ogTitle}
                      </div>
                    )}
                    {generatedMetaTags.ogDescription && (
                      <div>
                        <strong>OG Description:</strong>{" "}
                        {generatedMetaTags.ogDescription}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <Separator />

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Hotel"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
