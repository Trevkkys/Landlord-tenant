import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function TenantDashboard() {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [showNotif, setShowNotif] = useState(false);

    const notifications = [
        { id: 1, text: "New property added near Lekki" },
        { id: 2, text: "Your application was viewed" },
        { id: 3, text: "Agent replied to your request" },
    ];

    const tenantImages = [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    ];

    const recentProperties = [
        {
            id: 1,
            title: "Luxury Studio Apartment",
            location: "Victoria Island",
            price: "₦900K",
            img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f"
        },
        {
            id: 2,
            title: "Modern 2 Bedroom Flat",
            location: "Ikoyi",
            price: "₦1.4M",
            img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d"
        },
        {
            id: 3,
            title: "Cozy Self Contain",
            location: "Yaba",
            price: "₦500K",
            img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
        }
    ];

    const properties = [
        { id: 1, title: "2 Bedroom Apartment", location: "Lekki", price: "₦800K" },
        { id: 2, title: "Self Contain", location: "Yaba", price: "₦400K" },
        { id: 3, title: "3 Bedroom Flat", location: "Ikoyi", price: "₦1.5M" },
    ];

    return (
        <div className="dashboard-layout">
            <Navbar />

            <div className="dashboard-content">

                {/* HEADER */}
                <div className="dashboard-header">
                    <h2>Find Your Next Home 🏡</h2>
                    <p>Search, filter and apply for properties easily</p>
                </div>

                <div className="notif-wrapper">

                    <div className="bell-icon" onClick={() => setShowNotif(!showNotif)}>
                        🔔

                        <span className="notif-badge">
                            {notifications.length}
                        </span>
                    </div>

                    {showNotif && (
                        <div className="notif-dropdown">

                            <h4>Notifications</h4>

                            {notifications.map(n => (
                                <div key={n.id} className="notif-item">
                                    {n.text}
                                </div>
                            ))}

                        </div>
                    )}

                </div>

                {/* AFFORDABILITY CALCULATOR */}
                <div className="dashboard-calc">

                    <h3>💰 Rent Affordability Calculator</h3>
                    <p>Estimate how much rent you can comfortably afford</p>

                    <input
                        type="number"
                        placeholder="Enter your monthly income (₦)"
                        id="incomeInput"
                        className="calc-input"
                    />

                    <button
                        className="primary"
                        onClick={() => {
                            const income = document.getElementById("incomeInput").value;

                            if (!income) return alert("Please enter your income");

                            const rent = Math.round((income * 0.3));

                            alert(`You can afford approx ₦${rent.toLocaleString()} monthly rent`);
                        }}
                    >
                        Calculate
                    </button>

                    <div className="calc-note">
                        💡 Recommended: Spend 25%–30% of your monthly income on rent
                    </div>

                </div>

                {/* SEARCH */}
                <div className="dashboard-search-bar">
                    <input
                        className="search-input"
                        placeholder="Search location or property..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="primary" onClick={() => navigate("/properties")}>Search</button>
                </div>

                {/* FILTERS */}
                <div className="filter-row">
                    <button className="filter-btn">All</button>
                    <button className="filter-btn">Apartments</button>
                    <button className="filter-btn">Duplex</button>
                    <button className="filter-btn">Self Contain</button>
                </div>

                {/* STATS */}
                <div className="stats-grid">
                    <div className="stat-box">
                        <h3>Saved Properties</h3>
                        <p>12</p>
                    </div>

                    <div className="stat-box">
                        <h3>Applications</h3>
                        <p>5</p>
                    </div>

                    <div className="stat-box">
                        <h3>Messages</h3>
                        <p>3</p>
                    </div>
                </div>

                {/* PROPERTY GRID */}
                <div className="dashboard-section">

                    <div className="card-header">
                        <h3>Available Properties</h3>
                        <span className="view-all">Explore</span>
                    </div>

                    <div className="listing-grid">
                        {properties.map(p => (
                            <div className="listing-card" key={p.id}>

                                <img
                                    src={tenantImages[p.id % tenantImages.length]}
                                    alt={p.title}
                                />

                                <h4>{p.title}</h4>
                                <p className="location">{p.location}</p>
                                <p className="price">{p.price}</p>

                                <button className="primary small-btn">
                                    Apply
                                </button>

                            </div>
                        ))}
                    </div>

                </div>

                {/* SAVED / RECENT */}
                <div className="dashboard-section">

                    <div className="card-header">
                        <h3>Recently Viewed</h3>
                        <span className="view-all">View all</span>
                    </div>

                    <div className="request-slider">

                        {recentProperties.map(p => (
                            <div className="request-card" key={p.id}>

                                <img className="recent-img" src={p.img} alt={p.title} />

                                <div>
                                    <p><b>{p.title}</b></p>
                                    <p>{p.location}</p>
                                    <p className="price">{p.price}</p>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </div>
    );
}