import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentBookings } from "@/components/recent-bookings"
import { HotelsList } from "@/components/hotels-list"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardStats />

      <Tabs defaultValue="bookings" className="w-full">
        <TabsList>
          <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Booking Requests</CardTitle>
              <CardDescription>Manage and approve recent booking requests</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentBookings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="hotels" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Hotels</CardTitle>
              <CardDescription>Manage your hotel properties</CardDescription>
            </CardHeader>
            <CardContent>
              <HotelsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

