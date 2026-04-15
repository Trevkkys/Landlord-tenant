import React from "react";
import { Link } from "react-router-dom";

// Images
import homeone from "../assets/homeone.jpg";
import hometwo from "../assets/hometwo.jpg";
import heroimg from "../assets/heroimg.jpg";

// Properties Data
const properties = [
    { id: 1, title: "3 Bedroom Flat", price: "₦1,200,000 / year", location: "Lekki, Lagos", agent: "Mr Martin", beds: 3, baths: 2, image: homeone },
    { id: 2, title: "2 Bedroom Apartment", price: "₦800,000 / year", location: "Yaba, Lagos", agent: "Miss Nkechi", beds: 2, baths: 1, image: hometwo },
    { id: 3, title: "4 Bedroom Duplex", price: "₦2,500,000 / year", location: "Ikoyi, Lagos", agent: "Mr Eddie", beds: 4, baths: 3, image: homeone },
    { id: 4, title: "1 Bedroom Studio", price: "₦500,000 / year", location: "Surulere, Lagos", agent: "Mr Chidi", beds: 1, baths: 1, image: hometwo },
];

export default function Home() {
    return (
        <div>

            <nav className="navbar">
                <div className="navbar-inner">

                    <h2 className="logo">VitRent</h2>

                    <div className="nav-center">

                        <a href="#hero">Home</a>
                        <a href="#search">Search</a>
                        <a href="#locations">Locations</a>
                        <a href="#properties">Properties</a>
                        <a href="#how-it-works">How It Works</a>

                    </div>

                    <div className="nav-right">
                        <Link to="/login">
                            <button className="login-btn">Login</button>
                        </Link>

                        <Link to="/register">
                            <button className="register-btn">Register</button>
                        </Link>
                    </div>

                </div>
            </nav >

            {/* HERO */}
            < section id="hero" className="hero" >
                <div className="hero-content">

                    <div className="hero-image">
                        <img src={heroimg} alt="Hero" />
                    </div>

                    <div className="hero-text">
                        <h2>Find Your Perfect Home</h2>
                        <p>Connect with landlords, agents, and secure payments</p>
                    </div>

                </div>
            </section >

            {/* SEARCH */}
            < section id="search" className="search" >
                <h2>Discover Properties by Location</h2>

                <div className="search-box">
                    <input type="text" placeholder="Enter a location to search" />
                    <button className="primary">Search</button>
                </div>

                <div className="category-grid">
                    {["Apartments", "Duplex", "Short-let", "Office", "Land"].map((item) => (
                        <div className="category-card" key={item}>
                            <span className="category-icon">🏠</span>
                            <h4>{item}</h4>
                        </div>
                    ))}
                </div>
            </section >

            {/* LOCATIONS */}
            < section id="locations" className="locations" >
                <div className="container">
                    <h2>Explore Popular Locations</h2>
                    <div className="location-grid"> {["Lagos", "Abuja", "Kano", "Enugu", "Owerri", "Anambra", "Port Harcourt",
                        "Asaba"].map((place) => (
                            <div className="location-card" key={place}>
                                <h3>{place}</h3>
                                <p>View available homes</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >


            {/* PROPERTIES */}
            < section id="properties" className="properties" >
                <h2>Featured Listings</h2>

                <div className="property-grid">
                    {properties.map((p) => (
                        <div className="card" key={p.id}>
                            <img src={p.image} alt={p.title} />
                            <h3>{p.title}</h3>
                            <p className="location">📍 {p.location}</p>
                            <p className="price">{p.price}</p>

                            <div className="details">
                                <span>🛏 {p.beds} Beds</span>
                                <span>🛁 {p.baths} Baths</span>
                            </div>

                            <small className="agent">Agent: {p.agent}</small>
                            <button className="view-btn">View Details</button>
                        </div>
                    ))}
                </div>
            </section >


            {/* WHY */}
            < section id="why" className="why" >
                <h2>Why Choose VitRent?</h2>
                <div className="why-grid">
                    <div>✔ Verified Landlords</div>
                    <div>✔ Trusted Agents</div>
                    <div>✔ Secure Bank Payments</div>
                    <div>✔ Transparent Agreements</div>
                </div>
            </section >

            {/* HOW IT WORKS */}
            < section id="how-it-works" className="how" >
                <h2>How It Works</h2> <div className="roles">
                    {[{ title: "Tenant", text: "Browse and apply for houses" },
                    { title: "Landlord", text: "Upload and manage properties" },
                    { title: "Agent", text: "Manage listings and tenants" },
                    { title: "Bank", text: "Handle secure payments" },
                    ].map((item, index) => (<div className="role-card" key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                    </div>
                    ))}
                </div>
            </section >

            {/* TESTIMONIALS */}
            < section className="landlord-cta" >
                <div className="cta-content">
                    <h2>Are you a landlord?</h2>
                    <div className="cta-box" onClick={() => alert("Landlord page coming soon!")}>
                        <span>Find out why landlords love us</span>
                        <span className="arrow">→</span>
                    </div>
                </div>
            </section >

            {/* CTA */}
            < section className="cta" >
                <h2>Ready to Find Your Home?</h2>
                <button className="primary">Get Started</button>
            </section > {/* FOOTER */} < footer className="footer" >
                <p>© 2026 VitRent</p>
                <p>Contact | Privacy | Terms</p>
            </footer >
        </div >
    );
}
