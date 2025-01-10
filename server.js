import express from "express";
// import cors from "cors";
import insertData from "./controllers/insertData.js";
import Price from "./models/price.js";
const app = express();

// app.use(cors());

const PORT = 5000;

//insert data
await insertData();
//caculate standard deviation
const calculateStandardDeviation = (prices) => {
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const variance =
    prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
  return Math.sqrt(variance);
};


//Get the standard deviation of the last <=100 prices for a cryptocurrency
app.get("/stats", async (req, res) => {
  const { coin } = req.query;
  if (!coin) {
    return res.status(400).json({
      error: "Please provide a cryptocurrency name (e.g., ?coin=Bitcoin)",
    });
  }

  try {
    //Find the latest entry for the requested cryptocurrency
    const latestData = await Price.findOne({ name: coin }).sort({
      Timestamp: -1,
    }); //Sort in descending order of Timestamp

    if (!latestData) {
      return res.status(404).json({ error: `No data found for ${coin}` });
    }
    //Extract required data
    const required_data = {
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    };
    res.json(required_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Could not retrieve data." });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//standard-devialtion endpoint
app.get("/deviation", async (req, res) => {
  const { coin } = req.query;
  if (!coin) {
    return res.status(400).json({
      error: "Please provide a cryptocurrency name (e.g., ?crypto=Bitcoin)",
    });
  }
  try {
    const records = await Price.find({ name: coin })
      .sort({ Timestamp: -1 })
      .limit(100)
      .exec();
      
    if (!records || records.length === 0) {
      return res.status(404).json({ error: `No data found for ${coin}` });
    }

    const prices = records.map((record) => record.price);
    const stdDev = calculateStandardDeviation(prices);

    res.json({
      deviation: stdDev,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Could not retrieve data." });
  }
});
