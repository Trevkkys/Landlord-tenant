import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("vitRentUser"));
    } catch (e) {
        user = null;
    }

    const isLoggedIn =
        user &&
        user.email &&
        user.email.trim() !== "";
    const role = user?.role?.toLowerCase() || null;

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

            <div className="dashboard-nav-links">

                {/* =========================
        🔓 NOT LOGGED IN (ONLY PUBLIC LINKS)
    ========================= */}
                {!isLoggedIn && (
                    <>
                        <span onClick={() => navigate("/")}>Home</span>
                        <span onClick={() => navigate("/properties")}>Properties</span>
                        <span onClick={() => navigate("/login")}>Login</span>
                        <span onClick={() => navigate("/register")}>Register</span>
                    </>
                )}

                {/* =========================
        🔐 LOGGED IN (APP LINKS ONLY)
    ========================= */}
                {isLoggedIn && (
                    <>
                        <span onClick={() => navigate("/")}>Home</span>

                        {/* ONLY TENANT CAN SEE PROPERTIES */}
                        {role === "tenant" && (
                            <>
                                <span onClick={() => navigate("/properties")}>Properties</span>
                                <span onClick={() => navigate("/tenant")}>Dashboard</span>
                            </>
                        )}

                        {/* LANDLORD - NO LIST PROPERTY */}
                        {role === "landlord" && (
                            <>
                                <span onClick={() => navigate("/landlord")}>Dashboard</span>
                            </>
                        )}

                        {/* AGENT - NO LIST PROPERTY */}
                        {role === "agent" && (
                            <>
                                <span onClick={() => navigate("/agent")}>Dashboard</span>
                            </>
                        )}

                        <span onClick={() => navigate("/profile")}>Profile</span>

                        <span
                            onClick={() => {
                                localStorage.removeItem("vitRentUser");
                                navigate("/login");
                            }}
                            style={{
                                color: "black",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}
                        >
                            Logout
                        </span>
                    </>
                )}

            </div>
        </nav >
    );
}