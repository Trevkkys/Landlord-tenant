import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Images
import homeone from "./assets/homeone.jpg";
import hometwo from "./assets/hometwo.jpg";
import heroimg from "./assets/heroimg.jpg";

// Properties Data
const properties = [
  { id: 1, title: "3 Bedroom Flat", price: "₦1,200,000 / year", location: "Lekki, Lagos", agent: "Mr Martin", beds: 3, baths: 2, image: homeone },
  { id: 2, title: "2 Bedroom Apartment", price: "₦800,000 / year", location: "Yaba, Lagos", agent: "Miss Nkechi", beds: 2, baths: 1, image: hometwo },
  { id: 3, title: "4 Bedroom Duplex", price: "₦2,500,000 / year", location: "Ikoyi, Lagos", agent: "Mr Eddie", beds: 4, baths: 3, image: homeone },
  { id: 4, title: "1 Bedroom Studio", price: "₦500,000 / year", location: "Surulere, Lagos", agent: "Mr Chidi", beds: 1, baths: 1, image: hometwo },
  { id: 5, title: "3 Bedroom Bungalow", price: "₦1,800,000 / year", location: "Ajah, Lagos", agent: "Mr Onoja", beds: 3, baths: 2, image: homeone },
  { id: 6, title: "2 Bedroom Villa", price: "₦2,000,000 / year", location: "Mushin, Lagos", agent: "Mr Joe", beds: 2, baths: 2, image: hometwo },
];

// MAIN APP
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

/* ================== HOME ================== */
function Home() {
  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">


          <h2 className="logo">VitRent</h2>


          <div className="nav-center">
            <span onClick={() => document.getElementById("hero").scrollIntoView({ behavior: "smooth" })}>Home</span>
            <span onClick={() => document.getElementById("search").scrollIntoView({ behavior: "smooth" })}>Search</span>
            <span onClick={() => document.getElementById("locations").scrollIntoView({ behavior: "smooth" })}>Locations</span>
            <span onClick={() => document.getElementById("properties").scrollIntoView({ behavior: "smooth" })}>Properties</span>
            <span onClick={() => document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" })}>How It Works</span>
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
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-content">

          {/* LEFT IMAGE */}
          <div className="hero-image">
            <img src={heroimg} alt="House" />
          </div>

          {/* RIGHT TEXT */}
          <div className="hero-text">
            <h2>Find Your Perfect Home</h2>
            <p>Connect with landlords, agents, and secure payments</p>
          </div>

        </div>
      </section >

      {/* SEARCH */}
      < section id="search" className="search" >
        <h2>Find Properties by Location</h2>
        <p>Search for Properties and Rent/Buy directly from Landlords</p>

        <div className="search-box">
          <input type="text" placeholder="Enter a location to search" />
          <button className="primary">Search</button>
        </div>
        {/* CATEGORIES INSIDE SEARCH */}
        <div className="category-grid">
          {[
            { name: "Apartments", icon: "🏢" },
            { name: "Duplex", icon: "🏠" },
            { name: "Short-let", icon: "🛎️" },
            { name: "Office Spaces", icon: "💼" },
            { name: "Land", icon: "🌍" },
          ].map((item, index) => (
            <div className="category-card" key={index}>
              <span className="category-icon">{item.icon}</span>
              <h4>{item.name}</h4>
            </div>
          ))}
        </div>
      </section >


      {/* LOCATIONS */}
      < section id="locations" className="locations" >
        <div className="container">
          <h2>Explore Popular Locations</h2>

          <div className="location-grid">
            {["Lagos", "Abuja", "Kano", "Enugu", "Owerri", "Anambra", "Port Harcourt", "Asaba"].map((place) => (
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
          {properties.map((property) => (
            <div className="card" key={property.id}>
              <img src={property.image} alt={property.title} />
              <h3>{property.title}</h3>
              <p className="price">{property.price}</p>
              <p className="location">📍 {property.location}</p>
              <div className="details">
                <span>🛏 {property.beds} Beds</span>
                <span>🛁 {property.baths} Baths</span>
              </div>

              <small className="agent">Agent: {property.agent}</small>
              <button className="view-btn">View Details</button>
            </div>
          ))}
        </div>
      </section >

      {/* WHY */}
      < section className="why" >
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
        <h2>How It Works</h2>

        <div className="roles">
          {[
            { title: "Tenant", text: "Browse and apply for houses" },
            { title: "Landlord", text: "Upload and manage properties" },
            { title: "Agent", text: "Manage listings and tenants" },
            { title: "Bank", text: "Handle secure payments" },
          ].map((item, index) => (
            <div className="role-card" key={index}>
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
      </section >

      {/* FOOTER */}
      < footer className="footer" >
        <p>© 2026 VitRent</p>
        <p>Contact | Privacy | Terms</p>
      </footer >
    </div >
  );
}

/* ================== LOGIN ================== */
function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="primary">Login</button>
      </div>
    </div>
  );
}

/* ================== REGISTER ================== */
function Register() {
  const [role, setRole] = useState("");

  return (
    <div className="login-container">
      <div className="login-box register-box">
        <h2>Register</h2>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <p>Select Role:</p>

        <div className="role-buttons">
          {["Tenant", "Landlord", "Agent"].map((r) => (
            <button
              key={r}
              className={role === r ? "primary" : ""}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <button className="primary">Register</button>
      </div>
    </div>
  );
}