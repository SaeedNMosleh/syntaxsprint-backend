import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;