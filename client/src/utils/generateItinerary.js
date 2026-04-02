// Logic Engine to generate dynamic itineraries based on multi-step parameters
export const generateItinerary = (answers) => {
  const { budget, travelMates, travelersCount, destinationType, tripDuration, season, transport } = answers;

  // Base mapping depending on Destination Type
  let primaryDestinations = [];
  let name = "";
  
  if (destinationType === 'Mountains') {
    primaryDestinations = ['Manali', 'Shimla', 'Dharamshala'];
    name = "Himalayan Retreat";
  } else if (destinationType === 'Beaches') {
    primaryDestinations = ['Goa', 'Kerala', 'Andaman'];
    name = "Coastal Paradise";
  } else if (destinationType === 'Heritage') {
    primaryDestinations = ['Jaipur', 'Udaipur', 'Agra'];
    name = "Royal Legacy Tour";
  } else if (destinationType === 'City') {
    primaryDestinations = ['Mumbai', 'Delhi', 'Bangalore'];
    name = "Urban Escape";
  } else if (destinationType === 'Adventure') {
    primaryDestinations = ['Rishikesh', 'Manali', 'Leh'];
    name = "Thrill Seeker's Journey";
  } else {
    primaryDestinations = ['Kerala', 'Goa', 'Rajasthan'];
    name = "Classic India Tour";
  }

  // Season Modifiers
  if (season === 'Summer') {
    primaryDestinations.unshift('Shimla', 'Ooty'); // Prioritize Hill stations
  } else if (season === 'Winter') {
    primaryDestinations.unshift('Rajasthan', 'Goa'); // Prioritize Winter sun
  } else if (season === 'Monsoon') {
    primaryDestinations.unshift('Kerala', 'Coorg'); // Prioritize Monsoon magic
  }

  // Remove exact duplicates while preserving order
  primaryDestinations = [...new Set(primaryDestinations)];

  // Determine Duration scale
  const dayCount = tripDuration;
  let destCount = 1;
  
  if (dayCount <= 3) {
    destCount = 1;
  } else if (dayCount <= 7) {
    destCount = 2;
  } else {
    destCount = 3;
  }

  // Adjust destination count based on Transport
  if (transport === 'Flight') {
    destCount = Math.min(destCount + 1, primaryDestinations.length);
  } else if (transport === 'Bus' || transport === 'Car') {
    destCount = 1; // Keep to nearby places
  }

  // Select final destinations
  const finalDestinations = primaryDestinations.slice(0, destCount);
  const title = `${name} in ${finalDestinations.join(' & ')}`;

  // Generate Day-wise Plan
  const plan = [];
  let currentDestIdx = 0;

  for (let d = 1; d <= dayCount; d++) {
    // Switch destination evenly based on total days
    if (destCount > 1 && d > (dayCount / destCount) * (currentDestIdx + 1)) {
        currentDestIdx = Math.min(currentDestIdx + 1, finalDestinations.length - 1);
    }
    
    const currentLoc = finalDestinations[currentDestIdx];

    if (d === 1) {
      plan.push({
        day: d,
        title: `Arrival in ${currentLoc}`,
        desc: `Arrive via ${transport}. Check into your accommodation, freshen up, and spend the evening enjoying a relaxing walk around the local area.`,
        tags: ['Leisure', 'Arrival']
      });
    } else if (d === dayCount) {
      plan.push({
        day: d,
        title: `Departure from ${currentLoc}`,
        desc: `Enjoy a final breakfast. Pick up some sweet souvenirs before heading to the departure point for your ${transport} journey back home.`,
        tags: ['Shopping', 'Departure']
      });
    } else {
      // Internal days
      if (d % 2 === 0) {
        plan.push({
          day: d,
          title: `Exploring the Heart of ${currentLoc}`,
          desc: `Dedicate today to discovering the major attractions of ${currentLoc}. Take a guided tour to deeply immerse yourself in the culture and history.`,
          tags: ['Culture', 'Sightseeing']
        });
      } else {
        plan.push({
          day: d,
          title: `Adventure & Cuisine in ${currentLoc}`,
          desc: `Step out of your comfort zone with a morning activity. In the evening, treat yourself to the famous local delicacies of ${currentLoc}.`,
          tags: [destinationType === 'Adventure' ? 'Thrill' : 'Food', 'Exploration']
        });
      }
    }
  }

  return {
    title,
    destinations: finalDestinations,
    travelMode: transport,
    budgetPerPerson: budget,
    totalTravelers: travelersCount,
    groupType: travelMates,
    days: dayCount,
    plan
  };
};
