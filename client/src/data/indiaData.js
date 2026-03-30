// Massive data architecture covering comprehensive Indian travel
export const indiaData = {
  rajasthan: {
    id: "rajasthan",
    name: "Rajasthan",
    tagline: "The Land of Kings & Vibrant Heritage",
    heroImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=2000",
    description: "Experience the grandeur of ancient forts, vibrant culture, and endless deserts in India's most regal state.",
    hiddenGems: [
      { name: "Panna Meena Ka Kund", desc: "A perfectly symmetrical, visually stunning ancient stepwell in Jaipur.", image: "https://images.unsplash.com/photo-1593368817730-81977bd0e6f6?auto=format&fit=crop&q=80&w=800" },
      { name: "Kumbhalgarh Fort", desc: "Featuring the second longest continuous wall in the world after the Great Wall of China.", image: "https://images.unsplash.com/photo-1621685320562-11c5eebfdf45?auto=format&fit=crop&q=80&w=800" }
    ],
    places: [
      {
        id: "jaipur",
        name: "Jaipur",
        image: "https://images.unsplash.com/photo-1540391211-1d596482811a?auto=format&fit=crop&q=80&w=800",
        shortDesc: "The Pink City famous for Amer Fort, vibrant bazaars, and royal palaces.",
        heroImage: "https://images.unsplash.com/photo-1599661559897-425b0cbce5d5?auto=format&fit=crop&q=80&w=2000",
        hiddenGems: [
          { name: "Galtaji Temple (Monkey Temple)", desc: "An ancient Hindu pilgrimage site featuring natural springs and thousands of monkeys." },
          { name: "Patrika Gate", desc: "The most vibrantly painted, highly photogenic gate showcasing Rajasthan's history." }
        ],
        itinerary: [
          { day: 1, title: "Royal Arrival & Architectural Marvels", desc: "Arrive in Jaipur. Check into your heritage hotel. Visit the opulent City Palace and the astronomical wonder Jantar Mantar. Conclude the day watching the sunset at Nahargarh Fort.", highlight: "City Palace & Nahargarh Sunset" },
          { day: 2, title: "Amer Fort & The Elephant Village", desc: "Start early for Amer Fort. Visit the magnificent Sheesh Mahal (Mirror Palace). On the way back, photograph the Jal Mahal floating on Man Sagar Lake. Visit Elefantastic for an ethical elephant sanctuary experience.", highlight: "Amer Fort & Jal Mahal" },
          { day: 3, title: "The Grand Shopping Spree & Street Food", desc: "Head to Johari Bazaar for exquisite Kundan jewelry and Bapu Bazaar for Mojari shoes and block-printed textiles. Take a street food walk to try Pyaaz Kachori at Rawat Mishtan Bhandar and Lassi at Lassiwala.", highlight: "Johari Bazaar & Bapu Bazaar Shopping" },
          { day: 4, title: "Palace of Winds & Cultural Evening", desc: "Witness sunrise at Hawa Mahal (Palace of Winds). Explore the Albert Hall Museum. In the evening, visit Chokhi Dhani for an authentic immersive Rajasthani village experience with a traditional lavish Thali.", highlight: "Hawa Mahal & Chokhi Dhani Thali" }
        ],
        tips: ["Bargain hard at Bapu Bazaar (start at 40% of their quoted price).", "Carry comfortable shoes for Nahargarh and Amer Fort.", "Avoid drinking tap water; always carry bottled water."]
      },
      {
        id: "udaipur",
        name: "Udaipur",
        image: "https://images.unsplash.com/photo-1615836245337-b9f1d033ac39?auto=format&fit=crop&q=80&w=800",
        shortDesc: "The City of Lakes and romantic palaces.",
        heroImage: "https://images.unsplash.com/photo-1559419163-cf9915eb90cc?auto=format&fit=crop&q=80&w=2000",
        hiddenGems: [],
        itinerary: [
          { day: 1, title: "Lake Pichola & Sunset", desc: "Enjoy a serene boat ride on Lake Pichola and witness the sunset at Jag Mandir.", highlight: "Boat Ride on Lake Pichola" },
          { day: 2, title: "City Palace & Culture", desc: "Explore the vast Udaipur City Palace and enjoy evening folk dances at Bagore Ki Haveli.", highlight: "Bagore Ki Haveli Folk Show" }
        ],
        tips: ["Evenings by the lake can be breezy, pack a light shawl."]
      }
    ]
  },
  maharashtra: {
    id: "maharashtra",
    name: "Maharashtra",
    tagline: "Unlimit Beauty and Bollywood",
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=2000",
    description: "Home to the financial capital Mumbai, ancient rock-cut caves, and lush Western Ghats.",
    hiddenGems: [
      { name: "Kaas Plateau", desc: "Maharashtra's Valley of Flowers, a UNESCO World Natural Heritage Site.", image: "https://images.unsplash.com/photo-1596484552993-90d54f5942de?auto=format&fit=crop&q=80&w=800" },
      { name: "Lonar Crater Lake", desc: "A saline, alkaline lake created by a meteorite impact.", image: "https://images.unsplash.com/photo-1626296181966-2678f56efb47?auto=format&fit=crop&q=80&w=800" }
    ],
    places: [
      {
        id: "mumbai",
        name: "Mumbai",
        image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=800",
        shortDesc: "The city of dreams, Bollywood, and Marine Drive.",
        heroImage: "https://images.unsplash.com/photo-1521404090906-9694e1d5eb89?auto=format&fit=crop&q=80&w=2000",
        hiddenGems: [
          { name: "Banganga Tank", desc: "An ancient water tank in Malabar hill surrounded by temples." },
          { name: "Chor Bazaar", desc: "One of the largest flea markets in India for antiques." }
        ],
        itinerary: [
          { day: 1, title: "South Bombay Heritage", desc: "Visit Gateway of India, Taj Mahal Palace, and take a heritage walk around Fort area.", highlight: "Gateway of India" },
          { day: 2, title: "Bollywood & Marine Drive", desc: "Take a Bollywood studio tour. Spend the evening sitting at Marine Drive (Queen's Necklace) eating Vada Pav.", highlight: "Marine Drive Sunset" },
          { day: 3, title: "Shopping & Street Food", desc: "Shop at Colaba Causeway. Eat street food at Juhu Beach.", highlight: "Colaba Causeway Shopping" }
        ],
        tips: ["Use local trains but avoid them during peak rush hours (8-10 AM, 6-8 PM).", "Try the cutting chai and Vada Pav from a reputable vendor."]
      }
    ]
  },
  gujarat: {
    id: "gujarat",
    name: "Gujarat",
    tagline: "Vibrant and Rich Heritage",
    heroImage: "https://images.unsplash.com/photo-1609127102567-8a9a21dc27d8?auto=format&fit=crop&q=80&w=2000",
    description: "From the white salt desert of Kutch to the ancient temples of Somnath, Gujarat is a mosaic of culture.",
    hiddenGems: [
      { name: "Rani Ki Vav", desc: "An intricately constructed stepwell situated in the town of Patan.", image: "https://images.unsplash.com/photo-1628186255146-56af97e5ea7a?auto=format&fit=crop&q=80&w=800" }
    ],
    places: [
      {
        id: "kutch",
        name: "Rann of Kutch",
        image: "https://images.unsplash.com/photo-1631558963595-d627a2ac777b?auto=format&fit=crop&q=80&w=800",
        shortDesc: "The great white salt desert.",
        heroImage: "https://images.unsplash.com/photo-1590050720468-b39bc57fb6f0?auto=format&fit=crop&q=80&w=2000",
        hiddenGems: [
          { name: "Kalo Dungar", desc: "The highest point in Kutch offering panoramic views of the Rann." }
        ],
        itinerary: [
          { day: 1, title: "Rann Utsav", desc: "Check into luxurious desert tents and enjoy the festive atmosphere of Rann Utsav.", highlight: "Rann Utsav Tent City" },
          { day: 2, title: "White Desert Safari", desc: "A full moon night safari over the glowing white salt expanse.", highlight: "Moonlight Safari" }
        ],
        tips: ["Carry heavy woolens if visiting during winter nights."]
      }
    ]
  },
  kerala: {
    id: "kerala",
    name: "Kerala",
    tagline: "God's Own Country",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=2000",
    description: "Lush green landscapes, serene backwaters, and Ayurvedic retreats await you in southern India.",
    hiddenGems: [
      { name: "Varkala Cliff", desc: "The only place in southern Kerala where cliffs are found adjacent to the Arabian Sea.", image: "https://plus.unsplash.com/premium_photo-1697729606869-7c858a7bebed?auto=format&fit=crop&q=80&w=800" }
    ],
    places: [
      {
        id: "alleppey",
        name: "Alleppey",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800",
        shortDesc: "Famous for luxurious houseboat cruises.",
        heroImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000",
        hiddenGems: [
          { name: "Marari Beach", desc: "A pristine, less-crowded beach just a few kilometers from Alleppey." }
        ],
        itinerary: [
          { day: 1, title: "Boarding the Houseboat", desc: "Settle into a premium houseboat. Sail through the palm-fringed backwaters and enjoy traditional Kerala lunch.", highlight: "Luxury Houseboat Stay" },
          { day: 2, title: "Village Walks & Ayurveda", desc: "Wake up to tranquil waters, visit local farming villages. In the afternoon, get a traditional Ayurvedic massage.", highlight: "Ayurvedic Spa" }
        ],
        tips: ["Mosquito repellent is a must for evenings on the water."]
      }
    ]
  },
  goa: {
    id: "goa",
    name: "Goa",
    tagline: "The Pearl of the Orient",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=2000",
    description: "Endless beaches, vibrant nightlife, portuguese history and a laid-back lifestyle.",
    hiddenGems: [
      { name: "Divar Island", desc: "A sleepy, picturesque island disconnected from the heavy tourist traffic.", image: "https://images.unsplash.com/photo-1620023640244-12bc4fbb5bc2?auto=format&fit=crop&q=80&w=800" }
    ],
    places: [
      {
        id: "south-goa",
        name: "South Goa",
        image: "https://images.unsplash.com/photo-1560179406-1c6c60e0faf2?auto=format&fit=crop&q=80&w=800",
        shortDesc: "Pristine, quiet beaches and luxury resorts.",
        heroImage: "https://images.unsplash.com/photo-1522851456955-46fd182ee729?auto=format&fit=crop&q=80&w=2000",
        hiddenGems: [
          { name: "Cabo de Rama Fort", desc: "A spectacular cliff-top ruined fort with sweeping ocean views." }
        ],
        itinerary: [
          { day: 1, title: "Palolem Beach Relaxation", desc: "Relax by the pristine Palolem beach, enjoy sunset cocktails and fresh seafood at a beach shack.", highlight: "Beach Sunset" },
          { day: 2, title: "Old Goa Heritage", desc: "Visit the historic Basilica of Bom Jesus and explore the deep spice plantations.", highlight: "Spice Plantation Tour" }
        ],
        tips: ["Rent a scooty for easy and cheap transportation.", "High SPF sunscreen is extremely necessary."]
      }
    ]
  },
  uttarakhand: {
    id: "uttarakhand",
    name: "Uttarakhand",
    tagline: "Devbhumi (Land of the Gods)",
    heroImage: "https://images.unsplash.com/photo-1626714485955-3343d8d6d6fb?auto=format&fit=crop&q=80&w=2000",
    description: "The spiritual heart of the Himalayas, perfect for adventure and soul-searching.",
    hiddenGems: [
      { name: "Chopta", desc: "Known as the Mini Switzerland of India, a dense forest region with meadows.", image: "https://images.unsplash.com/photo-1605335805541-ef17f272a275?auto=format&fit=crop&q=80&w=800" }
    ],
    places: [
      {
        id: "rishikesh",
        name: "Rishikesh",
        image: "https://images.unsplash.com/photo-1589136109312-70b9ab1f6920?auto=format&fit=crop&q=80&w=800",
        shortDesc: "Yoga capital and white water rafting.",
        heroImage: "https://images.unsplash.com/photo-1582842478335-90058b7365c1?auto=format&fit=crop&q=80&w=2000",
        hiddenGems: [
          { name: "Vashishta Gufa", desc: "An ancient cave where Sage Vashishta meditated, situated right on the banks of the Ganges." }
        ],
        itinerary: [
          { day: 1, title: "Ganga Aarti & Ashrams", desc: "Check into an Ashram or riverside resort. Cross the Lakshman Jhula and visit the Beatles Ashram. Experience the highly spiritual Ganga Aarti at Triveni Ghat at sunset.", highlight: "Triveni Ghat Evening Aarti" },
          { day: 2, title: "Adventure on the Rapids", desc: "Go for an adrenaline pumping 16km White Water Rafting on the Ganges. Eat at the famous Chotiwala restaurant.", highlight: "White Water River Rafting" },
          { day: 3, title: "Bungee Jumping & Cafe Hopping", desc: "For extreme thrill-seekers, try Bungee Jumping at Jumpin Heights. Spend the evening cafe hopping along the river.", highlight: "Bungee Jumping" }
        ],
        tips: ["Tents and adventure gear are great if camping.", "Modest clothing is expected in and around temples and ashrams."]
      }
    ]
  },
  karnataka: {
    id: "karnataka",
    name: "Karnataka",
    tagline: "One State, Many Worlds",
    heroImage: "https://images.unsplash.com/photo-1613511874251-143aba2c6f1a?auto=format&fit=crop&q=80&w=2000",
    description: "From IT hubs to ancient ruins of Hampi and lush coffee plantations of Coorg.",
    hiddenGems: [
      { name: "Gokarna", desc: "A quieter, more spiritual alternative to Goa's beaches.", image: "https://images.unsplash.com/photo-1601000676435-430c00cc86e9?auto=format&fit=crop&q=80&w=800" }
    ],
    places: [
      {
        id: "hampi",
        name: "Hampi",
        image: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&q=80&w=800",
        shortDesc: "A UNESCO World Heritage site known for majestic ancient ruins.",
        heroImage: "https://images.unsplash.com/photo-1600030501174-8d96009de577?auto=format&fit=crop&q=80&w=2000",
        hiddenGems: [
          { name: "Matanga Hill", desc: "Best spot for an uninterrupted panoramic sunrise over the ruins." }
        ],
        itinerary: [
          { day: 1, title: "Temple Run", desc: "Explore the Virupaksha Temple, the incredibly carved stone chariot at Vittala Temple, and the Elephant Stables.", highlight: "Vittala Temple Stone Chariot" },
          { day: 2, title: "Hippie Island & Bouldering", desc: "Cross the Tungabhadra river to explore 'Hippie Island', go bouldering amidst the unique rock formations.", highlight: "Bouldering at Sunset" }
        ],
        tips: ["Wear extremely comfortable walking shoes and carry liberal amounts of water."]
      }
    ]
  },
  delhi: {
    id: "delhi",
    name: "Delhi",
    tagline: "Heart of India",
    heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=2000",
    description: "A bustling metropolis that beautifully balances the old-world charm with modern infrastructure.",
    hiddenGems: [
      { name: "Agrasen Ki Baoli", desc: "A haunted historical stepwell hidden in the middle of modern high-rises in Connaught Place.", image: "https://images.unsplash.com/photo-1623862788537-8e68cfb9cb7f?auto=format&fit=crop&q=80&w=800" }
    ],
    places: [
      {
        id: "new-delhi",
        name: "New Delhi",
        image: "https://images.unsplash.com/photo-1587222318667-31ae19ebf1ae?auto=format&fit=crop&q=80&w=800",
        shortDesc: "The capital city of food, monuments, and shopping.",
        heroImage: "https://images.unsplash.com/photo-1514222026195-2cc6a4b3d7a8?auto=format&fit=crop&q=80&w=2000",
        hiddenGems: [
          { name: "Sunder Nursery", desc: "A 16th-century heritage park complex that is perfect for a winter picnic." }
        ],
        itinerary: [
          { day: 1, title: "Mughal Architecture", desc: "Visit the awe-inspiring Humayun's Tomb, and later explore the massive Red Fort.", highlight: "Humayun's Tomb" },
          { day: 2, title: "Old Delhi Food Walk", desc: "Take a rickshaw through Chandni Chowk. Eat Paranthas at Paranthe Wali Gali, and Jama Masjid area for Kebabs.", highlight: "Chandni Chowk Food Tour" },
          { day: 3, title: "Modern Shopping & Nightlife", desc: "Shop at Dilli Haat for regional crafts and spend the evening enjoying the nightlife at Hauz Khas Village.", highlight: "Hauz Khas Village" }
        ],
        tips: ["Use the Delhi Metro; it is fast, clean, and avoids the extreme traffic.", "Be cautious of your belongings in crowded markets like Sarojini Nagar or Chandni Chowk."]
      }
    ]
  }
};

export const getAllStates = () => Object.values(indiaData);
export const getStateById = (id) => indiaData[id];
export const getPlaceById = (stateId, placeId) => {
  const st = indiaData[stateId];
  if (!st) return null;
  return st.places.find(p => p.id === placeId);
};
