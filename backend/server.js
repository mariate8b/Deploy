// backend/server.js
const express = require('express');
const cors = require('cors');  // Make sure this line is included
const app = express();
const port = 5001;

// Enable CORS for all origins (or configure for specific origins)
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only the frontend origin
  methods: ['GET', 'POST', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type'] // Allow necessary headers
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Mock drone data
const droneData = [
  {
    "image_id": "001",
    "timestamp": "2024-09-24 14:31:05",
    "altitude_m": 50,
    "battery_level_pct": 98,
    "image_tags": ["Geyser", "Steam"]
  },
  {
    "image_id": "002",
    "timestamp": "2024-09-24 14:33:22",
    "altitude_m": 75,
    "battery_level_pct": 95,
    "image_tags": ["Forest", "River"]
  },
  // Add more mock drone data here...
];

// Endpoint to handle user queries
app.post('/api/query', (req, res) => {
  const { query } = req.body;

  let response = "Sorry, I couldn’t understand your query.";

  if (query.toLowerCase().includes("altitude")) {
    const imageIndex = parseInt(query.match(/\d+/)[0]) - 1;  // Extract number (e.g., 2 from "second image")
    if (imageIndex >= 0 && imageIndex < droneData.length) {
      response = `The altitude of image ${droneData[imageIndex].image_id} is ${droneData[imageIndex].altitude_m} meters.`;
    }
  } else if (query.toLowerCase().includes("battery")) {
    response = `The battery level of the last image is ${droneData[droneData.length - 1].battery_level_pct}%`;
  }

  res.json({ response });
});

// Start the backend server
app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});

