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

const stateImages = {
  "Andhra Pradesh": "https://images.unsplash.com/photo-1600100397608-f010f41cb8ea?w=800",
  "Arunachal Pradesh": "https://images.unsplash.com/photo-1542385159-866cebf702a4?w=800",
  "Assam": "https://images.unsplash.com/photo-1596767399824-0a373b8da7d8?w=800",
  "Bihar": "https://images.unsplash.com/photo-1614088035111-9a7006733ba0?w=800",
  "Chhattisgarh": "https://images.unsplash.com/photo-1607584102941-2a6c8b935ff0?w=800",
  "Goa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
  "Gujarat": "https://images.unsplash.com/photo-1628172935293-27cf9c9a5840?w=800",
  "Haryana": "https://images.unsplash.com/photo-1605406087523-289b4de74ad0?w=800",
  "Himachal Pradesh": "https://images.unsplash.com/photo-1605649487212-4d4ce3ae4d19?w=800",
  "Jharkhand": "https://images.unsplash.com/photo-1616422285623-13838caea8aa?w=800",
  "Karnataka": "https://images.unsplash.com/photo-1590493393043-a6021f1580bc?w=800",
  "Kerala": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
  "Madhya Pradesh": "https://images.unsplash.com/photo-1590623354964-b529606d71b3?w=800",
  "Maharashtra": "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800",
  "Manipur": "https://images.unsplash.com/photo-1599326260714-3d0263fca675?w=800",
  "Meghalaya": "https://images.unsplash.com/photo-1558284568-7c8585e1db7c?w=800",
  "Mizoram": "https://images.unsplash.com/photo-1536417757303-3dcb295ad6bc?w=800",
  "Nagaland": "https://images.unsplash.com/photo-1628461973685-6cf1b0469b2d?w=800",
  "Odisha": "https://images.unsplash.com/photo-1625055030588-4e892c90c749?w=800",
  "Punjab": "https://images.unsplash.com/photo-1587635649581-8b9a1eb03328?w=800",
  "Rajasthan": "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
  "Sikkim": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800",
  "Tamil Nadu": "https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?w=800",
  "Telangana": "https://images.unsplash.com/photo-1582042767017-02484bd7ee2d?w=800",
  "Tripura": "https://images.unsplash.com/photo-1601007421316-2479eebec41e?w=800",
  "Uttar Pradesh": "https://images.unsplash.com/photo-1564507592208-0282ee0a90af?w=800",
  "Uttarakhand": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
  "West Bengal": "https://images.unsplash.com/photo-1558431382-27e303142255?w=800"
};

const extraCityImages = [
  "https://images.unsplash.com/photo-1564507592208-0282ee0a90af?w=800",
  "https://images.unsplash.com/photo-1585136917228-45b1d4a3e8d0?w=800",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
  "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
  "https://images.unsplash.com/photo-1623881747806-cfb0df48dafb?w=800",
  "https://images.unsplash.com/photo-1609127102567-8a9a21dc27d8?w=800",
  "https://images.unsplash.com/photo-1518386377771-8e4ee0e24177?w=800",
  "https://images.unsplash.com/photo-1627389146903-8fac5bffeec0?w=800",
  "https://images.unsplash.com/photo-1632832810986-7a76c8c41ecb?w=800",
  "https://images.unsplash.com/photo-1571536802807-3cab215b3b07?w=800",
  "https://images.unsplash.com/photo-1563606990425-637dcda6cf86?w=800",
  "https://images.unsplash.com/photo-1447065056726-0e31872dfdcd?w=800",
  "https://images.unsplash.com/photo-1549491176-13a830af1dfa?w=800",
];

const statesData = Object.keys(indiaMap).map((stateName, idx) => {
  const idStr = stateName.toLowerCase().replace(/ /g, "_");
  const heroImg = stateImages[stateName] || stateImages["Rajasthan"];

  return {
    id: idStr,
    name: stateName,
    tagTitle: stateName.toUpperCase(),
    tagline: 'Discover the incredible culture and beauty of ' + stateName,
    thumbnail: heroImg,
    heroImage: heroImg,
    isPopular: ["Gujarat", "Rajasthan", "Maharashtra", "Kerala", "Goa"].includes(stateName),
    cities: indiaMap[stateName].map((cityName, cIdx) => ({
      name: cityName,
      tagline: 'Explore the vibrant streets of ' + cityName,
      image: extraCityImages[cityName.length % extraCityImages.length],
      places: [], food: [], shopping: [], experiences: [], hiddenGems: []
    }))
  };
});

const fileContent = "export const heroSlides = [\n" +
"  { id: 'slide-1', title: 'Serene Kerala Backwaters', subtitle: 'Experience tranquility in God\\'s Own Country', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=2070&auto=format&fit=crop', stateId: 'kerala' },\n" +
"  { id: 'slide-2', title: 'Majestic Taj Mahal', subtitle: 'Witness the eternal monument of love', image: 'https://images.unsplash.com/photo-1564507592208-0282ee0a90af?w=2070&auto=format&fit=crop', stateId: 'uttar_pradesh' },\n" +
"  { id: 'slide-3', title: 'Royal Rajasthan Forts', subtitle: 'Dive into the history of the Land of Kings', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=2070&auto=format&fit=crop', stateId: 'rajasthan' }\n" +
"];\n\n" +
"export const statesData = " + JSON.stringify(statesData, null, 2) + ";\n";

const outputPath = path.join(__dirname, '../../client/src/data/statesData.js');
fs.writeFileSync(outputPath, fileContent);
console.log("Written improved visual statesData.js completely locally!");
