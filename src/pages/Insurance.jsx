import React from "react";
import Navbar from "../components/Navbar";

export default function Insurance() {

    return (
        <>

            <Navbar />

            <section className="insurance">

                <div className="insurance-header">
                    <h1>Protect Your Property & Income</h1>
                    <p>
                        VitRent Insurance helps landlords secure their properties,
                        rental income, and tenants with ease.
                    </p>
                </div>

                <div className="insurance-plans">

                    <h2 className="section-title">Insurance Plans</h2>
                    <p className="section-subtitle">
                        Choose a protection plan that fits your property needs
                    </p>

                    <div className="plans-grid">

                        <div className="plan-card">
                            <h3>Basic Cover</h3>
                            <p className="price">₦2,000 / month</p>

                            <ul>
                                <li>✔ Property damage protection</li>
                                <li>✔ Basic repairs coverage</li>
                                <li>✔ Tenant dispute support</li>
                            </ul>

                            <button onClick={() => alert("Coming Soon 🚧")}>
                                Select Plan
                            </button>
                        </div>

                        <div className="plan-card featured">
                            <h3>Rent Protection</h3>
                            <p className="price">₦5,000 / month</p>

                            <ul>
                                <li>✔ Guaranteed rental income</li>
                                <li>✔ Tenant default protection</li>
                                <li>✔ Priority support</li>
                            </ul>

                            <button onClick={() => alert("Coming Soon 🚧")}>
                                Select Plan
                            </button>
                        </div>

                        <div className="plan-card">
                            <h3>Full Protection</h3>
                            <p className="price">₦10,000 / month</p>

                            <ul>
                                <li>✔ Everything in Rent Protection</li>
                                <li>✔ Legal coverage</li>
                                <li>✔ Premium property security</li>
                            </ul>

                            <button onClick={() => alert("Coming Soon 🚧")}>
                                Select Plan
                            </button>
                        </div>

                    </div>

                </div>

                <div className="insurance-why">

                    <div className="why-left">
                        <h2>Why Choose VitRent Insurance?</h2>

                        <p>
                            We protect landlords, agents, and tenants with smart, digital-first
                            insurance solutions built for modern real estate in Nigeria.
                        </p>

                        <p>
                            No paperwork delays. No hidden fees. Just fast, transparent protection
                            for your property and income.
                        </p>

                    </div>

                    <div className="why-right">

                        <div className="service-box">
                            🏠 Property Protection
                        </div>

                        <div className="service-box">
                            💰 Rental Income Security
                        </div>

                        <div className="service-box">
                            ⚖ Legal Assistance
                        </div>

                        <div className="service-box">
                            📊 Risk Management
                        </div>

                    </div>

                </div>
                <div className="insurance-contact">

                    <h2>Need Help Choosing a Plan?</h2>
                    <p>Contact our insurance team for guidance and setup support</p>

                    <button onClick={() => alert("Contact feature coming soon 🚧")}>
                        Contact Us
                    </button>

                </div>
                <div className="insurance-cta">
                    <h2>Secure Your Investment Today</h2>
                    <button className="primary">Get Insurance</button>
                </div>

            </section>
        </>
    );
}