import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("vitRentUser"));

    const role = user?.role?.toLowerCase(); // ✅ FIX: normalize role

    const isLoggedIn = !!user;

    const logout = () => {
        localStorage.removeItem("vitRentUser");
        navigate("/login");
    };

    return (
        <nav className="dashboard-nav">

            {/* LOGO */}
            <h3 onClick={() => navigate("/")}>
                VitRent
            </h3>

            {/* ROLE BADGE (NEW - CLEAN INDICATOR) */}
            {role && (
                <span style={{
                    marginLeft: "10px",
                    fontSize: "12px",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    background: "#fff",
                    color: "#069494",
                    fontWeight: "bold"
                }}>
                    {role.toUpperCase()}
                </span>
            )}

            {/* NAV LINKS */}
            <div className="dashboard-nav-links">

                {/* NOT LOGGED IN (PUBLIC NAVBAR) */}
                {!isLoggedIn && (
                    <>
                        <span onClick={() => navigate("/")}>Home</span>
                        <span onClick={() => navigate("/login")}>Login</span>
                        <span onClick={() => navigate("/register")}>Register</span>
                    </>
                )}

                {/* LOGGED IN - LANDLORD */}
                {role === "landlord" && (
                    <>
                        <span onClick={() => navigate("/")}>Home</span>
                        <span onClick={() => navigate("/landlord")}>Dashboard</span>
                        <span onClick={() => navigate("/profile")}>Profile</span>
                    </>
                )}

                {/* LOGGED IN - TENANT */}
                {role === "tenant" && (
                    <>
                        <span onClick={() => navigate("/")}>Home</span>
                        <span onClick={() => navigate("/tenant")}>Search</span>
                        <span onClick={() => navigate("/profile")}>Profile</span>
                    </>
                )}

                {/* LOGGED IN - AGENT */}
                {role === "agent" && (
                    <>
                        <span onClick={() => navigate("/")}>Home</span>
                        <span onClick={() => navigate("/agent")}>Dashboard</span>
                        <span onClick={() => navigate("/profile")}>Profile</span>
                    </>
                )}

                {/* LOGOUT (ONLY WHEN LOGGED IN) */}
                {isLoggedIn && (
                    <span
                        onClick={logout}
                        style={{ color: "black", fontWeight: "bold", cursor: "pointer" }}
                    >
                        Logout
                    </span>
                )}

            </div>

        </nav>
    );
}