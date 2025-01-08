/* This is the main file of the project.
Two API Endpoints are created in this file to load and save the data for leaderboard feature of SyntaxSprint 
*/

import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

const getLeaderboardData = () => {
    // Load the leaderboard data from the json file and return it
    const data = fs.readFileSync('leaderBoardlist.json', 'utf8');
    return JSON.parse(data);
};

const saveLeaderboardData = (leaderboardData) => {
    // Save the leaderboard data to the json file
    fs.writeFileSync('leaderBoardlist.json', JSON.stringify(leaderboardData));
}

app.get('/getleaderboard', (req, res) => {
    // Load the leaderboard data from the json file
    const leaderboardData = getLeaderboardData();
    res.json(leaderboardData);
  });

app.post('/saveleaderboard', (req, res) => {
    // Save the leaderboard data to the json file
    const leaderboardData = req.body;
    saveLeaderboardData(leaderboardData);
    res.send('Leaderboard data saved successfully');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })

  export default app;