import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from "../api/auth";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("");
    const [showVitelModal, setShowVitelModal] = useState(false);
    const [vitelNumber, setVitelNumber] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Fill all fields");
            return;
        }

        try {
            const res = await loginUser({
                email,
                password,
            });

            console.log(res.data);

            // SAVE USER + TOKEN
            localStorage.setItem(
                "vitRentUser",
                JSON.stringify(res.data.user || res.data)
            );

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }

            // ROUTE BY ROLE (important)
            const role = res.data.user?.role || res.data.role;

            if (role === "landlord") navigate("/landlord");
            else if (role === "tenant") navigate("/tenant");
            else if (role === "agent") navigate("/agent");
            else navigate("/");

        } catch (err) {
            console.error(err);

            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Login failed: Invalid credentials";

            alert(message);
        }
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