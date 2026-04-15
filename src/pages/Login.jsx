import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!role) return alert("Please select a role");

        if (role === "Tenant") navigate("/tenant");
        if (role === "Landlord") navigate("/landlord");
        if (role === "Agent") navigate("/agent");
    };

    return (
        <div className="login-container">
            <div className="login-box">

                <h2>Welcome Back</h2>
                <p className="login-subtext">Login to your VitRent account</p>

                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />

                <p className="role-title">Select Account Type</p>

                <div className="role-buttons">
                    {["Tenant", "Landlord", "Agent"].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            className={role === r ? "primary" : ""}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                <button
                    className="primary login-btn-full"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>
        </div>
    );
}