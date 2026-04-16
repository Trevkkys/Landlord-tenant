import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function TenantDashboard() {

    const [search, setSearch] = useState("");

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

                {/* SEARCH */}
                <div className="dashboard-search-bar">
                    <input
                        className="search-input"
                        placeholder="Search location or property..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="primary">Search</button>
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
                        {properties.map(p => (
                            <div className="request-card" key={p.id}>
                                <p><b>{p.title}</b></p>
                                <p>{p.location}</p>
                                <p className="price">{p.price}</p>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}