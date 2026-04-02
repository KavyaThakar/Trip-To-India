const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    // ⭐ PROFILE DATA
    bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    },

    // optional saved preference snapshot
    lastTripPreference: {
        tripType: String,
        people: Number,
        budget: Number,
        vibe: [String]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);