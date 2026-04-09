const mongoose = require("mongoose");
const Location = require("../models/Location");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const seedData = [
    {
        state: "Gujarat",
        city: "Rajkot",
        places: [
            { name: "Pradyuman Zoological Park", category: ["Nature", "Family"], suitableFor: ["Family", "Solo"], bestTimeOfDay: "Morning", description: "A large zoo and picnic spot, perfect for seeing lions, tigers, and deer." },
            { name: "Funworld", category: ["Fun", "Family"], suitableFor: ["Family", "Friends"], bestTimeOfDay: "Afternoon", description: "An amusement park with rides and games for children and adults." },
            { name: "Nyari Dam", category: ["Nature"], suitableFor: ["Family", "Couple", "Solo"], bestTimeOfDay: "Evening", description: "A scenic dam on the outskirts, great for sunset views and bird watching." },
            { name: "Kaba Gandhi No Delo", category: ["Heritage"], suitableFor: ["Solo", "Family"], bestTimeOfDay: "Morning", description: "Mahatma Gandhi's childhood home, now a museum showcasing his life." },
            { name: "Watson Museum", category: ["Heritage"], suitableFor: ["Solo", "Family"], bestTimeOfDay: "Morning", description: "One of the oldest museums in Gujarat, housing royal artifacts and colonial history." },
            { name: "Rotary Dolls Museum", category: ["Fun", "Family"], suitableFor: ["Family"], bestTimeOfDay: "Afternoon", description: "A unique museum with dolls from over 100 countries." },
            { name: "Race Course Ground", category: ["Family", "Nature"], suitableFor: ["Family", "Friends", "Solo"], bestTimeOfDay: "Evening", description: "A hub for health, walking, and local street food stalls." }
        ],
        foodJoints: [
            { name: "Jalaram Gathiya", specialty: "Fresh Gathiya with Chutney & Papaya", type: "Street Food" },
            { name: "The Grand Thakar", specialty: "Authentic Gujarati Thali", type: "Traditional" },
            { name: "Gir Gamthi", specialty: "Kathiyawadi Cuisine", type: "Traditional" },
            { name: "Rasikbhai Chevdawala", specialty: "Peanut Chutney and Farsan", type: "Street Food" }
        ],
        shoppingSpots: [
            { name: "Lakhajiraj Road", specialty: "Boutiques and traditional clothing" },
            { name: "Bangdi Bazaar", specialty: "Traditional bangles and beadwork" },
            { name: "Gundawadi", specialty: "Bandhani fabrics and ethnic wear" }
        ],
        cityTips: [
            { season: "Winter", text: "Best time to visit Rajkot (Oct-Mar). The weather is pleasant for outdoor parks." },
            { season: "Summer", text: "It gets very hot! Carry umbrellas, drink plenty of water, and stay hydrated." },
            { season: "All", text: "The Zoo (Pradyuman Park) is usually closed on Fridays. Plan accordingly!" },
            { season: "Monsoon", text: "Nyari Dam looks beautiful during Monsoons, but be careful of slippery paths." }
        ]
    },
    {
        state: "Gujarat",
        city: "Ahmedabad",
        places: [
            { name: "Sabarmati Ashram", category: ["Heritage"], suitableFor: ["Solo", "Family"], bestTimeOfDay: "Morning", description: "Gandhi's serene residence by the river, offering a deep dive into Indian history." },
            { name: "Kankaria Lake", category: ["Fun", "Family"], suitableFor: ["Family", "Friends"], bestTimeOfDay: "Evening", description: "A massive lakefront with a zoo, toy train, tethered balloon, and food stalls." },
            { name: "Adalaj Stepwell", category: ["Architecture", "Heritage"], suitableFor: ["Solo", "Couple"], bestTimeOfDay: "Morning", description: "A stunning 15th-century stepwell with intricate carvings." },
            { name: "Science City", category: ["Fun", "Family"], suitableFor: ["Family"], bestTimeOfDay: "Afternoon", description: "Interactive exhibits, an IMAX theater, and an aquatic gallery." },
            { name: "Akshardham Temple", category: ["Spiritual", "Architecture"], suitableFor: ["Family"], bestTimeOfDay: "Evening", description: "A grand temple complex in Gandhinagar with a spectacular water show." }
        ],
        foodJoints: [
            { name: "Manek Chowk", specialty: "Night Food Market (Pav Bhaji, Gwalior Dosa, Sandwiches)", type: "Street Food" },
            { name: "Agashiye", specialty: "Premium Gujarati Thali on a terrace", type: "Traditional" },
            { name: "Vishalla", specialty: "Open-air village-themed dining", type: "Traditional" }
        ],
        shoppingSpots: [
            { name: "Law Garden Night Market", specialty: "Chaniya Cholis and handicrafts" },
            { name: "Lal Darwaza", specialty: "Budget street shopping" }
        ],
        cityTips: [
            { season: "Peak", text: "Navratri is the best time to experience Ahmedabad's vibrant culture and Garba." },
            { season: "Summer", text: "Ahmedabad can hit 45°C in May. Visit indoor spots during the afternoon." }
        ]
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB for seeding structured data...");
        
        // Clear existing locations to prevent duplicates or mixed schemas
        await Location.deleteMany({});
        
        for (const loc of seedData) {
            await Location.create(loc);
        }
        
        console.log("Seeded product-level locations successfully! ✅");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Seeding error:", err);
        process.exit(1);
    });
