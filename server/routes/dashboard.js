const express = require("express");
const router = express.Router();
const Itinerary = require("../models/Itinerary");
const Favorite = require("../models/Favorite");
const authMiddleware = require("../middleware/authMiddleware");


// ✅ USER DASHBOARD
router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const trips = await Itinerary.find({ userId });
        const totalTrips = trips.length;
        const totalFavorites = await Favorite.countDocuments({ userId });

        const totalDays = trips.reduce((sum, t) => sum + t.duration, 0);

        const freq = {};
        trips.forEach(t => {
            freq[t.destination] = (freq[t.destination] || 0) + 1;
        });

        const favoriteDestination = Object.keys(freq).length > 0
            ? Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b)
            : null;

        const monthlyTrips = await Itinerary.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    trips: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const recentTrips = await Itinerary.find({ userId })
            .sort({ createdAt: -1 })
            .limit(3);

        res.json({
            success: true,
            totalTrips,
            totalFavorites,
            totalDays,
            favoriteDestination,
            recentTrips,
            monthlyTrips
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ REPLAN
router.post("/replan/:id", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const oldTrip = await Itinerary.findOne({
            _id: req.params.id,
            userId
        });

        if (!oldTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        let newPlan = oldTrip.plan.map(day => ({
            ...day,
            places: [...day.places].reverse(),
            food: [...day.food].reverse()
        }));

        const newTrip = await Itinerary.create({
            userId,
            destination: oldTrip.destination,
            duration: oldTrip.duration,
            plan: newPlan
        });

        res.json({
            success: true,
            message: "Trip replanned successfully 🔁",
            data: newTrip
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;