import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        // HARD-CODED ADMIN CREDENTIALS (for now)
        const ADMIN_EMAIL = "admin@vitrent.com";
        const ADMIN_PASSWORD = "admin123";

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const adminUser = {
                name: "VitRent Admin",
                email: ADMIN_EMAIL,
                role: "admin"
            };

            localStorage.setItem("vitRentUser", JSON.stringify(adminUser));

            navigate("/admin/dashboard");
        } else {
            setError("Invalid admin credentials");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-right">
                <div className="auth-card">

                    <h2>Admin Access 🔐</h2>
                    <p>Authorized personnel only</p>

                    <input
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                            {error}
                        </p>
                    )}

                    <button
                        className="primary login-btn"
                        onClick={handleLogin}
                    >
                        Login as Admin
                    </button>

                    <p
                        onClick={() => navigate("/login")}
                        style={{
                            marginTop: "10px",
                            cursor: "pointer",
                            fontSize: "12px",
                            color: "#069494"
                        }}
                    >
                        ← Back to User Login
                    </p>

                </div>
            </div>
        </div>
    );
}