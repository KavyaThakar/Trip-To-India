const express = require("express");
const router = express.Router();
const Itinerary = require("../models/Itinerary");
const Location = require("../models/Location");
const Preference = require("../models/Preference");
const authMiddleware = require("../middleware/authMiddleware");
const PDFDocument = require("pdfkit");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Helper to shuffle array
const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// ✅ Helper to pick and remove from a pool to ensure ZERO repetitions
const pickFromPool = (pool, count = 1) => {
    if (pool.length === 0) return [];
    return pool.splice(0, count);
};

// ✅ 1. CREATE ITINERARY (GEMINI AI ENGINE)
router.post("/", authMiddleware, async (req, res) => {
    try {
        let { city, state, duration, tripType } = req.body;
        const userId = req.user.id;

        if (!city) {
            return res.status(400).json({ message: "City is required" });
        }

        const latestPref = await Preference.findOne({ userId }).sort({ createdAt: -1 });
        if (!duration || duration <= 0) duration = latestPref?.tripDuration || 5;
        if (!tripType) tripType = latestPref?.tripType || "Family/Friends";

        let currentMonth = new Date().toLocaleString('default', { month: 'long' });

        const prompt = `You are a luxury travel concierge specializing in Indian tourism. Create a highly specific, non-repeating ${duration}-day travel itinerary for ${city}, ${state || 'India'}.
The travelers are a group of: ${tripType}. The trip is happening in the month of ${currentMonth}.

Your itinerary MUST include exact, real names of famous places, hidden gems, and restaurants in ${city}. No generic placeholders.
Provide strict, highly detailed day plans. 

Respond ONLY with valid JSON exactly in this structure:
{
  "plan": [
    {
      "day": 1,
      "title": "Day 1: Old Heritage & Iconic Walks",
      "places": [
        "Morning (8:00 AM): Start your day at <Exact Place Name>. <Detailed sentence on what to do>.",
        "Afternoon (1:00 PM): Head to <Specific Place>. <Detailed explanation>.",
        "Evening (6:00 PM): Spend your evening at <Specific Place>."
      ],
      "hotel": "<Recommended Real Hotel in ${city}>",
      "food": [
        "Lunch: <Exact Local Dish> at <Real Restaurant Name>",
        "Dinner: <Exact Local Dish> at <Real Restaurant Name>"
      ]
    }
  ],
  "tips": [
    {
      "season": "Best Time to Visit",
      "text": "<Specific months to visit ${city} and why>"
    },
    {
      "season": "Local Food",
      "text": "Do not miss the authentic <specific local dish> at places like <specific restaurant>."
    },
    {
      "season": "Transport & Commute",
      "text": "<Specify exact local transport details, e.g., use AMTS/BRTS buses, metro, auto-rickshaws, or Uber/Ola within ${city}>"
    }
  ]
}`;

        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            generationConfig: { responseMimeType: "application/json" }
        });
        
        let result;
        let lastError;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                result = await model.generateContent(prompt);
                break;
            } catch (err) {
                lastError = err;
                console.warn(`Gemini attempt ${attempt} failed:`, err.message);
                if (attempt < 3) await new Promise(r => setTimeout(r, 2000 * attempt));
            }
        }
        if (!result) throw lastError;

        let rawText = result.response.text();
        
        const startIdx = rawText.indexOf('{');
        const endIdx = rawText.lastIndexOf('}');
        if (startIdx !== -1 && endIdx !== -1) {
            rawText = rawText.substring(startIdx, endIdx + 1);
        }
        
        let aiData;
        try {
            aiData = JSON.parse(rawText);
        } catch (e) {
            console.error("Gemini JSON parsing error:", rawText);
            throw new Error("Failed to parse AI response.");
        }

        const savedItinerary = await Itinerary.create({
            userId,
            destination: city,
            duration,
            plan: aiData.plan
        });

        res.status(201).json({
            success: true,
            message: "Gemini AI Itinerary Generated ✅",
            data: savedItinerary,
            cityDetail: {
                state: "India", // State can be omitted or handled client-side
                tips: aiData.tips
            }
        });

    } catch (error) {
        console.error("Itinerary Error:", error);
        res.status(500).json({ success: false, error: 'Could not generate itinerary. Please try again.' });
    }
});

// ✅ 2. GET USER ITINERIES
router.get("/", authMiddleware, async (req, res) => {
    try {
        const data = await Itinerary.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ 3. DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Itinerary.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.json({ success: true, message: "Itinerary deleted ✅" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ 4. PDF DOWNLOAD
router.get("/pdf/:id", authMiddleware, async (req, res) => {
    try {
        const itinerary = await Itinerary.findOne({ _id: req.params.id, userId: req.user.id });
        if (!itinerary) return res.status(404).json({ message: "Not found" });

        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=itinerary.pdf");
        doc.pipe(res);
        doc.fontSize(20).text("TripToIndia Official Itinerary", { align: "center" });
        doc.moveDown();
        doc.text(`Destination: ${itinerary.destination}`);
        doc.text(`Duration: ${itinerary.duration} days`);
        doc.moveDown();

        itinerary.plan.forEach(day => {
            doc.fontSize(14).text(`Day ${day.day}: ${day.title}`, { underline: true });
            day.places.forEach(p => doc.fontSize(11).text(`• ${p}`));
            doc.text(`Food: ${day.food.join(", ")}`);
            doc.moveDown();
        });
        doc.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ 5. GET CITY DETAILS (GEMINI AI ON-THE-FLY)
router.post("/city-details", async (req, res) => {
    try {
        const { city, state } = req.body;
        if (!city) return res.status(400).json({ error: "City is required" });

        const prompt = `You are an expert local guide for ${city}, ${state}, India. Provide deep, authentic, detailed recommendations.
Return ONLY valid JSON exactly in this format:
{
  "places": [
    { "name": "Exact Name of Place", "desc": "One detailed sentence description" }
  ],
  "food": [
    { "name": "Exact Authentic Dish or Restaurant", "desc": "One detailed sentence description" }
  ],
  "shopping": [
    { "name": "Exact Market or Shop", "desc": "One detailed sentence description of what to buy" }
  ],
  "experiences": [
    "One detailed unique cultural or local experience",
    "Another unique local experience"
  ],
  "hiddenGems": [
    { "title": "Secret Local Spot", "desc": "Why it's a hidden gem and what to do there", "color": "orange" }
  ]
}
Provide exactly 4 places, 3 foods, 3 shopping, 3 experiences, and 2 hidden gems. Use real, highly accurate data. Do not make up fake places.`;

        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            generationConfig: { responseMimeType: "application/json" }
        });
        
        let result;
        let lastError;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                result = await model.generateContent(prompt);
                break;
            } catch (err) {
                lastError = err;
                console.warn(`Gemini city-details attempt ${attempt} failed:`, err.message);
                if (attempt < 3) await new Promise(r => setTimeout(r, 2000 * attempt));
            }
        }
        if (!result) throw lastError;

        let rawText = result.response.text();
        
        const startIdx = rawText.indexOf('{');
        const endIdx = rawText.lastIndexOf('}');
        if (startIdx !== -1 && endIdx !== -1) {
            rawText = rawText.substring(startIdx, endIdx + 1);
        }
        
        res.json(JSON.parse(rawText));
    } catch (error) {
        console.error("City Details AI Error:", error);
        res.status(500).json({ error: "Failed to load city insights" });
    }
});

module.exports = router;