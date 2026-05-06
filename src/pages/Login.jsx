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
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSendOtp = async () => {
        if (!vitelNumber) {
            setError("Enter your Vitel number");
            return;
        }

        try {
            // Replace with your actual Axios/Fetch call
            const res = await axios.post("/api/v1/auth/vitel/request-otp", {
                phone: vitelNumber
                // Add role here if your colleague's API requires it
            });

            if (res.status === 200 || res.status === 201) {
                // Success! Now navigate to your OTP Verification page
                // Or open a second modal for the code input
                navigate("/verify-otp", { state: { phone: vitelNumber } });
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP");
        }
    };
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

            console.log("Full API Response:", res.data);

            const token = res.data.access_token;

            if (token) {
                localStorage.setItem("token", token);
                console.log("Success: access_token saved!");
            }

            // 2. EXTRACT USER DATA
            const userData = res.data.user || res.data.data?.user || res.data;
            localStorage.setItem("vitUser", JSON.stringify(userData));

            // 3. EXTRACT ROLE & NAVIGATE
            const userRole = userData.role || "tenant";

            if (userRole === "landlord") navigate("/landlord");
            else if (userRole === "tenant") navigate("/tenant");
            else if (userRole === "agent") navigate("/agent");
            else navigate("/");

        } catch (err) {
            console.error("Login Error:", err);
            const message =
                err.response?.data?.detail ||
                err.response?.data?.message ||
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
                                    <button
                                        className="vitel-otp-btn"
                                        onClick={handleSendOtp}
                                    >
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