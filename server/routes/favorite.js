const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const authMiddleware = require("../middleware/authMiddleware");


// ✅ ADD TO FAVORITES
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { place } = req.body;

        if (!place) {
            return res.status(400).json({ message: "Place is required" });
        }

        const alreadyExists = await Favorite.findOne({
            userId: req.user.id,
            place
        });

        if (alreadyExists) {
            return res.status(400).json({ message: "Already saved" });
        }

        const favorite = await Favorite.create({
            userId: req.user.id,
            place
        });

        res.status(201).json({
            message: "Added to favorites ❤️",
            data: favorite
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ GET ALL FAVORITES
router.get("/", authMiddleware, async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user.id });

        res.json({
            count: favorites.length,
            data: favorites
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ REMOVE FAVORITE (🔒 SECURE FIX)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deleted = await Favorite.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id   // 🔥 SECURITY FIX
        });

        if (!deleted) {
            return res.status(404).json({
                message: "Not found or unauthorized"
            });
        }

        res.json({
            message: "Removed from favorites ❌"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;