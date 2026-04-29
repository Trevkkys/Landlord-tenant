import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function Register() {
    const navigate = useNavigate();

    // FORM STATES
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNin, setShowNin] = useState(false);
    const [countryCode, setCountryCode] = useState("+234");
    const [nin, setNin] = useState("");
    const [role, setRole] = useState("");
    const [agree, setAgree] = useState(false);

    // TOGGLE STATES
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = () => {
        // VALIDATION
        if (!name || !email || !phone || !city || !password || !confirmPassword || !nin || !role) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // PHONE VALIDATION (basic)
        if (!/^\d{10,15}$/.test(phone)) {
            alert("Enter a valid phone number");
            return;
        }

        // NIN VALIDATION (11 digits)
        if (!/^\d{11}$/.test(nin)) {
            alert("NIN must be exactly 11 digits");
            return;
        }

        if (!agree) {
            alert("Please agree to the Terms of Service and Privacy Policy");
            return;
        }

        const user = {
            name,
            email,
            phone: countryCode + phone,
            nin,
            city,
            role: role.toLowerCase(),
        };

        // SAVE USER
        localStorage.setItem("vitRentUser", JSON.stringify(user));

        // ROUTE BY ROLE (FIXED)
        if (role.toLowerCase() === "landlord") navigate("/landlord");
        if (role.toLowerCase() === "tenant") navigate("/tenant");
        if (role.toLowerCase() === "agent") navigate("/agent");
    }

    const maskNIN = (value) => {
        if (value.length <= 4) return value;
        const start = value.slice(0, 3);
        const end = value.slice(-2);
        const masked = "*".repeat(value.length - 5);
        return start + masked + end;
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

                    {/* NAME */}
                    <input
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* EMAIL */}
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* PHONE */}
                    <PhoneInput
                        international
                        defaultCountry="NG"
                        value={phone}
                        onChange={setPhone}
                    />

                    {/* CITY */}
                    <input
                        placeholder="City / Area"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    {/* PASSWORD */}
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

                    {/* CONFIRM PASSWORD */}
                    <div className="password-field">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span
                            className="eye-icon"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    {/* NIN */}
                    <div className="password-field">
                        <input
                            type={showNin ? "text" : "password"}
                            placeholder="NIN (11-digit National ID Number)"
                            value={nin}
                            onChange={(e) => setNin(e.target.value.replace(/\D/g, ""))}
                        />

                        <span
                            className="eye-icon"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowNin(!showNin)}
                        >
                            {showNin ? "🙈" : "👁️"}
                        </span>
                    </div>

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

                    <div className="terms-block">
                        <label className="terms-row">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />

                            <span className="terms-text">
                                I agree to the <span className="terms-link">Terms of Service</span> and{" "}
                                <span className="terms-link">Privacy Policy</span>
                            </span>
                        </label>
                    </div>


                    {/* SUBMIT */}
                    <button className="primary login-btn" onClick={handleRegister}>
                        Create Account
                    </button>

                    {/* LOGIN */}
                    <p className="signup-text">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")}>
                            Login here
                        </span>
                    </p>

                    {/* BACK */}
                    <div className="auth-back">
                        <Link to="/" className="back-link">
                            ← Back to Home
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
}