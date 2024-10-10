import mongoose from "mongoose";
import Price from "../models/price.js";
import fetchData from "../services/fetchData.js";
import dotenv from "dotenv";
import cron from "node-cron";

dotenv.config();
// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e.message);
  }
};

const insertData = async () => {
  // cron scheduler to run every 2 hours
  cron.schedule("0 */2 * * *", async () => {
    try {
      // Connect to MongoDB before performing any operations
      await connectDB();

      const data = await fetchData(); // Fetching data
      if (data) {
        // Insert the data into the Price collection
        await Price.insertMany(data);
        console.log("Data inserted successfully");
      }
    } catch (e) {
      console.error("Error inserting data:", e.message);
    }
  });
};

export default insertData;
