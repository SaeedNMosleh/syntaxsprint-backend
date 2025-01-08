/* This is the main file of the project.
Two API Endpoints are created in this file to load and save the data for leaderboard feature of SyntaxSprint 
*/

import express from 'express';

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory array to store leaderboard data
let leaderboardData = [
    {"name": "John", "score": 42},
    {"name": "Jane", "score": 35},
    {"name": "Jim", "score": 30},
    {"name": "Jill", "score": 25},
    {"name": "Jack", "score": 20},
];

// Function to get leaderboard data
const getLeaderboardData = () => {
    return leaderboardData;
};

// Function to save leaderboard data
const saveLeaderboardData = (data) => {
    leaderboardData = data;
};

app.get('/getleaderboard', (req, res) => {
    // Load the leaderboard data from the in-memory array
    const data = getLeaderboardData();
    res.json(data);
});

app.get('/', (req, res) => {
    
    res.send("SyntaxSprint Backend API is running successfully");
});

app.post('/saveleaderboard', (req, res) => {
    // Save the leaderboard data to the in-memory array
    const data = req.body;
    saveLeaderboardData(data);
    res.send('Leaderboard data saved successfully');
});

// Export the app for Vercel
export default app;