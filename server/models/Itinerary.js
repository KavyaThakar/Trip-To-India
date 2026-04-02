const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    destination: String,
    duration: Number,
    plan: [
        {
            day: Number,
            title: String,
            places: [String],
            hotel: String,
            food: [String]
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Itinerary", itinerarySchema);