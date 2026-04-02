const express = require("express");
const router = express.Router();

const Itinerary = require("../models/Itinerary");
const Favorite = require("../models/Favorite");
const Preference = require("../models/Preference");
const authMiddleware = require("../middleware/authMiddleware");


// 🔥 INSIGHTS
router.get("/insights", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const trips = await Itinerary.find({ userId });
        const favorites = await Favorite.find({ userId });

        if (trips.length === 0) {
            return res.json({
                insights: ["You haven't started exploring yet. Plan your first trip ✈️"]
            });
        }

        let insights = [];

        // 🧠 1. Travel Frequency
        if (trips.length >= 5) {
            insights.push("You are a frequent traveler 🧳");
        } else if (trips.length >= 2) {
            insights.push("You are exploring steadily 🌍");
        }

        // 🧠 2. Destination Type
        const destinations = trips.map(t => t.destination);

        const beachPlaces = ["Goa", "Kerala"];
        const mountainPlaces = ["Manali", "Shimla"];

        const beachCount = destinations.filter(d => beachPlaces.includes(d)).length;
        const mountainCount = destinations.filter(d => mountainPlaces.includes(d)).length;

        if (beachCount > mountainCount) {
            insights.push("You prefer beach destinations 🌊");
        } else if (mountainCount > beachCount) {
            insights.push("You love mountains & nature ⛰️");
        }

        // 🧠 3. Duration Pattern (SAFE)
        const avgDays = trips.length > 0
            ? trips.reduce((sum, t) => sum + t.duration, 0) / trips.length
            : 0;

        if (avgDays <= 3) {
            insights.push("You prefer short getaways ⏳");
        } else if (avgDays > 5) {
            insights.push("You enjoy long immersive trips 🌄");
        }

        // 🧠 4. Favorites Behavior
        if (favorites.length > 5) {
            insights.push("You explore and save many places ❤️");
        }

        // 🧠 5. Most Visited Destination (SAFE)
        const freq = {};
        destinations.forEach(d => {
            freq[d] = (freq[d] || 0) + 1;
        });

        const topDestination =
            Object.keys(freq).length > 0
                ? Object.keys(freq).reduce((a, b) =>
                    freq[a] > freq[b] ? a : b
                )
                : "No trips yet";

        insights.push(`Your most visited destination is ${topDestination} 📍`);

        res.json({ insights });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔥 SUGGESTION
router.get("/suggest", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const trips = await Itinerary.find({ userId });

        if (trips.length === 0) {
            return res.json({
                suggestion: "Goa",
                reason: "Popular starting destination for travelers 🌴"
            });
        }

        const destinations = [
            { place: "Goa", type: "beach" },
            { place: "Kerala", type: "beach" },
            { place: "Manali", type: "mountain" },
            { place: "Shimla", type: "mountain" },
            { place: "Jaipur", type: "heritage" },
            { place: "Varanasi", type: "spiritual" }
        ];

        const visited = trips.map(t => t.destination);

        let typeCount = {
            beach: 0,
            mountain: 0,
            heritage: 0,
            spiritual: 0
        };

        destinations.forEach(dest => {
            if (visited.includes(dest.place)) {
                typeCount[dest.type]++;
            }
        });

        const preferredType = Object.keys(typeCount).reduce((a, b) =>
            typeCount[a] > typeCount[b] ? a : b
        );

        const suggestion = destinations.find(
            d => d.type === preferredType && !visited.includes(d.place)
        );

        let finalSuggestion = suggestion
            ? suggestion.place
            : destinations.find(d => !visited.includes(d.place))?.place || "Rishikesh";

        let reason = "";

        if (preferredType === "beach") {
            reason = "Based on your love for beach destinations 🌊";
        } else if (preferredType === "mountain") {
            reason = "You seem to enjoy mountain trips ⛰️";
        } else if (preferredType === "heritage") {
            reason = "You are interested in cultural experiences 🏛️";
        } else {
            reason = "A balanced recommendation based on your activity 📍";
        }

        res.json({
            suggestion: finalSuggestion,
            reason
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;