const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tripType: {
        type: String,
        required: true,
        enum: ["Solo", "Couple", "Family", "Friends"]
    },
    people: {
        type: Number,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    vibe: [
        {
            type: String,
            enum: [
                "Heritage & Culture",
                "Mountains & Nature",
                "Beaches & Relax",
                "Spiritual / Pilgrim",
                "Adventure"
            ]
        }
    ],
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

module.exports = mongoose.model("Preference", preferenceSchema);