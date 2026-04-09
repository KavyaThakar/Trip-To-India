const BASE_URL = "http://10.80.1.148:5000/api";

export const generateAIRecommendation = async (prefData) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/recommendation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(prefData)
    });
    return res.json();
};

export const generateCityItinerary = async (city, duration = 5, tripType = "") => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/itinerary`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ city, duration, tripType })
    });
    return res.json();
};

export const getUserItineraries = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/itinerary`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return res.json();
};
