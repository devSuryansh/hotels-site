import { HotelForm } from "@/components/hotel-form"

export default function NewHotelPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Add New Hotel</h1>
      <HotelForm />
    </div>
  )
}

