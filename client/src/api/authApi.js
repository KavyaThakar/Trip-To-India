import BASE_URL from "./apiConfig";

export const forgotPassword = async (email) => {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    return res.json();
};

export const resetPassword = async (token, password) => {
    const res = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
    });

    return res.json();
};