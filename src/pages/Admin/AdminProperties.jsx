import React, { useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import homeone from "../../assets/heroone.jpg";
import hometwo from "../../assets/herotwo.jpg";
import homethree from "../../assets/herothree.jpg";

export default function AdminProperties() {
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();
    const [properties, setProperties] = useState([
        {

            id: 1,
            title: "2 Bedroom Apartment - Lekki",
            location: "Lekki Phase 1",
            price: "₦2,500,000",
            status: "pending",
            image: homeone
        },
        {
            id: 2,
            title: "Luxury Duplex - VI",
            location: "Victoria Island",
            price: "₦8,000,000",
            status: "approved",
            image: hometwo
        },
        {
            id: 3,
            title: "Mini Flat - Ikeja",
            location: "Ikeja GRA",
            price: "₦1,200,000",
            status: "rejected",
            image: homethree
        },
    ]);

    // FILTER LOGIC
    const filtered = properties.filter((p) => {
        return filter === "all" || p.status === filter;
    });

    // ACTIONS
    const approve = (id) => {
        setProperties((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, status: "approved" } : p
            )
        );
    };

    const reject = (id) => {
        setProperties((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, status: "rejected" } : p
            )
        );
    };

    return (
        <div className="admin-page">

            {/* HEADER */}
            <div className="admin-page-header">
                <h2>Property Moderation</h2>

                <div className="user-filters">
                    <button onClick={() => setFilter("all")}>All</button>
                    <button onClick={() => setFilter("pending")}>Pending</button>
                    <button onClick={() => setFilter("approved")}>Approved</button>
                    <button onClick={() => setFilter("rejected")}>Rejected</button>
                </div>
            </div>

            {/* GRID */}
            <div className="property-grid">

                {filtered.map((p) => (
                    <div key={p.id} className="property-card">

                        {/* IMAGE PLACEHOLDER */}
                        <div className="property-image">
                            <img src={p.image} alt={p.title} />
                        </div>

                        {/* INFO */}
                        <div className="property-info">
                            <h3>{p.title}</h3>
                            <p>{p.location}</p>
                            <p className="price">{p.price}</p>

                            <span className={`status ${p.status}`}>
                                {p.status}
                            </span>
                        </div>

                        {/* ACTIONS */}
                        <div className="property-actions">
                            <button onClick={() => approve(p.id)}>
                                Approve
                            </button>
                            <button onClick={() => reject(p.id)}>
                                Reject
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            <div className="admin-top-actions">

                {/* LEFT SIDE - BACK BUTTON */}
                <button
                    className="back-desktop-btn"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
}