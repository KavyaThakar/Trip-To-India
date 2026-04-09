import { useState } from "react";

const BASE_URL = "http://10.80.1.148:5000/api";

export default function ResetPassword({ token, onSuccess }) {
    const [password, setPassword] = useState("");

    const handleReset = async () => {
        try {
            const res = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            alert(data.message || "Password reset");

            onSuccess();

        } catch (err) {
            alert("Error resetting password");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Reset Password</h2>

            <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleReset}>
                Reset Password
            </button>
        </div>
    );
}