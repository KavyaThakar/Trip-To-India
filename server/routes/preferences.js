const express = require("express");
const router = express.Router();
const Preference = require("../models/Preference");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ SAVE FULL QUESTIONNAIRE (PROTECTED + USER LINKED)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { tripType, people, budget, vibe } = req.body;

        // validation
        if (!tripType || !people || !budget || !vibe) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newPreference = await Preference.create({
            userId: req.user.id,   // 🔥 IMPORTANT FIX
            tripType,
            people,
            budget,
            vibe
        });

        res.status(201).json({
            message: "Preferences saved successfully ✅",
            data: newPreference
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// ✅ GET ALL (OPTIONAL: keep protected if needed)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const data = await Preference.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ GET SINGLE (USER-SPECIFIC)
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const data = await Preference.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!data) {
            return res.status(404).json({
                message: "Preference not found"
            });
        }

        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;