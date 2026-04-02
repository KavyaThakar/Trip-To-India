const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const authMiddleware = require("../middleware/authMiddleware");


// ⭐ ADD REVIEW
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { place, rating, comment } = req.body;

        if (!place || !rating) {
            return res.status(400).json({ message: "Place & rating required" });
        }

        const review = await Review.create({
            userId: req.user.id,
            place,
            rating,
            comment
        });

        res.status(201).json({
            message: "Review added ⭐",
            data: review
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ⭐ GET REVIEWS OF A PLACE
router.get("/:place", async (req, res) => {
    try {
        const reviews = await Review.find({ place: req.params.place });

        const avgRating =
            reviews.reduce((sum, r) => sum + r.rating, 0) /
            (reviews.length || 1);

        res.json({
            totalReviews: reviews.length,
            averageRating: avgRating.toFixed(1),
            data: reviews
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;