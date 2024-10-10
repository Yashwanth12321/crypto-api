import mongoose from 'mongoose';
import Price from './price.js';
import fetchData from './fetchData.js';
import dotenv from 'dotenv';

dotenv.config();
// MongoDB connection URI (you should use your actual connection string here)
// const uri = "mongodb+srv://yashwanthnapa:Qgx272y3yXGH8DG7@koinx.lcjz7.mongodb.net/koinX?retryWrites=true&w=majority";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e.message);
  }
};

const insertData = async () => {
  try {
    // Connect to MongoDB before performing any operations
    await connectDB();

    const data = await fetchData();  // Fetching data from some API
    if (data) {
      // Insert the data into the Price collection
      await Price.insertMany(data);
      console.log("Data inserted successfully");
    }
  } catch (e) {
    console.error("Error inserting data:", e.message);
  } 
    
};

export default insertData;
