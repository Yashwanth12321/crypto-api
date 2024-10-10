import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Price = mongoose.model("Price", PriceSchema);
export default Price;
