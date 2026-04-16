import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {

        if (!role) {
            alert("Please select a role");
            return;
        }

        const user = {
            name: "John Doe",
            email,
            role: role.toLowerCase()
        };

        localStorage.setItem("vitRentUser", JSON.stringify(user));

        if (role === "Landlord") navigate("/landlord");
        if (role === "Tenant") navigate("/tenant");
        if (role === "Agent") navigate("/agent");
    };

    return (
        <div className="auth-page">

            {/* LEFT SIDE (BRAND PANEL) */}
            <div className="auth-left">

                <h1>VitRent</h1>
                <p>
                    Manage rentals, tenants, agents and properties in one powerful platform.
                </p>

                <div className="auth-features">
                    <p>✔ Property management made simple</p>
                    <p>✔ Real-time tenant requests</p>
                    <p>✔ Secure landlord–agent system</p>
                </div>

            </div>

            {/* RIGHT SIDE (FORM) */}
            <div className="auth-right">

                <div className="auth-card">

                    <h2>Welcome Back 👋</h2>
                    <p>Login to continue</p>

                    <input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* ROLE SELECTOR */}
                    <p className="role-title">Select your role</p>

                    <div className="role-buttons">

                        {["Tenant", "Landlord", "Agent"].map((r) => (
                            <button
                                key={r}
                                onClick={() => setRole(r)}
                                className={role === r ? "role-active" : ""}
                            >
                                {r}
                            </button>
                        ))}

                    </div>

                    <button className="primary login-btn" onClick={handleLogin}>
                        Login
                    </button>

                    <p className="signup-text">
                        New user?{" "}
                        <span onClick={() => navigate("/register")}>
                            Sign up here
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
}