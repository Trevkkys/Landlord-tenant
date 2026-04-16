import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleRegister = () => {

        if (!name || !email || !password || !role) {
            alert("Please fill all fields");
            return;
        }

        const user = {
            name,
            email,
            role: role.toLowerCase()
        };

        // save user (simulate signup)
        localStorage.setItem("vitRentUser", JSON.stringify(user));

        // redirect
        if (role === "Landlord") navigate("/landlord");
        if (role === "Tenant") navigate("/tenant");
        if (role === "Agent") navigate("/agent");
    };

    return (
        <div className="auth-page">

            {/* LEFT SIDE */}
            <div className="auth-left">

                <h1>Join VitRent</h1>
                <p>
                    Create your account and start managing properties or finding homes easily.
                </p>

                <div className="auth-features">
                    <p>✔ Smart property listings</p>
                    <p>✔ Trusted landlord–agent system</p>
                    <p>✔ Fast and secure rental process</p>
                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="auth-right">

                <div className="auth-card">

                    <h2>Create Account 🚀</h2>
                    <p>Sign up to get started</p>

                    <input
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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

                    {/* ROLE */}
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

                    <button className="primary login-btn" onClick={handleRegister}>
                        Create Account
                    </button>

                    <p className="signup-text">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")}>
                            Login here
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
}