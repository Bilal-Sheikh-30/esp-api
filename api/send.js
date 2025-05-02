// api/send.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const sensorSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  timestamp: { type: Date, default: Date.now }
});

const Sensor = mongoose.model("Sensor", sensorSchema);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Save the sensor data
      const sensorData = new Sensor(req.body);
      await sensorData.save();
      res.status(200).send("Data saved");
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  } else {
    // Handle method not allowed
    res.status(405).send("Method Not Allowed");
  }
}
