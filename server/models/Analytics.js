const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    totalTrips: Number,
    totalFavorites: Number,
    mostVisited: String,
    popularVibe: String,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Analytics", analyticsSchema);