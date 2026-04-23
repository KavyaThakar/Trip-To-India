const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    state: String,
    city: String,
    
    // Detailed categorization for product-level itineraries
    places: [{
        name: String,
        category: [String], // ['Heritage', 'Nature', 'Fun', 'Shopping', 'Spiritual', 'Architecture']
        suitableFor: [String], // ['Family', 'Solo', 'Couple', 'Friends']
        bestTimeOfDay: { type: String, enum: ['Morning', 'Afternoon', 'Evening', 'All'] },
        description: String
    }],
    
    foodJoints: [{
        name: String,
        specialty: String,
        type: { type: String, enum: ['Street Food', 'Restaurant', 'Cafe', 'Traditional'] }
    }],
    
    shoppingSpots: [{
        name: String,
        specialty: String
    }],
    
    cityTips: [{
        season: { type: String, enum: ['Summer', 'Winter', 'Monsoon', 'Peak', 'All'] },
        text: String
    }]
});

module.exports = mongoose.model("Location", locationSchema);