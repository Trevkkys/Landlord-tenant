import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleRegister = () => {
        if (!role) return alert("Please select a role");

        // for now just redirect like login (no backend yet)
        if (role === "Tenant") navigate("/tenant");
        if (role === "Landlord") navigate("/landlord");
        if (role === "Agent") navigate("/agent");
    };

    return (
        <div className="login-container">
            <div className="login-box register-box">

                <h2>Create Account</h2>
                <p className="login-subtext">Join VitRent today</p>

                <input type="text" placeholder="Full Name" />
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
                    onClick={handleRegister}
                >
                    Create Account
                </button>

            </div>
        </div>
    );
}