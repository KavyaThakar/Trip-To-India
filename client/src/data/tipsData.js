import { 
  Sun, Mountain, Waves, PlusSquare, Backpack, Droplet, Users, Heart, Camera, Check, Briefcase, Glasses,
  Landmark, Coffee, Smartphone, Train, Footprints
} from 'lucide-react';

export const tipsData = {}; // Keeping for backward compatibility if needed

export const locationsData = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Tirupati', 'Kurnool', 'Nellore'],
  'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Ziro', 'Pasighat', 'Bomdila'],
  'Assam': ['Guwahati', 'Kaziranga', 'Jorhat', 'Dibrugarh', 'Silchar'],
  'Bihar': ['Patna', 'Gaya', 'Nalanda', 'Bhagalpur', 'Rajgir'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Bastar', 'Bilaspur', 'Durg'],
  'Goa': ['North Goa', 'South Goa', 'Panjim', 'Calangute', 'Margao'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Junagadh', 'Kutch', 'Gir', 'Vadodara', 'Rajkot', 'Dwarka'],
  'Haryana': ['Gurgaon', 'Faridabad', 'Panipat', 'Ambala', 'Kurukshetra'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Dalhousie', 'Kasol', 'Kullu'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Deoghar', 'Dhanbad', 'Hazaribagh'],
  'Karnataka': ['Bangalore', 'Mysore', 'Coorg', 'Hampi', 'Gokarna', 'Mangalore', 'Udupi'],
  'Kerala': ['Kochi', 'Munnar', 'Alleppey', 'Wayanad', 'Thekkady', 'Trivandrum', 'Varkala'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Khajuraho', 'Ujjain'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Mahabaleshwar', 'Lonavala'],
  'Manipur': ['Imphal', 'Loktak Lake', 'Ukhrul'],
  'Meghalaya': ['Shillong', 'Cherrapunji', 'Dawki', 'Tura'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung'],
  'Odisha': ['Bhubaneswar', 'Puri', 'Konark', 'Cuttack', 'Sambalpur'],
  'Punjab': ['Amritsar', 'Ludhiana', 'Chandigarh', 'Jalandhar', 'Patiala'],
  'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Pushkar', 'Bikaner', 'Mount Abu'],
  'Sikkim': ['Gangtok', 'Pelling', 'Lachung', 'Namchi'],
  'Tamil Nadu': ['Chennai', 'Madurai', 'Ooty', 'Kanyakumari', 'Rameswaram', 'Coimbatore'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam'],
  'Tripura': ['Agartala', 'Udaipur', 'Unakoti'],
  'Uttar Pradesh': ['Lucknow', 'Varanasi', 'Agra', 'Prayagraj', 'Mathura', 'Ayodhya'],
  'Uttarakhand': ['Dehradun', 'Rishikesh', 'Nainital', 'Mussoorie', 'Haridwar', 'Kedarnath'],
  'West Bengal': ['Kolkata', 'Darjeeling', 'Siliguri', 'Digha', 'Sundarbans'],
  'Andaman & Nicobar': ['Port Blair', 'Havelock Island', 'Neil Island'],
  'Chandigarh': ['Chandigarh City'],
  'Dadra & Nagar Haveli': ['Silvassa'],
  'Daman & Diu': ['Daman', 'Diu'],
  'Delhi': ['New Delhi', 'Old Delhi', 'Mehrauli'],
  'Jammu & Kashmir': ['Srinagar', 'Gulmarg', 'Pahalgam', 'Jammu', 'Sonamarg'],
  'Ladakh': ['Leh', 'Nubra Valley', 'Pangong Lake'],
  'Lakshadweep': ['Kavaratti', 'Agatti', 'Bangaram'],
  'Puducherry': ['Puducherry City', 'Auroville']
};

export const locationSpecificTips = {
  'Ahmedabad': [
    { category: 'Places', text: 'Visit the peaceful Sabarmati Ashram', icon: Landmark },
    { category: 'Food', text: 'Street food night at Manek Chowk', icon: Coffee },
    { category: 'Activities', text: 'Explore the historic Pols of Ahmedabad', icon: Backpack },
    { category: 'Best Time', text: 'Winter (Nov to Feb) for sightseeing', icon: Sun },
    { category: 'Food', text: 'Try traditional Gujarati Thali', icon: Heart }
  ],
  'Surat': [
    { category: 'Food', text: 'Try the iconic Surti Locho and Undhiyu', icon: Heart },
    { category: 'Activities', text: 'Evening stroll at Dumas Beach line', icon: Waves },
    { category: 'Places', text: 'Visit the Dutch and Armenian Cemeteries', icon: Landmark },
    { category: 'Activities', text: 'Shop for diamonds and unique textiles', icon: Briefcase }
  ],
  'Junagadh': [
    { category: 'Activities', text: 'Trek the Girnar Hills (10,000 steps)', icon: Mountain },
    { category: 'Places', text: 'Explore the Mahabat Maqbara architecture', icon: Landmark },
    { category: 'Places', text: 'Visit the Uparkot Fort caves', icon: Landmark },
    { category: 'Activities', text: 'Take a lion safari in nearby Gir', icon: Camera }
  ],
  'Coorg': [
    { category: 'Activities', text: 'Take a guided coffee plantation tour', icon: Coffee },
    { category: 'Places', text: 'Witness the beauty of Abbey Falls', icon: Waves },
    { category: 'Activities', text: 'Trek to Tadiandamol Peak', icon: Mountain },
    { category: 'Food', text: 'Taste Pandi Curry (Pork Coorgi Style)', icon: Heart }
  ],
  'Udaipur': [
    { category: 'Places', text: 'Enjoy a sunset boat ride on Lake Pichola', icon: Waves },
    { category: 'Places', text: 'Explore the majestic City Palace', icon: Landmark },
    { category: 'Food', text: 'Dinner at a rooftop with Lake views', icon: Coffee },
    { category: 'Activities', text: 'Shopping at Hathi Pol Bazaar', icon: Backpack }
  ],
  'Mumbai': [
    { category: 'Places', text: 'Sunset at Marine Drive highlights', icon: Waves },
    { category: 'Food', text: 'Vada Pav and Pav Bhaji at Juhu Beach', icon: Heart },
    { category: 'Activities', text: 'Heritage walk in South Mumbai', icon: Landmark },
    { category: 'Best Time', text: 'Monsoon for the best city vibes', icon: Droplet }
  ]
};

export const cityItineraries = {
  'Ahmedabad': [
    { id: 1, title: 'Old City Heritage Walk', activities: ['Visit Swaminarayan Temple', 'Explore Pols of Ahmedabad', 'Traditional Lunch at Agashiye'] },
    { id: 2, title: 'Modern Ahmedabad', activities: ['Sabarmati Ashram', 'Adalaj Stepwell Visit', 'Riverfront Evening Stroll'] },
    { id: 3, title: 'Crafts & Culture', activities: ['Calico Museum of Textiles', 'Law Garden Night Market', 'Authentic Dinner at Manek Chowk'] }
  ],
  'Jaipur': [
    { id: 1, title: 'The Royal Welcome', activities: ['Hawa Mahal Landmark', 'City Palace Exploration', 'Jantar Mantar Observatory'] },
    { id: 2, title: 'Victory & Grandeur', activities: ['Amer Fort Elephant Ride', 'Nahargarh Fort Sunset View', 'Chokhi Dhani Dinner Experience'] },
    { id: 3, title: 'Bazaars & Souvenirs', activities: ['Johari Bazaar Shopping', 'Bapu Bazaar Jewelry Hunting', 'Jal Mahal Stopover'] }
  ],
  'Mumbai': [
    { id: 1, title: 'Gateway to Dreams', activities: ['Gateway of India Visit', 'Marine Drive Sunset Stroll', 'Leopold Cafe Heritage Lunch'] },
    { id: 2, title: 'Heritage & Cinema', activities: ['CSMT Station Walkthrough', 'Kala Ghoda Art District', 'Film City Bollywood Tour'] },
    { id: 3, title: 'Coastal Vibes', activities: ['Bandra Worli Sea Link', 'Juhu Beach Street Food', 'Colaba Causeway Shopping'] }
  ],
  'Kochi': [
    { id: 1, title: 'Colonial Charm', activities: ['Fort Kochi Heritage Walk', 'Chinese Fishing Nets Watch', 'Kathakali Performance Evening'] },
    { id: 2, title: 'Backwater Bliss', activities: ['Vembanad Lake Cruise', 'Alleppey Houseboat Lunch', 'Kerala Spices Market'] },
    { id: 3, title: 'Palaces & Temples', activities: ['Mattancherry Palace', 'Paradesi Synagogue', 'Hill Palace Museum'] }
  ],
  'South Goa': [
    { id: 1, title: 'Pristine Beaches', activities: ['Palolem Beach Bliss', 'Cola Beach Hidden Trek', 'Seaside Shack Dinner'] },
    { id: 2, title: 'Hidden Gems', activities: ['Cabo de Rama Fort History', 'Netravali Wildlife Sanctuary', 'Agonda Sunset Relax'] },
    { id: 3, title: 'Spices & Heritage', activities: ['Sahakari Spice Farm Tour', 'Dudhsagar Falls Excursion', 'Old Goa Heritage Churches'] }
  ],
  'Shimla': [
    { id: 1, title: 'The Ridge & Mall', activities: ['Mall Road Heritage Stroll', 'Christ Church Visit', 'Scandal Point History'] },
    { id: 2, title: 'Kufri Adventure', activities: ['Kufri Hill Excursion', 'Snow Leopard Watching', 'Himalayan Nature Park'] },
    { id: 3, title: 'Jakhu Hill Hike', activities: ['Jakhu Temple Monkey Trail', 'Annandale Army Museum', 'Ice Skating Rink (Winter)'] }
  ],
  'Coorg': [
    { id: 1, title: 'Coffee & Nature', activities: ['Coffee Plantation Tour', 'Abbey Falls Trek', 'Raja’s Seat Sunset'] },
    { id: 2, title: 'Elephant Experience', activities: ['Dubare Elephant Camp', 'Namdroling Monastery (Inner Peace)', 'Golden Temple'] },
    { id: 3, title: 'River & Wildlife', activities: ['Cauvery River Activities', 'Madikeri Fort History', 'Kaveri Nisargadhama'] }
  ],
  'Manali': [
    { id: 1, title: 'Snow & Peaks', activities: ['Solang Valley Snow Sports', 'Rohtang Pass (Subject to availability)', 'Hadimba Devi Temple'] },
    { id: 2, title: 'Village Life', activities: ['Old Manali Heritage Walk', 'Vashisht Temple & Hot Springs', 'Mall Road Shopping'] },
    { id: 3, title: 'Beas River Vibes', activities: ['River Rafting in Beas', 'Jogini Waterfalls Trek', 'Cafe Hopping in Old Manali'] }
  ],
  'Amritsar': [
    { id: 1, title: 'Spiritual Morning', activities: ['Golden Temple Holy Visit', 'Langar Community Meal', 'Jallianwala Bagh Memorial'] },
    { id: 2, title: 'Patriotic Evening', activities: ['Wagah Border Ceremony', 'Partition Museum History', 'Authentic Dinner at Kesar Da Dhaba'] },
    { id: 3, title: 'Food & Bazaar', activities: ['Hall Bazaar Highlights', 'Amritsari Kulcha Breakfast', 'Gobindgarh Fort Show'] }
  ],
  'Varanasi': [
    { id: 1, title: 'Ghats & Aarti', activities: ['Ganga Morning Boat Ride', 'Kashi Vishwanath Temple', 'Dashashwamedh Ghat Aarti'] },
    { id: 2, title: 'Sarnath Excursion', activities: ['Visit Sarnath Dhamekh Stupa', 'Sarnath Archaeological Museum', 'Silk Weaving Center Tour'] },
    { id: 3, title: 'Spiritual Lanes', activities: ['Explore Varanasi Narrow Bylanes', 'Local Street Food Tasting', 'Assi Ghat Sunset'] }
  ],
  'Agra': [
    { id: 1, title: 'Iconic Taj Mahal', activities: ['Taj Mahal Sunrise Experience', 'Agra Fort Guided Tour', 'Itimad-ud-Daulah'] },
    { id: 2, title: 'The Lost City', activities: ['Fatehpur Sikri Historical Tour', 'Buland Darwaza Hike', 'Tomb of Salim Chishti'] },
    { id: 3, title: 'Local Heritage', activities: ['Panch Mahal Exploration', 'Marble Inlay Work Demonstration', 'Mehtab Bagh at Sunset'] }
  ],
  'Kolkata': [
    { id: 1, title: 'Colonial History', activities: ['Victoria Memorial Hall', 'Classic Tram Ride in Kolkata', 'Heritage Walk in Maidan'] },
    { id: 2, title: 'Ganga & Temples', activities: ['Dakshineswar Kali Temple', 'Belur Math Meditation', 'Princes Ghat Sunset Walk'] },
    { id: 3, title: 'Literature & Food', activities: ['College Street Coffee House', 'Bhojohori Manna Lunch', 'Indian Museum Visit'] }
  ]
};

export const defaultItinerary = [
  {
    id: 1,
    title: 'Arrival & Exploration',
    activities: ['Check-in to hotel', 'City tour', 'Local market visit']
  },
  {
    id: 2,
    title: 'Heritage & Culture',
    activities: ['Visit historical monuments', 'Museum tour', 'Traditional dinner']
  },
  {
    id: 3,
    title: 'Adventure & Departure',
    activities: ['Morning adventure activity', 'Shopping', 'Departure']
  }
];
