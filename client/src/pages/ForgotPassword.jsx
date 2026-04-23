import { useState } from "react";

import BASE_URL from "../api/apiConfig";

export default function ForgotPassword({ onBack }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        if (!email) return;
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            setMessage(data.message || "Check your email");

        } catch (err) {
            setMessage("Error sending email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Forgot Password</h2>

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            {message && <p style={{ color: message.includes("Error") ? '#e53e3e' : '#276749', marginBottom: '16px' }}>{message}</p>}

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <br /><br />

            <button onClick={onBack}>
                Back to Login
            </button>
        </div>
    );
}