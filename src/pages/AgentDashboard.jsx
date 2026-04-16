import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function AgentDashboard() {

    const [clients, setClients] = useState([
        { id: 1, name: "Michael", interest: "2 Bedroom Lekki", date: "1h ago" },
        { id: 2, name: "Sarah", interest: "Self Contain Yaba", date: "3h ago" },
    ]);

    const listings = [
        { id: 1, title: "3 Bedroom Flat", location: "Ikoyi", price: "₦1.5M" },
        { id: 2, title: "Mini Flat", location: "Surulere", price: "₦600K" },
    ];

    const removeClient = (id) => {
        setClients(clients.filter(c => c.id !== id));
    };

    return (
        <div className="dashboard-layout">
            <Navbar />

            <div className="dashboard-content">

                {/* HEADER */}
                <div className="dashboard-header">
                    <h2>Agent Dashboard 📊</h2>
                    <p>Manage listings, clients and performance</p>
                </div>

                {/* STATS */}
                <div className="stats-grid">

                    <div className="stat-box">
                        <h3>Total Listings</h3>
                        <p>{listings.length}</p>
                    </div>

                    <div className="stat-box">
                        <h3>Active Clients</h3>
                        <p>{clients.length}</p>
                    </div>

                    <div className="stat-box">
                        <h3>Monthly Deals</h3>
                        <p>8</p>
                    </div>

                </div>

                {/* QUICK ACTIONS */}
                <div className="agent-actions">
                    <button className="primary">+ Add Property</button>
                    <button className="primary outline">View Clients</button>
                    <button className="primary outline">Analytics</button>
                </div>

                {/* MAIN GRID */}
                <div className="dashboard-main">

                    {/* CLIENT REQUESTS */}
                    <div className="dashboard-card large">

                        <div className="card-header">
                            <h3>Client Requests</h3>
                            <span className="view-all">View all</span>
                        </div>

                        {clients.map(c => (
                            <div className="request-row" key={c.id}>

                                <div>
                                    <strong>{c.name}</strong>
                                    <p>{c.interest}</p>
                                    <small>{c.date}</small>
                                </div>

                                <div className="request-actions">
                                    <button className="approve">Contact</button>
                                    <button className="decline" onClick={() => removeClient(c.id)}>
                                        Remove
                                    </button>
                                </div>

                            </div>
                        ))}

                    </div>

                    {/* PERFORMANCE */}
                    <div className="dashboard-card">

                        <h3>Performance</h3>

                        <div className="summary-item">
                            <span>Properties Sold</span>
                            <strong>24</strong>
                        </div>

                        <div className="summary-item">
                            <span>Active Listings</span>
                            <strong>{listings.length}</strong>
                        </div>

                        <div className="summary-item">
                            <span>Conversion Rate</span>
                            <strong>78%</strong>
                        </div>

                    </div>

                </div>

                {/* LISTINGS */}
                <div className="dashboard-section">

                    <div className="card-header">
                        <h3>Your Listings</h3>
                        <span className="view-all">Manage</span>
                    </div>

                    <div className="listing-grid">
                        {listings.map(l => (
                            <div className="listing-card" key={l.id}>

                                <h4>{l.title}</h4>
                                <p className="location">{l.location}</p>
                                <p className="price">{l.price}</p>

                                <button className="primary small-btn">
                                    Edit
                                </button>

                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}