const mongoose = require("mongoose");
const Location = require("../models/Location");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const seedData = [
    {
        state: "Gujarat",
        city: "Rajkot",
        places: [
            { name: "Kaba Gandhi No Delo", category: ["Heritage"], suitableFor: ["Solo", "Family"], bestTimeOfDay: "Morning", description: "Mahatma Gandhi's childhood home. Walk through the serene corridors that shaped a global leader." },
            { name: "Watson Museum", category: ["Heritage"], suitableFor: ["Solo", "Family"], bestTimeOfDay: "Morning", description: "One of the oldest museums in Gujarat, housing royal artifacts and colonial memorabilia." },
            { name: "Pradyuman Zoological Park", category: ["Nature", "Family"], suitableFor: ["Family", "Solo"], bestTimeOfDay: "Morning", description: "A massive wildlife sanctuary; look for the majestic Asiatic lions and diverse bird species." },
            { name: "BAPS Shri Swaminarayan Mandir", category: ["Spiritual", "Architecture"], suitableFor: ["Family", "Solo"], bestTimeOfDay: "Afternoon", description: "A stunning architectural marvel in hand-carved stone with a deeply peaceful atmosphere." },
            { name: "Shri Ramakrishna Ashrama", category: ["Spiritual"], suitableFor: ["Solo", "Family"], bestTimeOfDay: "Afternoon", description: "A peaceful sanctuary featuring a library and exhibition on the life of Ramakrishna Paramahamsa." },
            { name: "ISKCON Temple Rajkot", category: ["Spiritual"], suitableFor: ["Family"], bestTimeOfDay: "Evening", description: "Also known as Sri Sri Radha Neelmadhav Dham, participate in the soul-stirring evening aarti." },
            { name: "Ram Van", category: ["Nature", "Art"], suitableFor: ["Family", "Friends"], bestTimeOfDay: "Evening", description: "An urban forest park depicting scenes from the Ramayana through intricate sculptures." },
            { name: "Ishwariya Park", category: ["Nature"], suitableFor: ["Family", "Couple"], bestTimeOfDay: "Morning", description: "A beautifully landscaped park ideal for a morning stroll and rhythmic fountain views." },
            { name: "Rotary Dolls Museum", category: ["Fun", "Family"], suitableFor: ["Family"], bestTimeOfDay: "Afternoon", description: "Explore a fascinating collection of over 1,400 dolls from across the world." },
            { name: "Funworld Rajkot", category: ["Fun", "Family"], suitableFor: ["Family", "Friends"], bestTimeOfDay: "Afternoon", description: "An amusement park offering a variety of rides and entertainment for all ages." },
            { name: "Race Course Ground", category: ["Family", "Lifestyle"], suitableFor: ["Family", "Friends"], bestTimeOfDay: "Evening", description: "The energetic heart of local lifestyle; perfect for evening snacks and people-watching." },
            { name: "Nyari Dam", category: ["Nature"], suitableFor: ["Family", "Couple"], bestTimeOfDay: "Evening", description: "A serene getaway on the outskirts, famous for its breathtaking sunset views over the water." },
            { name: "Khambhalida Buddhist Caves", category: ["Heritage", "Architecture"], suitableFor: ["Solo", "Friends"], bestTimeOfDay: "Morning", description: "Significant rock-cut caves that are a hidden gem for architecture enthusiasts." }
        ],
        foodJoints: [
            { name: "The Grand Thakar", specialty: "Authentic Kathiawadi Thali", type: "Traditional" },
            { name: "Gir Gamthi", specialty: "Rustic Village-Style Kathiawadi", type: "Traditional" },
            { name: "Jalaram Gathiya", specialty: "Signature Rajkot Gathiya with chutney", type: "Street Food" },
            { name: "Labela Gathiya House", specialty: "Fresh Fafda-Jalebi", type: "Street Food" },
            { name: "Anand Snacks", specialty: "Local Gujarati street favorites", type: "Street Food" },
            { name: "Rasikbhai Chevdawala", specialty: "Traditional Gujarati snacks (Farsan)", type: "Street Food" },
            { name: "Saraza", specialty: "Premium Multi-cuisine & Artisan Coffee", type: "Cafe" },
            { name: "Chef Fatso", specialty: "Gourmet Neapolitan pizza and cafe vibes", type: "Cafe" }
        ],
        shoppingSpots: [
            { name: "Bangdi Bazaar", specialty: "Traditional bangles and intricate beadwork" },
            { name: "Sadar Bazar", specialty: "Bandhani textiles and ethnic handicrafts" },
            { name: "Gundawadi", specialty: "Traditional fabrics and embroidered dress materials" },
            { name: "Lakhajiraj Road", specialty: "Clothing boutiques and local specialties" },
            { name: "Rajkot Haat", specialty: "Local pottery and artisan handicrafts" }
        ],
        cityTips: [
            { season: "Winter", text: "Rajkot is incredibly vibrant in winter (Oct-Mar). It's the best time for walking tours in the old city." },
            { season: "Summer", text: "April and May can be very hot; plan indoor activities like the Dolls Museum or Watson Museum for the afternoon." },
            { season: "All", text: "Don't miss the local street food scene near Yagnik Road in the evenings!" },
            { season: "All", text: "Note: The Zoo (Pradyuman Park) is usually closed on Fridays." }
        ]
    },
    {
        state: "Gujarat",
        city: "Ahmedabad",
        places: [
            { name: "Sabarmati Ashram", category: ["Heritage"], suitableFor: ["Solo", "Family"], bestTimeOfDay: "Morning", description: "Gandhi's tranquil residence by the Sabarmati river; a place of deep reflective silence." },
            { name: "Adalaj Stepwell", category: ["Architecture", "Heritage"], suitableFor: ["Solo", "Couple"], bestTimeOfDay: "Morning", description: "A five-story stepwell with stunning Indo-Islamic architectural carvings." },
            { name: "Kankaria Lake", category: ["Fun", "Family"], suitableFor: ["Family", "Friends"], bestTimeOfDay: "Evening", description: "The iconic lakefront featuring a zoo, joyrides, and a high-speed toy train." },
            { name: "Science City", category: ["Fun", "Family"], suitableFor: ["Family"], bestTimeOfDay: "Afternoon", description: "Interactive exhibits and an aquatic gallery that makes science fascinating for all ages." },
            { name: "Calico Museum of Textiles", category: ["Heritage", "Art"], suitableFor: ["Solo", "Couple"], bestTimeOfDay: "Morning", description: "One of the most celebrated textile museums in the world." },
            { name: "Sidi Saiyyed Mosque", category: ["Architecture"], suitableFor: ["Solo", "Couple"], bestTimeOfDay: "Morning", description: "Famous for its world-renowned 'Tree of Life' stone latticework." },
            { name: "Akshardham Gandhinagar", category: ["Spiritual", "Architecture"], suitableFor: ["Family"], bestTimeOfDay: "Evening", description: "A grand temple complex with a spectacular Sat-Chit-Anand water show at sunset." }
        ],
        foodJoints: [
            { name: "Manek Chowk", specialty: "Night food market favorites like Pav Bhaji and Sandwiches", type: "Street Food" },
            { name: "Agashiye", specialty: "Rooftop Gujarati Thali experience", type: "Traditional" },
            { name: "Vishalla", specialty: "Traditional village-style outdoor dining", type: "Traditional" },
            { name: "Lucky Tea Stall", specialty: "Famous tea and Muska Bun amidst history", type: "Cafe" }
        ],
        shoppingSpots: [
            { name: "Law Garden Night Market", specialty: "Kutch embroidery and traditional jewelry" },
            { name: "Lal Darwaza", specialty: "Bustling street shopping for textiles" }
        ],
        cityTips: [
            { season: "Peak", text: "During Navratri, Ahmedabad is the global center of Garba dance festivities." },
            { season: "Peak", text: "The International Kite Festival in January (Uttarayan) is a must-see event." }
        ]
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB for GOLD STANDARD seeding...");
        await Location.deleteMany({}); // Fresh start for zero-repeat logic
        for (const loc of seedData) {
            await Location.create(loc);
        }
        console.log("Seeded GOLD STANDARD destinations successfully! ✅");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Seeding error:", JSON.stringify(err, null, 2));
        process.exit(1);
    });
