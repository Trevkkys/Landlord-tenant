import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BiSolidShield } from "react-icons/bi";
import KycOverview from "./KycOverview";
import Modal from "../components/Modal";

export default function Profile() {
    const navigate = useNavigate();
    const [notificationsOn, setNotificationsOn] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // New states for dynamic popups
    const [modalContent, setModalContent] = useState(null);
    const [activeTab, setActiveTab] = useState("");

    const rawUser = localStorage.getItem("vitUser");
    const user = rawUser ? JSON.parse(rawUser) : null;
    const role = user?.role || user?.user?.role || user?.data?.role || "tenant";

    const roleConfigs = {
        landlord: {
            bg: "#f0fdf4",
            kycBg: "#22c55e",
            statusLabel: "Verified Landlord",
            activity: [
                { label: "My Properties", icon: "🏠", detail: "4 units", type: "desc" },
                { label: " My Tenants", icon: "👥", detail: "12 active", type: "desc" },
                { label: "My Earnings", icon: "💰", detail: "₦1,240,000", type: "desc" },
            ],
            badges: [
                { label: "✅ Verified Owner", status: "earned" },
                { label: "🔥 Active Host", status: "earned" },
                { label: "⭐ Top Rated", status: "earned" },
                { label: "🛡️ Dispute Free", status: "earned" },
                { label: "🤝 Reliable", status: "earned" },
                { label: "🏠 10+ Properties", status: "locked" },
                { label: "📅 Long Term", status: "locked" },
                { label: "💎 Premium", status: "locked" },
            ]
        },
        agent: {
            bg: "#f5f5dc",
            kycBg: "#7c3aed",
            statusLabel: "Verified Agent",
            activity: [
                { label: "Managed Properties", icon: "📋", detail: "8 listings", type: "desc" },
                { label: "Active Clients", icon: "🤝", detail: "5 pending", type: "desc" },
                { label: "My Earnings", icon: "💳", detail: "₦450,000", type: "desc" },
            ],
            badges: [
                { label: "🆔 Licensed", status: "earned" },
                { label: "🤝 Fast Closer", status: "earned" },
                { label: "⭐ 5-Star Agent", status: "earned" },
                { label: "⚡ Active Now", status: "earned" },
                { label: "🛡️ Secure Agent", status: "earned" },
                { label: "🏆 Platinum", status: "locked" },
                { label: "📍 Local Expert", status: "locked" },
                { label: "💼 50+ Deals", status: "locked" },
            ]
        },
        tenant: {
            bg: "#add8e6",
            kycBg: "#3b82f6",
            statusLabel: "Verified Tenant",
            activity: [
                { label: "My Bookings", icon: "📅", detail: "2 upcoming", type: "desc" },
                { label: "Saved Properties", icon: "❤️", detail: "15 items", type: "desc" },
                { label: "My Plans", icon: "📝", detail: "Standard Plan", type: "desc" },
            ],
            badges: [
                { label: "✅ 100% Payment", status: "earned" },
                { label: "🔥 Active User", status: "earned" },
                { label: "⭐ Top Rated", status: "earned" },
                { label: "⚡ Fast Responder", status: "earned" },
                { label: "🛡️ Dispute Free", status: "earned" },
                { label: "📝 Verified Income", status: "locked" },
                { label: "📅 Long Term", status: "locked" },
                { label: "🏠 10+ Rentals", status: "locked" },
            ]
        }
    };

    const config = roleConfigs[role] || roleConfigs.tenant;

    useEffect(() => {
        if (darkMode) document.body.classList.add("dark");
        else document.body.classList.remove("dark");
    }, [darkMode]);

    useEffect(() => {
        const fetchFreshUserData = async () => {
            const token = localStorage.getItem("token"); // Retrieve the stored token

            if (!token) return; // If no token, don't call the API

            try {
                const response = await fetch("https://your-api.com/api/v1/auth/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Use the token here
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    // This updates your local data with whatever is currently in the DB
                    localStorage.setItem("vitUser", JSON.stringify(data));
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchFreshUserData();
    }, []);

    // Function to open specific modal content
    const openPopup = (type, title) => {
        setActiveTab(title);
        setModalContent(type); // 'form' or 'desc'
        setShowModal(true);
    };

    return (
        <div className="profile-page" style={{ backgroundColor: config.bg, minHeight: '100vh' }}>
            <Navbar />

            <div className="profile-scroll">
                {/* HEADER */}
                <div className="profile-header">
                    <div className="avatar-wrapper">
                        <div className="profile-avatar">
                            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "M"}
                        </div>
                        <div className="edit-avatar-btn">✏️</div>
                    </div>
                    <h2 className="profile-name">{user?.full_name || "Guest User"}</h2>
                    <p className="profile-email">{user?.email || "No Email Found"}</p>
                    <div className="profile-location">📍 Lagos, Nigeria</div>

                    <div className="profile-summary">
                        <div className="summary-card">
                            <h3 className="summary-value">Active</h3>
                            <p className="summary-label">Account Status</p>
                        </div>
                        <div className="summary-card">
                            <h3 className="summary-value">75%</h3>
                            <p className="summary-label">Completion</p>
                        </div>
                        <div className="summary-card">
                            <h3 className="summary-value">2023</h3>
                            <p className="summary-label">Member Since</p>
                        </div>
                    </div>
                </div>

                {/* KYC BANNER */}
                <div className="kyc-banner" onClick={() => openPopup('kyc', 'KYC Overview')} style={{ cursor: "pointer", backgroundColor: config.kycBg }}>
                    <div className="kyc-icon"><BiSolidShield size={32} color="#F3F3F3" /></div>
                    <div className="kyc-text">
                        <p className="kyc-status" style={{ color: 'rgba(255,255,255,0.8)' }}>Verification Status</p>
                        <h3 className="kyc-title" style={{ color: '#fff' }}>Tier 1 - {config.statusLabel}</h3>
                        <p className="kyc-desc" style={{ color: 'rgba(255,255,255,0.9)' }}>Unlock Stage 2 KYC to unlock more features</p>
                    </div>
                    <div className="kyc-arrow" style={{ color: '#fff' }}>&gt;</div>
                </div>

                {/* BADGES */}
                <div className="badge-card">
                    <div className="badge-header">
                        <h3 className="badge-title">Badges</h3>
                        <span className="badge-progress">5/8 earned</span>
                    </div>
                    <div className="badge-grid">
                        {config.badges.map((badge, index) => (
                            <div key={index} className={`badge ${badge.status}`}>{badge.label}</div>
                        ))}
                    </div>
                </div>

                {/* ACTIVITY */}
                <div className="section">
                    <h3>My Activity</h3>
                    {config.activity.map((item, idx) => (
                        <div key={idx} className="card" onClick={() => openPopup('desc', item.label)} style={{ cursor: 'pointer' }}>
                            <span>{item.icon} {item.label}</span>
                            <span style={{ fontWeight: '300', color: '#666', fontSize: '14px' }}>{item.detail} &gt;</span>
                        </div>
                    ))}
                </div>

                {/* ACCOUNT */}
                <div className="section">
                    <h3>Account</h3>
                    <div className="card" onClick={() => openPopup('form', 'Edit Profile')} style={{ cursor: 'pointer' }}>
                        👤 Edit Profile <span style={{ fontWeight: '300', color: '#666', fontSize: '13px' }}>Update info &gt;</span>
                    </div>
                    <div className="card" onClick={() => openPopup('form', 'Change Password')} style={{ cursor: 'pointer' }}>
                        🔒 Change Password <span style={{ fontWeight: '300', color: '#666', fontSize: '13px' }}>Security &gt;</span>
                    </div>
                    <div className="card" onClick={() => openPopup('form', 'Bank Account')} style={{ cursor: 'pointer' }}>
                        🏦 Bank Account <span style={{ fontWeight: '300', color: '#666', fontSize: '13px' }}>**** 3456 &gt;</span>
                    </div>
                    <div className="card" onClick={() => openPopup('kyc', 'KYC Verification')} style={{ cursor: 'pointer' }}>
                        🛡️ KYC Verification <span className="green-text" style={{ fontWeight: '300', fontSize: '13px' }}>Tier 1 Active &gt;</span>
                    </div>

                    <div className="card toggle">
                        <span>🔔 Notifications</span>
                        <label className="switch">
                            <input type="checkbox" checked={notificationsOn} onChange={() => setNotificationsOn(!notificationsOn)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>



                {/* PREFERENCES, SUPPORT, SIGNOUT (Kept exactly same) */}
                <div className="section">
                    <h3>Preferences</h3>
                    <div className="card">🌐 Language <span>English</span></div>
                    <div className="card">💱 Currency <span>NGN</span></div>
                    <div className="card toggle">
                        <span>🌙 Dark Mode</span>
                        <label className="switch">
                            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="section">
                    <h3>Support</h3>
                    <div className="card">❓ Help & FAQ <span>&gt;</span></div>
                    <div className="card">📄 Privacy Policy <span>&gt;</span></div>
                    <div className="card">⭐ Rate App <span>&gt;</span></div>
                </div>

                <div className="signout-section">
                    <button className="signout-btn" onClick={() => {
                        localStorage.removeItem("vitUser");
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}>Sign Out</button>
                </div>
            </div>

            {/* DYNAMIC MODAL SYSTEM - Full Forms */}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {modalContent === 'kyc' && <KycOverview role={role} onClose={() => setShowModal(false)} />}

                    {modalContent === 'desc' && (
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <h2 style={{ marginBottom: '10px' }}>{activeTab}</h2>
                            <p style={{ color: '#555' }}>View your {activeTab.toLowerCase()} history and performance metrics here.</p>
                            <button className="vitel-otp-btn" style={{ marginTop: '20px' }} onClick={() => setShowModal(false)}>Close</button>
                        </div>
                    )}

                    {modalContent === 'form' && (
                        <div style={{ padding: '20px' }}>
                            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>{activeTab}</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                                {activeTab === 'Edit Profile' && (
                                    <>
                                        <input type="text" placeholder="Full Name" defaultValue={user?.full_name} className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                        <input type="text" placeholder="Phone Number" className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                        <input type="email" placeholder="Email Address" defaultValue={user?.email} className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                    </>
                                )}

                                {activeTab === 'Change Password' && (
                                    <>
                                        <input type="password" placeholder="Current Password" className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                        <input type="password" placeholder="New Password" className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                        <input type="password" placeholder="Confirm New Password" className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                    </>
                                )}

                                {activeTab === 'Bank Account' && (
                                    <>
                                        <select className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
                                            <option>Access Bank</option>
                                            <option>GTBank</option>
                                            <option>Zenith Bank</option>
                                            <option>Kuda MFB</option>
                                        </select>
                                        <input type="text" placeholder="Account Number" className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                        <input type="text" placeholder="Account Name" className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                    </>
                                )}

                                <button className="vitel-otp-btn" style={{ width: '100%', marginTop: '10px' }} onClick={() => setShowModal(false)}>Save Changes</button>
                            </div>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
}