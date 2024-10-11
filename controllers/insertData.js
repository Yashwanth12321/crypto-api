import mongoose from "mongoose";
import Price from "../models/price.js";
import fetchData from "../services/fetchData.js";
import dotenv from "dotenv";
import cron from "node-cron";

dotenv.config();
// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e.message);
  }
};

const insertData = async () => {
  try {
    //Connect to MongoDB before performing any operations
    await connectDB();

    //Run the fetch and insert logic immediately
    const data = await fetchData();
    if (data) {
      //Insert the data into the Price collection
      await Price.insertMany(data);
      console.log("Data inserted successfully");
    }

    //Now schedule the cron job to run every 2 hours
    cron.schedule("0 */2 * * *", async () => {
      try {
        console.log("Scheduled task: Fetching and inserting data...");

        const scheduledData = await fetchData(); // Fetching data again
        if (scheduledData) {
          //Insert the data into the Price collection
          await Price.insertMany(scheduledData);
          console.log("Scheduled data inserted successfully");
        }
      } catch (e) {
        console.error("Scheduled task error:", e.message);
      }
    });
  } catch (e) {
    console.error("Error during initial insert:", e.message);
  }
};

export default insertData;
