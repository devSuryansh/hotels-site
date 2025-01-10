import mongoose from "mongoose"; // Importing mongoose for MongoDB interaction

// Function to establish a connection to the MongoDB database
const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "ayodhya", // Specify the database name
    })
    .then(() => {
      console.log("Connected to MongoDB"); // Log success message on successful connection
    })
    .catch((error) => {
      console.log(error); // Log any errors that occur during connection
    });
};

export default dbConnection; // Export the database connection function
