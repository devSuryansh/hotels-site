import { BookingsTable } from "@/components/bookings-table"

export default function BookingsPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Booking Requests</h1>
      <BookingsTable />
    </div>
  )
}

