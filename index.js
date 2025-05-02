// index.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));