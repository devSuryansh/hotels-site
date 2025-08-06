"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, PlusCircle, Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Hotel } from "@/types";
import { AddHotelForm } from "@/components/add-hotel-form";
import { EditHotelForm } from "@/components/edit-hotel-form";
import { toast } from "@/hooks/use-toast";

export default function ManageHotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deletingHotel, setDeletingHotel] = useState<Hotel | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleHotelAdded = () => {
    // Refetch hotels after adding a new one
    fetchHotels();
  };

  const handleHotelUpdated = () => {
    // Refetch hotels after updating one
    fetchHotels();
  };

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/hotels");
      const data = await response.json();
      setHotels(data.hotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      toast({
        title: "Error",
        description: "Failed to fetch hotels. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditHotel = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setShowEditForm(true);
  };

  const handleDeleteHotel = async () => {
    if (!deletingHotel) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/hotels/${deletingHotel.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Hotel deleted",
          description: "The hotel has been successfully deleted.",
        });
        fetchHotels(); // Refresh the list
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete hotel");
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to delete hotel. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeletingHotel(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hotels</CardTitle>
          <CardDescription>Loading hotel data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hotels</CardTitle>
              <CardDescription>
                Manage your hotels and view their details.
              </CardDescription>
            </div>
            <Button
              size="sm"
              className="gap-1"
              onClick={() => setShowAddForm(true)}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Hotel
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="hidden md:table-cell">
                  Price Range
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hotels.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={hotel.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={hotel.images[0] || "https://placehold.co/64x64.png"}
                      width="64"
                      data-ai-hint="hotel building"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{hotel.name}</TableCell>
                  <TableCell>{hotel.location}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    Rs. {hotel.priceRange[0].toLocaleString()} - Rs.
                    {hotel.priceRange[1].toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleEditHotel(hotel)}
                          className="cursor-pointer"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeletingHotel(hotel)}
                          className="cursor-pointer text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddHotelForm
        open={showAddForm}
        onOpenChange={setShowAddForm}
        onHotelAdded={handleHotelAdded}
      />

      <EditHotelForm
        hotel={editingHotel}
        open={showEditForm}
        onOpenChange={(open) => {
          setShowEditForm(open);
          if (!open) {
            setEditingHotel(null);
          }
        }}
        onHotelUpdated={handleHotelUpdated}
      />

      <AlertDialog
        open={!!deletingHotel}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingHotel(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              hotel "{deletingHotel?.name}" and remove all associated data from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteHotel}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
