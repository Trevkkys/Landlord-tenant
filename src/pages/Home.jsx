import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


// Images
import homeone from "../assets/heroone.jpg";
import hometwo from "../assets/herotwo.jpg";
import homethree from "../assets/herothree.jpg";
import homefour from "../assets/herofour.jpg";
import homefive from "../assets/herofive.jpg";
import heroimg from "../assets/heroimg.jpg";

// Properties Data
const properties = [
    {
        id: 1,
        title: "3 Bedroom Flat",
        price: "₦1,200,000 / year",
        location: "Lekki, Lagos",
        agent: "Mr Martin",
        beds: 3,
        baths: 2,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    },
    {
        id: 2,
        title: "2 Bedroom Apartment",
        price: "₦800,000 / year",
        location: "Yaba, Lagos",
        agent: "Miss Nkechi",
        beds: 2,
        baths: 1,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    },
    {
        id: 3,
        title: "4 Bedroom Duplex",
        price: "₦2,500,000 / year",
        location: "Ikoyi, Lagos",
        agent: "Mr Eddie",
        beds: 4,
        baths: 3,
        image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
    },
    {
        id: 4,
        title: "1 Bedroom Studio",
        price: "₦500,000 / year",
        location: "Surulere, Lagos",
        agent: "Mr Chidi",
        beds: 1,
        baths: 1,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d"
    }
];

export default function Home() {

    // HERO SLIDER
    const heroImages = [homeone, hometwo, homethree, homefour, homefive, heroimg];
    const [current, setCurrent] = useState(0);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // ✅ FIXED STATE INSIDE COMPONENT
    const [selectedCity, setSelectedCity] = useState("Lagos Nigeria");

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const locations = [
        { city: "Lagos", count: "12,450+", img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21" },
        { city: "Abuja", count: "8,230+", img: "https://images.unsplash.com/photo-1560840067-ddcaeb7831d2" },
        { city: "Port Harcourt", count: "4,120+", img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1" },
        { city: "Ibadan", count: "3,890+", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
        { city: "Enugu", count: "2,540+", img: "https://images.unsplash.com/photo-1494526585095-c41746248156" },
        { city: "Kano", count: "1,980+", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
        { city: "Anambra", count: "2,300+", img: "https://images.unsplash.com/photo-1494526585095-c41746248156" },
    ];

    return (
        <div>

            {/* NAVBAR */}
            <nav className="navbar">
                <div className="navbar-inner">

                    <h2 className="logo">VitRent</h2>

                    <div className="nav-center">
                        <a href="#hero">Home</a>
                        <a href="#affordability">Search</a>
                        <a href="#locations">Locations</a>
                        <a href="#properties">Properties</a>
                        <a href="#how-it-works">How It Works</a>
                    </div>

                    <div className="nav-right">
                        <Link to="/login"><button className="nav-login-btn">Login</button></Link>
                        <Link to="/register"><button className="nav-register-btn">Register</button></Link>
                    </div>

                </div>
            </nav>

            {/* HERO */}
            <section id="hero" className="hero">

                <div className="hero-left">

                    <h1>Find Your Perfect Home</h1>
                    <p>Connect with landlords, agents, and secure rentals easily</p>

                    <div className="hero-trust">
                        <span>✔ Verified Listings</span>
                        <span>✔ Trusted Agents</span>
                        <span>✔ Secure Payments</span>
                    </div>

                    <div className="hero-search">
                        <input type="text" placeholder="Search location (Lekki, Yaba...)" />
                        <button>Search</button>
                    </div>

                    <div className="hero-actions">
                        <div className="action-card">🏠 Find Home</div>
                        <div className="action-card">🏢 List Property</div>
                        <div className="action-card">🤝 Become Agent</div>
                        <div className="action-card">📍 Browse Locations</div>
                    </div>

                </div>

                <div className="hero-right">

                    {heroImages.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="hero slide"
                            className={`hero-img ${index === current ? "active" : ""}`}
                        />
                    ))}

                </div>

            </section>

            {/* AFFORDABILITY */}
            <section id="affordability" className="affordability">
                <div className="affordability-container">

                    <h2>How Much Rent Can You Afford?</h2>
                    <p>Get a quick estimate based on your monthly income</p>

                    <input
                        type="number"
                        placeholder="Enter your monthly income (₦)"
                        id="incomeInput"
                    />

                    <button
                        onClick={() => {
                            const income = document.getElementById("incomeInput").value;
                            const rent = Math.round((income * 0.3) / 12);

                            alert(`You can afford approx ₦${rent.toLocaleString()} per month rent`);
                        }}
                    >
                        Calculate
                    </button>

                </div>
            </section>

            {/* LOCATIONS */}
            <section id="locations" className="locations">
                <div className="locations-header">

                    <h2 className="locations-title">
                        Explore <span>Popular Locations</span>
                    </h2>

                    <div className="locations-badge">
                        📍 {selectedCity} • 45,000+ Properties Available
                    </div>

                    <p className="locations-subtitle">
                        Discover rental opportunities in{" "}
                        <span>{selectedCity}</span> and across top cities in Nigeria with verified listings, trusted landlords, and secure deals.
                    </p>

                </div>
                <div className="locations-layout">

                    {/* MAP */}
                    <div className="locations-map">
                        <iframe
                            title="map"
                            src={`https://www.google.com/maps?q=${selectedCity || "Nigeria"}&output=embed`}
                            loading="lazy"
                        />
                    </div>

                    {/* LIST */}
                    <div className="locations-list">

                        {locations.map((place) => (
                            <div
                                key={place.city}
                                className={`location-row ${selectedCity === place.city ? "active" : ""}`}
                                onClick={() => setSelectedCity(place.city)}
                            >

                                <img src={place.img} alt={place.city} />

                                <div className="location-info">
                                    <h3>{place.city}</h3>
                                    <p>{place.count} Listings</p>
                                </div>

                                <button>View</button>

                            </div>
                        ))}

                    </div>

                </div>

            </section>

            {/* PROPERTIES */}
            {/* FEATURED LISTINGS */}
            <section id="properties" className="properties">

                <div className="featured-header">

                    <h2 className="featured-title">
                        Featured <span>Listings</span>
                    </h2>

                    <p className="featured-subtitle">
                        Handpicked properties with verified landlords and secure rental options across Nigeria
                    </p>

                </div>

                <div className="property-grid">

                    {properties.map((p) => (

                        <div className="property-card" key={p.id}>

                            {/* IMAGE */}
                            <div className="property-image">

                                <img src={p.image} alt={p.title} />

                                <div className="property-top">
                                    <span className="badge">Verified</span>
                                    <span
                                        className={`heart ${favorites.includes(p.id) ? "active" : ""}`}
                                        onClick={() => toggleFavorite(p.id)}
                                    >
                                        {favorites.includes(p.id) ? "♥" : "♡"}
                                    </span>
                                </div>

                                <div className="price-tag">
                                    {p.price}
                                </div>

                            </div>

                            {/* CONTENT */}
                            <div className="property-body">

                                <h3>{p.title}</h3>

                                <p className="location">📍 {p.location}</p>

                                <div className="meta">
                                    <span>🛏 {p.beds} Beds</span>
                                    <span>🛁 {p.baths} Baths</span>
                                </div>

                                <div className="property-footer">
                                    <small>Agent: {p.agent}</small>
                                    <button className="view-btn">View Details</button>
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            {/* WHY CHOOSE US */}
            <section id="why" className="why-section">

                <div className="why-header">
                    <h2>
                        Why Choose <span>VitRent</span>?
                    </h2>
                    <p>
                        A smarter, safer and more transparent way to rent homes across Nigeria
                    </p>
                </div>

                <div className="why-grid">

                    <div className="why-card">
                        <div className="why-icon">🔒</div>
                        <h3>Verified Listings</h3>
                        <p>Every property is checked to ensure authenticity and prevent fraud.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">🤝</div>
                        <h3>Trusted Landlords</h3>
                        <p>Connect directly with verified property owners and agents.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">💳</div>
                        <h3>Secure Payments</h3>
                        <p>Safe transactions with structured payment protection systems.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">📄</div>
                        <h3>Transparent Deals</h3>
                        <p>No hidden charges — everything is clear before you commit.</p>
                    </div>

                </div>

            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="how-section">

                <div className="how-header">
                    <h2>How VitRent Works</h2>
                    <p>Simple steps to find, list and secure rental properties</p>
                </div>

                <div className="how-steps">

                    <div className="how-step">
                        <div className="step-number">1</div>
                        <h3>Search Properties</h3>
                        <p>Browse verified listings by location, price, and property type.</p>
                    </div>

                    <div className="how-step">
                        <div className="step-number">2</div>
                        <h3>Connect & Inspect</h3>
                        <p>Contact agents or landlords and schedule inspections easily.</p>
                    </div>

                    <div className="how-step">
                        <div className="step-number">3</div>
                        <h3>Make Payment</h3>
                        <p>Pay securely through our trusted system with full transparency.</p>
                    </div>

                    <div className="how-step">
                        <div className="step-number">4</div>
                        <h3>Move In</h3>
                        <p>Finalize agreements and move into your new home stress-free.</p>
                    </div>

                </div>

                {/* LANDLORD CTA INSIDE SAME SECTION */}
                <div className="landlord-cta">

                    <div className="cta-content">

                        <h2><strong>Are you a landlord?</strong></h2>

                        <Link to="/insurance" className="cta-box">
                            <span>Find out why landlords love us</span>
                            <span className="arrow">→</span>
                        </Link>

                    </div>

                </div>

            </section>

            {/* FINAL CTA - USER PATH CHOICE */}
            <section className="final-cta">

                <div className="final-cta-header">
                    <h2>Ready to Find Your Home?</h2>
                    <p>Choose how you want to continue on VitRent</p>
                </div>

                <div className="cta-cards">

                    <div className="cta-card">
                        <h3>🏠 Find a Home</h3>
                        <p>Browse verified rental listings near you</p>
                        <button onClick={() => window.location.href = "/properties"}>
                            Explore Homes
                        </button>
                    </div>

                    <div className="cta-card">
                        <h3>🏢 List Property</h3>
                        <p>Landlords can publish and manage listings</p>
                        <button onClick={() => window.location.href = "/register"}>
                            Get Started
                        </button>
                    </div>

                    <div className="cta-card">
                        <h3>🤝 Become an Agent</h3>
                        <p>Manage clients and property listings professionally</p>
                        <button onClick={() => window.location.href = "/register"}>
                            Join as Agent
                        </button>
                    </div>

                </div>

            </section>

            {/* FOOTER */}
            <footer className="footer">

                <div className="footer-container">

                    {/* BRAND */}
                    <div className="footer-brand">
                        <h2>VitRent</h2>
                        <p>
                            Making rental housing simple, secure, and transparent for landlords,
                            tenants, and agents across Nigeria.
                        </p>

                        <div className="socials">
                            <span>🌐</span>
                            <span>📘</span>
                            <span>🐦</span>
                            <span>📸</span>
                        </div>
                    </div>

                    {/* EXPLORE */}
                    <div className="footer-links">
                        <h4>Explore</h4>
                        <a href="#">Properties</a>
                        <a href="#">Locations</a>
                        <a href="#">Agents</a>
                        <a href="#">Pricing</a>
                    </div>

                    {/* SUPPORT */}
                    <div className="footer-links">
                        <h4>Support</h4>
                        <a href="#">Help Center</a>
                        <a href="#">Insurance</a>
                        <a href="#">Safety Tips</a>
                        <a href="#">Contact Support</a>
                    </div>

                    {/* CONTACT */}
                    <div className="footer-contact">
                        <h4>Contact</h4>
                        <p>📍 Lagos, Nigeria</p>
                        <p>📞 +234 800 000 0000</p>
                        <p>📧 support@vitrent.com</p>
                    </div>

                    {/* NEWSLETTER */}
                    <div className="footer-newsletter">
                        <h4>Stay Updated</h4>
                        <p>Get property alerts and updates</p>

                        <div className="newsletter-box">
                            <input type="email" placeholder="Enter email" />
                            <button>Join</button>
                        </div>
                    </div>

                </div>

                {/* BOTTOM BAR */}
                <div className="footer-bottom">
                    <p>© 2026 VitRent. All rights reserved.</p>
                </div>

            </footer>

        </div>
    );
}