const express = require("express");
const router = express.Router();
const Itinerary = require("../models/Itinerary");
const Location = require("../models/Location");
const authMiddleware = require("../middleware/authMiddleware");
const PDFDocument = require("pdfkit");


// ✅ 1. CREATE ITINERARY
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { city, duration } = req.body;
        const userId = req.user.id;

        if (!city) {
            return res.status(400).json({ message: "City is required" });
        }

        if (!duration || duration <= 0) {
            return res.status(400).json({ message: "Invalid duration" });
        }

        const location = await Location.findOne({ city });

        if (!location) {
            return res.status(404).json({ message: "City data not found" });
        }

        let plan = [];
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
                        : "Explore local places"
                ],
                hotel: "Recommended Hotel",
                food: [
                    food.length > 0
                        ? food[(i - 1) % food.length]
                        : "Local Food"
                ]
            });
        }

        const savedItinerary = await Itinerary.create({
            userId,
            destination: city,
            duration,
            plan
        });

        res.status(201).json({
            success: true,
            message: "City-based itinerary generated ✅",
            data: savedItinerary
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// ✅ 2. GET USER ITINERIES
router.get("/", authMiddleware, async (req, res) => {
    try {
        const data = await Itinerary.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.json({ success: true, data });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ 3. DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const itinerary = await Itinerary.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!itinerary) {
            return res.status(404).json({ message: "Not found or unauthorized" });
        }

        res.json({
            success: true,
            message: "Itinerary deleted ✅"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ 4. PDF DOWNLOAD
router.get("/pdf/:id", authMiddleware, async (req, res) => {
    try {
        const itinerary = await Itinerary.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!itinerary) {
            return res.status(404).json({ message: "Not found" });
        }

        const doc = new PDFDocument();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=itinerary.pdf");

        doc.pipe(res);

        doc.fontSize(20).text("TripToIndia Itinerary", { align: "center" });
        doc.moveDown();

        doc.text(`Destination: ${itinerary.destination}`);
        doc.text(`Duration: ${itinerary.duration} days`);
        doc.moveDown();

        itinerary.plan.forEach(day => {
            doc.text(`Day ${day.day}: ${day.title}`);
            doc.text(`Places: ${day.places.join(", ")}`);
            doc.text(`Hotel: ${day.hotel}`);
            doc.text(`Food: ${day.food.join(", ")}`);
            doc.moveDown();
        });

        doc.end();

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ 5. EDIT ITINERARY (🔥 NOW CORRECTLY OUTSIDE)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { plan, duration } = req.body;

        const itinerary = await Itinerary.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        if (plan) itinerary.plan = plan;
        if (duration) itinerary.duration = duration;

        await itinerary.save();

        res.json({
            success: true,
            message: "Itinerary updated ✏️",
            data: itinerary
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;