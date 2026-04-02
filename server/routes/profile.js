const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Favorite = require("../models/Favorite");
const Itinerary = require("../models/Itinerary");

const authMiddleware = require("../middleware/authMiddleware");


// ✅ GET USER PROFILE DASHBOARD
router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");

        const favoritesCount = await Favorite.countDocuments({ userId });
        const tripsCount = await Itinerary.countDocuments({ userId });

        res.json({
            user,
            stats: {
                favorites: favoritesCount,
                trips: tripsCount
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ UPDATE PROFILE
router.put("/", authMiddleware, async (req, res) => {
    try {
        const { name, bio, profilePic } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, bio, profilePic },
            { new: true }
        ).select("-password");

        res.json({
            message: "Profile updated ✅",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;