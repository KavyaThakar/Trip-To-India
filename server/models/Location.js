const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    state: String,
    city: String,

    places: [String],
    food: [String],
    shopping: [String],
    experiences: [String],
    hiddenGems: [String]
});

module.exports = mongoose.model("Location", locationSchema);