export const heroSlides = [
  {
    id: 'slide-1',
    title: 'Serene Kerala Backwaters',
    subtitle: 'Experience tranquility in God\'s Own Country',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop',
    stateId: 'kerala'
  },
  {
    id: 'slide-2',
    title: 'Majestic Taj Mahal',
    subtitle: 'Witness the eternal monument of love',
    image: 'https://images.unsplash.com/photo-1564507592208-0282ee0a90af?q=80&w=2074&auto=format&fit=crop',
    stateId: 'uttar_pradesh'
  },
  {
    id: 'slide-3',
    title: 'Royal Rajasthan Forts',
    subtitle: 'Dive into the history of the Land of Kings',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop',
    stateId: 'rajasthan'
  }
];

export const statesData = [
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    tagTitle: 'ROYAL RAJASTHAN',
    tagline: 'Land of Kings - Majestic forts, palaces, and desert landscapes',
    thumbnail: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop',
    isPopular: true,
    tabs: {
      places: [
        { name: 'Jaipur', desc: 'Click to explore Jaipur in detail' },
        { name: 'Udaipur', desc: 'Click to explore Udaipur in detail' },
        { name: 'Jodhpur', desc: 'Click to explore Jodhpur in detail' },
        { name: 'Jaisalmer', desc: 'Click to explore Jaisalmer in detail' },
        { name: 'Pushkar', desc: 'Click to explore Pushkar in detail' },
        { name: 'Ajmer', desc: 'Click to explore Ajmer in detail' }
      ],
      attractions: [
        { name: 'Amber Fort' },
        { name: 'Hawa Mahal' },
        { name: 'City Palace' },
        { name: 'Mehrangarh Fort' }
      ],
      food: [
        { name: 'Dal Baati Churma', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?q=80&w=800&auto=format&fit=crop' },
        { name: 'Laal Maas', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?q=80&w=800&auto=format&fit=crop' },
        { name: 'Ghewar', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?q=80&w=800&auto=format&fit=crop' },
        { name: 'Pyaaz Kachori', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?q=80&w=800&auto=format&fit=crop' }
      ],
      shopping: [
        { name: 'Block printed textiles' },
        { name: 'Jewelry' },
        { name: 'Pottery' },
        { name: 'Leather goods' }
      ],
      experiences: {
        description: 'Experience the authentic culture of Rajasthan through immersive activities and local interactions.',
        list: [
          'Traditional festivals and celebrations unique to the region',
          'Local cooking classes and food walks',
          'Village tours and homestay experiences',
          'Craft workshops and artisan interactions'
        ]
      },
      hiddenGems: {
        description: 'Discover lesser-known treasures in Rajasthan that offer unique experiences away from the crowds.',
        list: [
          { title: 'Offbeat Villages', desc: 'Explore remote villages that preserve traditional lifestyles and ancient customs.', color: 'orange' },
          { title: 'Secret Viewpoints', desc: 'Hidden spots offering breathtaking views known only to locals.', color: 'green' },
          { title: 'Local Eateries', desc: 'Authentic local restaurants serving traditional recipes passed down through generations.', color: 'orange' }
        ]
      }
    }
  },
  {
    id: 'kerala',
    name: 'Kerala',
    tagTitle: 'GOD\'S OWN COUNTRY',
    tagline: 'Serene backwaters, lush greenery, and pristine beaches',
    thumbnail: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop',
    isPopular: true,
    tabs: {
      places: [
        { name: 'Munnar', desc: 'Click to explore Munnar' },
        { name: 'Alleppey', desc: 'Click to explore Alleppey' },
        { name: 'Kochi', desc: 'Click to explore Kochi' }
      ],
      attractions: [
        { name: 'Backwaters' },
        { name: 'Athirapally Waterfalls' }
      ],
      food: [], shopping: [], experiences: [], hiddenGems: []
    }
  },
  {
    id: 'goa',
    name: 'Goa',
    tagTitle: 'BEACH PARADISE',
    tagline: 'Golden beaches, Portuguese heritage, vibrant nightlife',
    thumbnail: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2070&auto=format&fit=crop',
    isPopular: true,
    tabs: {
      places: [
        { name: 'Panaji', desc: 'Click to explore Panaji' },
        { name: 'Palolem', desc: 'Click to explore Palolem' },
        { name: 'Baga', desc: 'Click to explore Baga Beach' }
      ],
      attractions: [
        { name: 'Basilica of Bom Jesus' },
        { name: 'Dudhsagar Falls' }
      ],
      food: [], shopping: [], experiences: [], hiddenGems: []
    }
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    tagTitle: 'CITY OF DREAMS',
    tagline: 'Financial capital, ancient caves, and hill stations',
    thumbnail: 'https://images.unsplash.com/photo-1522442478523-28ebfffa19b0?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1522442478523-28ebfffa19b0?q=80&w=2070&auto=format&fit=crop',
    isPopular: false,
    tabs: {
      places: [
        { name: 'Mumbai', desc: 'Click to explore Mumbai' },
        { name: 'Pune', desc: 'Click to explore Pune' },
        { name: 'Lonavala', desc: 'Click to explore Lonavala' }
      ],
      attractions: [
        { name: 'Gateway of India' },
        { name: 'Ajanta & Ellora Caves' }
      ],
      food: [], shopping: [], experiences: [], hiddenGems: []
    }
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    tagTitle: 'JEWEL OF WEST',
    tagline: 'Rich heritage, white desert, and Asiatic lions',
    thumbnail: 'https://images.unsplash.com/photo-1605221946802-ab6ee465bba8?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1605221946802-ab6ee465bba8?q=80&w=2070&auto=format&fit=crop',
    isPopular: false,
    tabs: {
      places: [
        { name: 'Ahmedabad', desc: 'Click to explore Ahmedabad in detail' },
        { name: 'Kutch', desc: 'Click to explore Kutch in detail' },
        { name: 'Somnath', desc: 'Click to explore Somnath in detail' }
      ],
      attractions: [
        { name: 'Statue of Unity' },
        { name: 'Rann of Kutch' }
      ],
      food: [], shopping: [], experiences: [], hiddenGems: []
    }
  }
];

// Combine more placeholders to make 28 states
const placeholders = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Madhya Pradesh', 
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal'
];

placeholders.forEach(stateName => {
  statesData.push({
    id: stateName.toLowerCase().replace(/ /g, '_'),
    name: stateName,
    tagTitle: 'EXPLORE ' + stateName.toUpperCase(),
    tagline: 'Discover the rich culture and heritage',
    thumbnail: 'https://images.unsplash.com/photo-1506461883276-594a12b11dc3?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1506461883276-594a12b11dc3?q=80&w=2070&auto=format&fit=crop',
    isPopular: false,
    tabs: {
      places: [{ name: 'Capital City', desc: 'Explore the capital' }],
      attractions: [{ name: 'Famous Landmark' }],
      food: [], shopping: [], experiences: [], hiddenGems: []
    }
  });
});
