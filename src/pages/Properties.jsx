import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Properties.css";

export default function Properties() {
    const navigate = useNavigate();
    const location = useLocation();

    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    const rawUser = localStorage.getItem("vitRentUser");

    let user = null;

    try {
        user = rawUser ? JSON.parse(rawUser) : null;
    } catch (e) {
        user = null;
    }

    // HARD GUARD (this is what actually fixes your issue)
    const isLoggedIn =
        !!user &&
        typeof user === "object" &&
        user.email?.trim() &&
        user.role?.trim();

    const role = isLoggedIn ? user.role.toLowerCase() : null;

    const fromDashboard = location.state?.fromDashboard;

    const getDashboard = () => {
        if (role === "tenant") return "/tenant";
        if (role === "landlord") return "/landlord";
        if (role === "agent") return "/agent";
        return "/";
    };

    const properties = [
        {
            id: 1,
            title: "Luxury 3 Bedroom Apartment",
            location: "Lekki, Lagos",
            price: "₦850,000",
            type: "apartment",
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
            desc: "Modern apartment with 24/7 power, security, and ocean view."
        },
        {
            id: 2,
            title: "Modern Duplex with Smart Home",
            location: "Wuse 2, Abuja",
            price: "₦1,800,000",
            type: "duplex",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            desc: "Fully automated duplex with CCTV, gated security, and parking space."
        },
        {
            id: 3,
            title: "Affordable Self Contain",
            location: "Independence Layout, Enugu",
            price: "₦300,000",
            type: "self-contain",
            image: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
            desc: "Clean and affordable unit suitable for students and young professionals."
        },
        {
            id: 4,
            title: "Executive Mini Flat",
            location: "Awka, Anambra",
            price: "₦450,000",
            type: "apartment",
            image: "https://images.unsplash.com/photo-1560185007-5f0bb1866cab",
            desc: "Well-finished mini flat in a secure and calm environment."
        },
        {
            id: 5,
            title: "Luxury Penthouse Suite",
            location: "Victoria Island, Lagos",
            price: "₦3,500,000",
            type: "duplex",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
            desc: "High-rise penthouse with skyline views and private amenities."
        },
        {
            id: 6,
            title: "Family Bungalow",
            location: "GRA Phase 2, Port Harcourt",
            price: "₦1,200,000",
            type: "bungalow",
            image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
            desc: "Spacious bungalow in a secure estate with good road access."
        },
        {
            id: 7,
            title: "Student Friendly Studio",
            location: "Nsukka, Enugu",
            price: "₦250,000",
            type: "self-contain",
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
            desc: "Budget-friendly studio close to university campus."
        },
        {
            id: 8,
            title: "Modern 2 Bedroom Flat",
            location: "Asokoro, Abuja",
            price: "₦1,400,000",
            type: "apartment",
            image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
            desc: "Elegant apartment in one of Abuja’s most prestigious districts."
        },
        {
            id: 9,
            title: "Premium 4 Bedroom Duplex",
            location: "Ikoyi, Lagos",
            price: "₦4,200,000",
            type: "duplex",
            image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
            desc: "Ultra-modern duplex with swimming pool and 24/7 security."
        },
        {
            id: 10,
            title: "Cozy Studio Apartment",
            location: "Garki, Abuja",
            price: "₦650,000",
            type: "self-contain",
            image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
            desc: "Compact and stylish studio in a central Abuja location."
        },
        {
            id: 11,
            title: "Affordable Student Apartment",
            location: "Awka, Anambra",
            price: "₦280,000",
            type: "self-contain",
            image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
            desc: "Perfect for students, close to major institutions."
        },
        {
            id: 12,
            title: "Luxury Waterfront Apartment",
            location: "Trans Amadi, Port Harcourt",
            price: "₦1,900,000",
            type: "apartment",
            image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
            desc: "Beautiful waterfront apartment with serene environment."
        },
        {
            id: 13,
            title: "Modern 3 Bedroom Flat",
            location: "Independence Layout, Enugu",
            price: "₦900,000",
            type: "apartment",
            image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
            desc: "Well-finished apartment in a peaceful residential area."
        },
        {
            id: 14,
            title: "Executive Penthouse",
            location: "Banana Island, Lagos",
            price: "₦6,500,000",
            type: "duplex",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
            desc: "Top-tier penthouse with luxury finishing and skyline views."
        },
        {
            id: 15,
            title: "Family Friendly Bungalow",
            location: "Wuse 2, Abuja",
            price: "₦1,300,000",
            type: "bungalow",
            image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
            desc: "Spacious bungalow ideal for families in a secure estate."
        }
    ];

    const filtered = properties.filter((p) =>
        (filter === "all" || p.type === filter) &&
        (
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.location.toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <>
            {/* GLOBAL NAVBAR */}
            <Navbar />

            <div className="properties-page">

                {/* HERO */}
                <div className="properties-hero">
                    <h1>Find Your Perfect Home 🏠</h1>
                    <p>Browse verified rental properties across Nigeria</p>
                </div>

                {/* SEARCH BAR (NEW ADDITION ONLY) */}
                <div className="properties-search">

                    <input
                        type="text"
                        placeholder="Search by title, location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                {/* FILTERS */}
                <div className="filter-bar">

                    <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
                        All
                    </button>

                    <button onClick={() => setFilter("apartment")} className={filter === "apartment" ? "active" : ""}>
                        Apartments
                    </button>

                    <button onClick={() => setFilter("duplex")} className={filter === "duplex" ? "active" : ""}>
                        Duplex
                    </button>

                    <button onClick={() => setFilter("self-contain")} className={filter === "self-contain" ? "active" : ""}>
                        Self Contain
                    </button>

                </div>

                {/* GRID */}
                <div className="properties-grid">

                    {filtered.map((p) => (
                        <div className="property-card" key={p.id}>

                            <img src={p.image} alt={p.title} />

                            <div className="property-info">

                                <h3>{p.title}</h3>
                                <p className="location">📍 {p.location}</p>
                                <p className="desc">{p.desc}</p>

                                <div className="bottom">
                                    <h4>{p.price}</h4>
                                    <button>View Details</button>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>

                {isLoggedIn && role && (
                    <div
                        style={{
                            marginTop: "40px",
                            marginLeft: "40px"
                        }}
                    >
                        <button
                            className="back-desktop-btn"
                            onClick={() => navigate(getDashboard())}
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}