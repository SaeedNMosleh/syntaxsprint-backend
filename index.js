/* This is the main file of the project.
Two API Endpoints are created in this file to load and save the data for leaderboard feature of SyntaxSprint 
*/

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Leaderboard from './models/Leaderboard.js';

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI.replace('<db_password>', process.env.DB_PASSWORD);
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Function to get leaderboard data
const getLeaderboardData = async () => {
    return await Leaderboard.find().sort({ score: -1 });
};

// Function to save leaderboard data
const saveLeaderboardData = async (data) => {
    // Clear existing records
    await Leaderboard.deleteMany({});
    // Insert new records
    await Leaderboard.insertMany(data);
};

app.get('/getleaderboard', async (req, res) => {
    try {
        // Load the leaderboard data from MongoDB
        const data = await getLeaderboardData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching leaderboard data' });
    }
});

app.get('/', (req, res) => {
    res.send("SyntaxSprint Backend API is running successfully");
});

app.post('/saveleaderboard', async (req, res) => {
    try {
        // Save the leaderboard data to MongoDB
        const data = req.body;
        await saveLeaderboardData(data);
        res.send('Leaderboard data saved successfully');
    } catch (error) {
        res.status(500).json({ error: 'Error saving leaderboard data' });
    }
});

// Export the app for Vercel
export default app;