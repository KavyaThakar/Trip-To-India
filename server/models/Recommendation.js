const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
    tripType: String,
    people: Number,
    budget: Number,
    vibe: [String],

    // ✅ STORE PLACE + SCORE
    recommendations: [
        {
            place: String,
            score: Number
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Recommendation", recommendationSchema);