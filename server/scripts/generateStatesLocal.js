const fs = require('fs');
const path = require('path');

const indiaMap = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Kakinada", "Tirupati", "Guntur", "Rajahmundry", "Nellore", "Kurnool", "Kadapa", "Anantapur", "Amravati", "Chittoor", "Eluru", "Ongole"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila", "Tezu", "Aalo", "Roing", "Dirang"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Diphu", "Dhubri", "Sibsagar", "Barpeta", "Golaghat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Ara", "Begusarai", "Katihar", "Chapra", "Munger", "Saharsa", "Hajipur", "Sasaram"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Dhamtari", "Mahasamund"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Calangute", "Baga", "Anjuna", "Palolem", "Arambol", "Morjim"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Anand", "Navsari", "Morbi", "Bhuj", "Kutch", "Somnath", "Dwarka", "Porbandar", "Patan", "Dahod"],
  "Haryana": ["Chandigarh", "Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Kurukshetra"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Mandi", "Solan", "Dalhousie", "Khajjiar", "Palampur", "Kasauli", "Spiti", "Bir Billing"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar", "Phusro"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi", "Davangere", "Ballari", "Vijayapura", "Kalaburagi", "Shivamogga", "Tumakuru", "Udupi", "Hampi", "Gokarna", "Coorg"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Palakkad", "Kannur", "Kottayam", "Munnar", "Wayanad", "Varkala"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Khajuraho", "Pachmarhi"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Amravati", "Nanded", "Kolhapur", "Jalgaon", "Akola", "Latur", "Mahabaleshwar", "Lonavala"],
  "Manipur": ["Imphal", "Churachandpur", "Thoubal", "Kakching", "Senapati", "Ukhrul", "Bishnupur", "Jiribam"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh", "Williamnagar", "Baghmara", "Resubelpara", "Cherrapunji", "Dawki"],
  "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", "Lawngtlai", "Mamit"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Kiphire", "Longleng"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda", "Konark"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Moga", "Abohar", "Pathankot", "Hoshiarpur"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Pushkar", "Jaisalmer", "Mount Abu"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Pelling", "Lachung", "Ravangla"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul", "Ooty", "Kodaikanal"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Belonia", "Kailashahar", "Khowai", "Ambassa"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Mathura", "Ayodhya"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Rishikesh", "Nainital", "Mussoorie", "Almora", "Auli"],
  "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Santipur", "Darjeeling", "Sundarbans"]
};

// Generic images to fallback
const images = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
  "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
  "https://images.unsplash.com/photo-1564507592208-0282ee0a90af?w=800",
  "https://images.unsplash.com/photo-1585136917228-45b1d4a3e8d0?w=800"
];

const statesData = Object.keys(indiaMap).map((stateName, idx) => {
  const idStr = stateName.toLowerCase().replace(/ /g, "_");
  const heroImg = images[idx % images.length];

  return {
    id: idStr,
    name: stateName,
    tagTitle: stateName.toUpperCase(),
    tagline: `Discover the incredible culture and beauty of ${stateName}`,
    thumbnail: heroImg,
    heroImage: heroImg,
    isPopular: ["Gujarat", "Rajasthan", "Maharashtra", "Kerala", "Goa"].includes(stateName),
    cities: indiaMap[stateName].map((cityName, cIdx) => ({
      name: cityName,
      tagline: `Explore the vibrant streets of ${cityName}`,
      image: images[(cIdx + idx) % images.length],
      places: [], food: [], shopping: [], experiences: [], hiddenGems: [] // Let UI dynamically fetch from Gemini
    }))
  };
});

const fileContent = `// Auto-generated hardcoded comprehensive Indian States map
export const heroSlides = [
  { id: 'slide-1', title: 'Serene Kerala Backwaters', subtitle: 'Experience tranquility in God\\'s Own Country',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=2070&auto=format&fit=crop', stateId: 'kerala' },
  { id: 'slide-2', title: 'Majestic Taj Mahal', subtitle: 'Witness the eternal monument of love',
    image: 'https://images.unsplash.com/photo-1564507592208-0282ee0a90af?w=2070&auto=format&fit=crop', stateId: 'uttar_pradesh' },
  { id: 'slide-3', title: 'Royal Rajasthan Forts', subtitle: 'Dive into the history of the Land of Kings',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=2070&auto=format&fit=crop', stateId: 'rajasthan' }
];

export const statesData = ${JSON.stringify(statesData, null, 2)};
`;

const outputPath = path.join(__dirname, '../../client/src/data/statesData.js');
fs.writeFileSync(outputPath, fileContent);
console.log("Written statesData.js completely locally!");
