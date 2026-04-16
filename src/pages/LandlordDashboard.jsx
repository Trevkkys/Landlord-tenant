import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function LandlordDashboard() {

    const user = JSON.parse(localStorage.getItem("vitUser"));

    const [requests, setRequests] = useState([
        { id: 1, agent: "Agent John", property: "Lekki 2 Bedroom", date: "2h ago" },
        { id: 2, agent: "Agent Sarah", property: "Ikoyi Duplex", date: "5h ago" },
    ]);

    const listings = [
        { id: 1, title: "3 Bedroom Flat", status: "Active", price: "₦1.2M" },
        { id: 2, title: "2 Bedroom Apartment", status: "Rented", price: "₦800K" },
    ];

    const handleAction = (id) => {
        setRequests(prev => prev.filter(r => r.id !== id));
    };

    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-content">

                {/* HEADER */}
                <div className="dashboard-header">
                    <h2>Good morning, {user?.name || "User"} 👋</h2>
                    <p>Here’s a quick overview of your properties</p>
                </div>

                {/* STATS */}
                <div className="stats-grid">

                    <div className="stat-box">
                        <h3>Active Listings</h3>
                        <p>{listings.length}</p>
                    </div>

                    <div className="stat-box">
                        <h3>Total Earnings</h3>
                        <p>₦2,400,000</p>
                    </div>

                    <div className="stat-box">
                        <h3>Pending Requests</h3>
                        <p>{requests.length}</p>
                    </div>

                </div>

                {/* MAIN GRID */}
                <div className="dashboard-main">

                    {/* REQUESTS */}
                    <div className="dashboard-card large">

                        <div className="card-header">
                            <h3>Recent Requests</h3>
                            <span className="view-all">View all</span>
                        </div>

                        {requests.length === 0 ? (
                            <p style={{ textAlign: "center", color: "#999" }}>
                                No requests yet
                            </p>
                        ) : (
                            requests.map((r) => (
                                <div className="request-row" key={r.id}>

                                    <div>
                                        <strong>{r.agent}</strong>
                                        <p>{r.property}</p>
                                        <small>{r.date}</small>
                                    </div>

                                    <div className="request-actions">
                                        <button
                                            className="approve"
                                            onClick={() => handleAction(r.id)}
                                        >
                                            Approve
                                        </button>

                                        <button
                                            className="decline"
                                            onClick={() => handleAction(r.id)}
                                        >
                                            Decline
                                        </button>
                                    </div>

                                </div>
                            ))
                        )}

                    </div>

                    {/* QUICK SUMMARY */}
                    <div className="dashboard-card">

                        <h3>Quick Summary</h3>

                        <div className="summary-item">
                            <span>Occupied Units</span>
                            <strong>8 / 10</strong>
                        </div>

                        <div className="summary-item">
                            <span>Monthly Income</span>
                            <strong>₦2M</strong>
                        </div>

                        <div className="summary-item">
                            <span>Vacant Units</span>
                            <strong>2</strong>
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
                                <p className="status">{l.status}</p>
                                <p className="price">{l.price}</p>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}