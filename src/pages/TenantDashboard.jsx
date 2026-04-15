import React from "react";
import { useNavigate } from "react-router-dom";

export default function TenantDashboard() {

    const navigate = useNavigate();

    const properties = [
        { id: 1, title: "3 Bedroom Flat", price: "₦1.2M", location: "Lekki" },
        { id: 2, title: "2 Bedroom Apartment", price: "₦800K", location: "Yaba" },
    ];

    return (
        <div className="dashboard-layout">

            {/* NAV */}
            <div className="dashboard-nav">
                <h3>VitRent</h3>

                <div className="dashboard-nav-links">
                    <span>Home</span>
                    <span>Search</span>
                    <span>Saved</span>
                    <span>Applications</span>
                    <span onClick={() => navigate("/profile")}>Profile</span>
                </div>
            </div>

            {/* HEADER */}
            <div className="dashboard-header">
                <h2>Find your next home 🏡</h2>
                <p>Browse and apply for properties</p>
            </div>

            {/* SEARCH */}
            <div className="dashboard-section">
                <input
                    className="search-input"
                    placeholder="Search properties..."
                />
            </div>

            {/* PROPERTIES */}
            <div className="listing-grid">
                {properties.map(p => (
                    <div className="listing-card" key={p.id}>
                        <h4>{p.title}</h4>
                        <p>{p.location}</p>
                        <p className="status">{p.price}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}