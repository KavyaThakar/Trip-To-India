const express = require("express");
const router = express.Router();
const Preference = require("../models/Preference");
const Itinerary = require("../models/Itinerary");
const Location = require("../models/Location");
const authMiddleware = require("../middleware/authMiddleware");

console.log("🔥 recommendation route loaded");

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { tripType, people, budget, vibe, duration } = req.body;
        const userId = req.user.id;

        // validation
        if (!tripType || !people || !budget || !vibe || !duration) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // 🧠 DESTINATION DATASET
        const destinations = [
            {
                place: "Goa",
                vibes: ["Beaches & Relax"],
                minBudget: 20000,
                maxBudget: 150000,
                suitableFor: ["Couple", "Friends"]
            },
            {
                place: "Manali",
                vibes: ["Mountains & Nature", "Adventure"],
                minBudget: 15000,
                maxBudget: 100000,
                suitableFor: ["Friends", "Family"]
            },
            {
                place: "Jaipur",
                vibes: ["Heritage & Culture"],
                minBudget: 10000,
                maxBudget: 80000,
                suitableFor: ["Family", "Couple"]
            },
            {
                place: "Rishikesh",
                vibes: ["Adventure", "Spiritual / Pilgrim"],
                minBudget: 8000,
                maxBudget: 60000,
                suitableFor: ["Solo", "Friends"]
            },
            {
                place: "Kerala",
                vibes: ["Beaches & Relax", "Mountains & Nature"],
                minBudget: 20000,
                maxBudget: 120000,
                suitableFor: ["Family", "Couple"]
            }
        ];

        // 🧠 SCORING LOGIC
        let scoredResults = destinations.map(dest => {
            let score = 0;

            vibe.forEach(v => {
                if (dest.vibes.includes(v)) score += 5;
            });

            if (budget >= dest.minBudget && budget <= dest.maxBudget) {
                score += 3;
            }

            if (dest.suitableFor.includes(tripType)) {
                score += 2;
            }

            if (people >= 4 && dest.suitableFor.includes("Family")) {
                score += 1;
            }

            return {
                place: dest.place,
                score
            };
        });

        // sort + pick top 3
        scoredResults.sort((a, b) => b.score - a.score);
        const topRecommendations = scoredResults.slice(0, 3);

        // ✅ SAVE PREFERENCES (🔥 FIXED WITH userId)
        const savedPreference = await Preference.create({
            userId,
            tripType,
            people,
            budget,
            vibe,
            recommendations: topRecommendations
        });

        // 🔥 SELECT TOP DESTINATION
        const selectedCity = topRecommendations[0].place;

        // 🔥 FETCH LOCATION DATA
        const location = await Location.findOne({ city: selectedCity });

        let plan = [];

        if (location) {
            const places = location.places || [];
            const food = location.food || [];

            for (let i = 1; i <= duration; i++) {
                plan.push({
                    day: i,
                    title:
                        i === 1
                            ? "Arrival & Exploration"
                            : i === duration
                                ? "Departure Day"
                                : "City Exploration",
                    places: [
                        places.length > 0
                            ? places[(i - 1) % places.length]
                            : "Explore"
                    ],
                    hotel: "Recommended Hotel",
                    food: [
                        food.length > 0
                            ? food[(i - 1) % food.length]
                            : "Local Food"
                    ]
                });
            }
        }

        // ✅ AUTO CREATE ITINERARY
        const itinerary = await Itinerary.create({
            userId,
            destination: selectedCity,
            duration,
            plan
        });

        res.json({
            success: true,
            message: "AI Trip Generated Fully 🚀",
            preference: savedPreference,
            recommendation: topRecommendations,
            itinerary
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;