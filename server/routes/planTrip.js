const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const Preference = require("../models/Preference");
const Recommendation = require("../models/Recommendation");
const Itinerary = require("../models/Itinerary");

// sample places
const places = [
    {
        name: "Manali",
        vibe: ["Mountains & Nature", "Adventure"],
        type: ["Friends", "Couple"],
        budget: "medium"
    },
    {
        name: "Goa",
        vibe: ["Beaches & Relax", "Adventure"],
        type: ["Friends", "Couple"],
        budget: "medium"
    },
    {
        name: "Jaipur",
        vibe: ["Heritage & Culture"],
        type: ["Family"],
        budget: "low"
    },
    {
        name: "Kerala",
        vibe: ["Beaches & Relax"],
        type: ["Couple", "Family"],
        budget: "high"
    }
];

router.post("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { tripType, people, budget, vibe, duration } = req.body;

        if (!tripType || !people || !budget || !vibe || !duration) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // ✅ 1. SAVE PREFERENCES
        const pref = await Preference.create({
            userId,
            tripType,
            people,
            budget,
            vibe
        });

        // ✅ 2. GENERATE RECOMMENDATIONS
        let scored = places.map(place => {
            let score = 0;

            vibe.forEach(v => {
                if (place.vibe.includes(v)) score += 3;
            });

            if (place.type.includes(tripType)) score += 2;

            if (budget < 50000 && place.budget === "low") score += 2;
            else if (budget < 150000 && place.budget === "medium") score += 2;
            else if (budget >= 150000 && place.budget === "high") score += 2;

            return { place: place.name, score };
        });

        scored.sort((a, b) => b.score - a.score);
        const topRecommendations = scored.slice(0, 3);

        // ✅ SAVE RECOMMENDATIONS
        const rec = await Recommendation.create({
            userId,
            tripType,
            people,
            budget,
            vibe,
            recommendations: topRecommendations
        });

        // ✅ 3. GENERATE ITINERARY
        const destination = topRecommendations[0].place;

        let plan = [];

        for (let i = 1; i <= duration; i++) {
            plan.push({
                day: i,
                title: i === 1 ? "Arrival" : i === duration ? "Departure" : "Explore",
                places: ["Explore " + destination],   // 🔥 FIXED
                food: ["Local Food"],
                hotel: "Recommended Hotel"
            });
        }

        const itinerary = await Itinerary.create({
            userId,
            destination,
            duration,
            plan
        });

        res.json({
            success: true,
            preferences: pref,
            recommendations: rec,
            itinerary
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; 