import { useState } from "react";

const BASE_URL = "http://10.80.1.148:5000/api";

export default function ForgotPassword({ onBack }) {
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            alert(data.message || "Check your email");

        } catch (err) {
            alert("Error sending email");
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

            <button onClick={handleSubmit}>
                Send Reset Link
            </button>

            <br /><br />

            <button onClick={onBack}>
                Back to Login
            </button>
        </div>
    );
}