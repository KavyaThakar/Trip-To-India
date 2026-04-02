const express = require("express");
const router = express.Router();
const Location = require("../models/Location");


// ✅ 1. GET ALL STATES
router.get("/states", async (req, res) => {
    try {
        const states = await Location.distinct("state");
        res.json({ success: true, data: states });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ 2. GET CITIES BY STATE
router.get("/cities/:state", async (req, res) => {
    try {
        const data = await Location.find({ state: req.params.state });

        const cities = data.map(d => ({
            city: d.city
        }));

        res.json({ success: true, data: cities });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ 3. GET FULL CITY DETAILS (IMPORTANT 🔥)
router.get("/city/:city", async (req, res) => {
    try {
        const data = await Location.findOne({ city: req.params.city });

        if (!data) {
            return res.status(404).json({ message: "City not found" });
        }

        res.json({
            success: true,
            data: {
                places: data.places,
                food: data.food,
                shopping: data.shopping,
                experiences: data.experiences,
                hiddenGems: data.hiddenGems
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;