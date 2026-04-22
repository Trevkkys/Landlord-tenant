import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LandlordDashboard() {

    const user = JSON.parse(localStorage.getItem("vitUser"));

    const navigate = useNavigate();

    const [requests, setRequests] = useState([
        { id: 1, agent: "Agent John", property: "Lekki 2 Bedroom", date: "2h ago" },
        { id: 2, agent: "Agent Sarah", property: "Ikoyi Duplex", date: "5h ago" },
    ]);

    const [showNotif, setShowNotif] = useState(false);

    const notifications = [
        { id: 1, text: "New viewing request for Lekki property" },
        { id: 2, text: "Agent John submitted application" },
        { id: 3, text: "Payment received for Ikoyi unit" },
    ];

    const landlordImages = [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    ];

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
                    <p>Here is a quick overview of your properties</p>
                </div>

                <div className="notif-wrapper">

                    <div className="bell-icon" onClick={() => setShowNotif(!showNotif)}>
                        🔔
                        <span className="notif-badge">{notifications.length}</span>
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

                <div className="tools-grid">

                    <div
                        className="tool-card"
                        onClick={() => navigate("/list-property")}>
                        🏠 <h4>Add Property</h4>
                        <p>List a new rental unit</p>
                    </div>

                    <div className="tool-card">
                        📊 <h4>Analytics</h4>
                        <p>View income & performance</p>
                    </div>

                    <div className="tool-card">
                        🤝 <h4>Manage Agents</h4>
                        <p>Assign or remove agents</p>
                    </div>

                    <div className="tool-card">
                        💰 <h4>Payments</h4>
                        <p>Track rent payments</p>
                    </div>

                    <Link to="/insurance" className="tool-card">
                        🔐 <h4>Insurance</h4>
                        <p>Protect your property & rent</p>
                    </Link>
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
                                <img src={landlordImages[l.id % landlordImages.length]} alt={l.title} />
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