// backend/server.js
const express = require('express');
const cors = require('cors');  // Make sure this line is included
const app = express();
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const port = 5001;

dotenv.config(); // Load environment variables

// Enable CORS for all origins (or configure for specific origins)
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only the frontend origin
  methods: ['GET', 'POST', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type'] // Allow necessary headers
}));


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Middleware to parse JSON bodies
app.use(express.json());

// Mock drone data
const droneData = [
  {
  "image_id": "001",
  "timestamp": "2024-09-24 14:31:05",
  "latitude": "44.4280° N",
  "longitude": "110.5885° W",
  "altitude_m": 50,
  "heading_deg": 270,
  "file_name": "YNP_001.jpg",
  "camera_tilt_deg": -15,
  "focal_length_mm": 24,
  "iso": 100,
  "shutter_speed": "1/500",
  "aperture": "f/2.8",
  "color_temp_k": 5600,
  "image_format": "RAW+JPEG",
  "file_size_mb": 25.4,
  "drone_speed_mps": 5.2,
  "battery_level_pct": 98,
  "gps_accuracy_m": 0.5,
  "gimbal_mode": "Follow",
  "subject_detection": "Yes",
  "image_tags": ["Geyser", "Steam"]
  },
  {
  "image_id": "002",
  "timestamp": "2024-09-24 14:33:22",
  "latitude": "44.4279° N",
  "longitude": "110.5890° W",
  "altitude_m": 75,
  "heading_deg": 180,
  "file_name": "YNP_002.jpg",
  "camera_tilt_deg": -30,
  "focal_length_mm": 35,
  "iso": 200,
  "shutter_speed": "1/1000",
  "aperture": "f/4",
  "color_temp_k": 5200,
  
  "image_format": "RAW+JPEG",
  "file_size_mb": 27.1,
  "drone_speed_mps": 3.8,
  "battery_level_pct": 95,
  "gps_accuracy_m": 0.6,
  "gimbal_mode": "Free",
  "subject_detection": "No",
  "image_tags": ["Forest", "River"]
  },
  {
  "image_id": "003",
  "timestamp": "2024-09-24 14:36:47",
  "latitude": "44.4275° N",
  "longitude": "110.5888° W",
  "altitude_m": 100,
  "heading_deg": 90,
  "file_name": "YNP_003.jpg",
  "camera_tilt_deg": 0,
  "focal_length_mm": 50,
  "iso": 400,
  "shutter_speed": "1/2000",
  "aperture": "f/5.6",
  "color_temp_k": 5800,
  "image_format": "RAW+JPEG",
  "file_size_mb": 26.8,
  "drone_speed_mps": 2.5,
  "battery_level_pct": 91,
  "gps_accuracy_m": 0.4,
  "gimbal_mode": "Tripod",
  "subject_detection": "Yes",
  "image_tags": ["Wildlife", "Elk"]
  },
  {
  "image_id": "004",
  "timestamp": "2024-09-24 14:40:13",
  "latitude": "44.4277° N",
  "longitude": "110.5882° W",
  "altitude_m": 120,
  "heading_deg": 0,
  "file_name": "YNP_004.jpg",
  "camera_tilt_deg": -45,
  "focal_length_mm": 70,
  "iso": 800,
  "shutter_speed": "1/4000",
  
  "aperture": "f/8",
  "color_temp_k": 6000,
  "image_format": "RAW+JPEG",
  "file_size_mb": 28.3,
  "drone_speed_mps": 1.2,
  "battery_level_pct": 87,
  "gps_accuracy_m": 0.7,
  "gimbal_mode": "Follow",
  "subject_detection": "No",
  "image_tags": ["Canyon", "Waterfall"]
  },
  {
  "image_id": "005",
  "timestamp": "2024-09-24 14:44:56",
  "latitude": "44.4282° N",
  "longitude": "110.5879° W",
  "altitude_m": 80,
  "heading_deg": 315,
  "file_name": "YNP_005.jpg",
  "camera_tilt_deg": -10,
  "focal_length_mm": 24,
  "iso": 100,
  "shutter_speed": "1/250",
  "aperture": "f/2.8",
  "color_temp_k": 5400,
  "image_format": "RAW+JPEG",
  "file_size_mb": 24.9,
  "drone_speed_mps": 6.7,
  "battery_level_pct": 82,
  "gps_accuracy_m": 0.5,
  "gimbal_mode": "Free",
  "subject_detection": "Yes",
  "image_tags": ["Thermal Pool", "Bacteria"]
  }
  ];


// Endpoint to handle user queries
app.post('/api/query', async (req, res) => {
  const { query } = req.body;
  console.log(`THis is a query ${query}`);


  // test
  

  const query_prompt = `
  You are provided with javascript object data in JSON format. Interpret the following natural language query and return the item from the data :

  Javascript object: ${JSON.stringify(droneData[0], null, 2)}

  Query: "${query}"

  Provide only the JavaScript object with explanations.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = query_prompt;
    const result = await model.generateContent(prompt); //sending prompt
    const response = result.response; //response from model
    console.log(`Response without text ${response}`);
    
    console.log(`Response test ${response.text()}`);
    res.json({ response: response.text() });
    
  } catch (error) {
    console.error('Error processing query:', error);
    throw new Error('Failed to process query');
  }
  // let response = "Sorry, I couldn’t understand your query.";

  // if (query.toLowerCase().includes("altitude")) {
  //   const imageIndex = parseInt(query.match(/\d+/)[0]) - 1;  // Extract number (e.g., 2 from "second image")
  //   if (imageIndex >= 0 && imageIndex < droneData.length) {
  //     response = `The altitude of image ${droneData[imageIndex].image_id} is ${droneData[imageIndex].altitude_m} meters.`;
  //   }
  // } else if (query.toLowerCase().includes("battery")) {
  //   response = `The battery level of the last image is ${droneData[droneData.length - 1].battery_level_pct}%`;
  // }

  // res.json({ response });
});

// Start the backend server
app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});

