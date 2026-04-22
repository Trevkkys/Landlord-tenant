import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("");
    const [showVitelModal, setShowVitelModal] = useState(false);
    const [vitelNumber, setVitelNumber] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {

        if (!role) {
            alert("Please select a role");
            return;
        }

        if (!email || email.trim() === "") {
            alert("Email is required");
            return;
        }

        const user = {
            name: "John Doe",
            email: email.trim(),
            role: role.toLowerCase()
        };

        localStorage.setItem("vitRentUser", JSON.stringify(user));

        if (role.toLowerCase() === "landlord") navigate("/landlord");
        if (role.toLowerCase() === "tenant") navigate("/tenant");
        if (role.toLowerCase() === "agent") navigate("/agent");
    }
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

                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <span
                            className="eye-icon"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

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

                    <div
                        className="vitel-auth-box"
                        onClick={() => setShowVitelModal(true)}
                    >
                        <span className="vitel-text">or sign in with</span>
                        <img src="/vitel-logo.png" alt="Vitel Wireless" />
                    </div>

                    <p className="signup-text">
                        New user?{" "}
                        <span onClick={() => navigate("/register")}>
                            Sign up here
                        </span>
                    </p>

                    <div className="auth-back">

                        <Link to="/" className="back-link">
                            ← Back to Home
                        </Link>

                        {showVitelModal && (
                            <div className="vitel-overlay">
                                <div className="vitel-modal">

                                    {/* HEADER */}
                                    <div className="vitel-modal-header">
                                        <img src="/phone-icon.png" alt="phone" />
                                        <h2>Sign In with Vitel</h2>
                                    </div>

                                    <p className="vitel-subtext">
                                        We'll send a one-time code to your number
                                    </p>

                                    {/* INPUT */}
                                    <div className="vitel-input-box">
                                        <input
                                            type="text"
                                            placeholder="Vitel Number"
                                            value={vitelNumber}
                                            onChange={(e) => setVitelNumber(e.target.value)}
                                        />
                                    </div>

                                    <p className="vitel-info">
                                        ⓘ  All Vitel numbers start with 0712
                                    </p>

                                    {/* BUTTON */}
                                    <button className="vitel-otp-btn">
                                        Send OTP
                                    </button>

                                    {/* CLOSE */}
                                    <span
                                        className="vitel-close"
                                        onClick={() => setShowVitelModal(false)}
                                    >
                                        ✕
                                    </span>

                                </div>
                            </div>
                        )}


                    </div>

                </div>

            </div>

        </div>
    );
}