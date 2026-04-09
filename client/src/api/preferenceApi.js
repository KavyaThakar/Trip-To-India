const BASE_URL = "http://10.80.1.148:5000/api";

export const savePreferences = async (prefData) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const res = await fetch(`${BASE_URL}/preferences`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(prefData)
    });

    return res.json();
};

export const getPreferences = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/preferences`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return res.json();
};
