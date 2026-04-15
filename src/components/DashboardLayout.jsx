import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ title, subtitle, children }) {

    const navigate = useNavigate();

    return (
        <div className="dashboard-layout">

            {/* TOP NAV */}
            <div className="dashboard-nav">

                <h3 onClick={() => navigate("/")}>VitRent</h3>

                <div className="dashboard-nav-links">

                    <span>Dashboard</span>
                    <span>Listings</span>
                    <span>Requests</span>
                    <span>Earnings</span>

                    <span onClick={() => navigate("/profile")}>
                        Profile
                    </span>

                </div>
            </div>

            {/* HEADER */}
            <div className="dashboard-header">
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>

            {/* CONTENT */}
            <div className="dashboard-content">
                {children}
            </div>

        </div>
    );
}