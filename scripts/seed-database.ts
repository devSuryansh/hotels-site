import { connectToDatabase } from "@/lib/mongodb";
import { hotels, bookings } from "@/lib/data";

async function seedDatabase() {
  try {
    const { db } = await connectToDatabase();

    // Clear existing data
    await db.collection("new-hotels").deleteMany({});
    await db.collection("new-booking").deleteMany({});

    // Insert hotels
    const hotelsWithTimestamps = hotels.map((hotel) => ({
      ...hotel,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await db.collection("new-hotels").insertMany(hotelsWithTimestamps);
    console.log(`✅ Inserted ${hotels.length} hotels`);

    // Insert bookings
    const bookingsWithTimestamps = bookings.map((booking) => ({
      ...booking,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await db.collection("new-booking").insertMany(bookingsWithTimestamps);
    console.log(`✅ Inserted ${bookings.length} bookings`);

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

seedDatabase();
