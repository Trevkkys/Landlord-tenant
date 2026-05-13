import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { profileService } from "../services/api";
import { BiSolidShield } from "react-icons/bi";
import KycOverview from "./KycOverview";
import { useRef } from "react";
import Modal from "../components/Modal";

export default function Profile() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [notificationsOn, setNotificationsOn] = useState(true);
    const [bankForm, setBankForm] = useState({ bank_name: "Access Bank", account_number: "", account_name: "" });
    const [darkMode, setDarkMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [language, setLanguage] = useState("English");
    const [currency, setCurrency] = useState("NGN");

    // New states for dynamic popups
    const [modalContent, setModalContent] = useState(null);
    const [activeTab, setActiveTab] = useState("");

    // Form States for API
    const [profileForm, setProfileForm] = useState({ full_name: "", phone_number: "", email: "" });
    const [passwordForm, setPasswordForm] = useState({ current_password: "", new_password: "", confirm_password: "" });

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("vitUser")) || null);
    const role = user?.role || "tenant";

    const [activeFaq, setActiveFaq] = useState(null);
    const faqData = [
        { q: "How do I apply for a property?", a: "Find a 'Verified' listing, click 'Apply Now', and fill in your details. Once approved, pay into the secure Vitel Escrow account." },
        { q: "How does escrow work?", a: "Vitel holds your payment safely. Funds are only released to the landlord after our field agents confirm the property and you have moved in." },
        { q: "Can I cancel a booking?", a: "Yes. You get a 100% refund if the physical inspection fails. For personal changes, landlord-specific cancellation policies apply." },
        { q: "What is the 1% property tax?", a: "This is a platform service fee that covers digital verification, physical enumerator site visits, and legal document protection." },
        { q: "How do I get my deposit back?", a: "Request a refund on your dashboard. Once the landlord confirms no damages, funds are sent to your bank account within 24 hours." }
    ];

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

    const fetchProfileData = async () => {
        try {
            const result = await profileService.getProfile(role);
            const freshUser = result.data || result;

            // Update both to keep them in sync
            localStorage.setItem("vitUser", JSON.stringify(freshUser));
            setUser(freshUser); // This triggers the UI update!

            setProfileForm({
                full_name: freshUser.full_name || "",
                phone_number: freshUser.phone_number || "",
                email: freshUser.email || ""
            });
        } catch (err) {
            console.error("Service Error:", err.message);
        }
    };

    // Run on mount
    useEffect(() => {
        fetchProfileData();
    }, [role]);

    // 2. CLEAN UPDATE: Uses the service
    const handleSaveProfile = async () => {
        try {
            await profileService.updateProfile(role, profileForm);
            alert("Profile updated!");
            setShowModal(false);
            fetchProfileData(); // Refresh data
        } catch (err) {
            alert("Update failed. Check console for CORS or Network errors.");
        }
    };

    // 3. CLEAN PASSWORD: Swapped old fetch for the service
    const handleSavePassword = async () => {
        if (passwordForm.new_password !== passwordForm.confirm_password) {
            alert("Passwords do not match");
            return;
        }
        try {
            // Note: We use the service here too!
            await profileService.changePassword(role, {
                current_password: passwordForm.current_password,
                new_password: passwordForm.new_password
            });
            alert("Password changed successfully!");
            setShowModal(false);
            setPasswordForm({ current_password: "", new_password: "", confirm_password: "" }); // Reset form
        } catch (err) {
            console.error(err);
            alert("Password change failed. Check your current password.");
            setPasswordForm(prev => ({ ...prev, current_password: "" }));
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const uploadRes = await profileService.uploadImage(file);
            // The backend returns 'file_url' in Postman
            const newPath = uploadRes.file_url;

            if (newPath) {
                // 1. Tell the backend to save this path to the user's profile
                await profileService.updateProfileAvatar(user.role, newPath);

                // 2. Update the local React state so the image changes immediately
                const updatedUser = { ...user, avatar_url: newPath };
                setUser(updatedUser);

                // 3. Update localStorage so it stays there when you refresh
                localStorage.setItem("vitUser", JSON.stringify(updatedUser));

                alert("Profile picture updated!");
            }
        } catch (err) {
            console.error("Upload Error:", err);
            alert("Upload failed. Check the console for details.");
        } finally {
            setIsUploading(false);
        }
    };

    const openPopup = (type, title) => {
        if (title === 'Edit Profile') {
            setProfileForm({
                full_name: user?.full_name || "",
                phone_number: user?.phone_number || "",
                email: user?.email || ""
            });
        }
        setActiveTab(title);
        setModalContent(type);
        setShowModal(true);
    };

    return (
        <div className="profile-page" style={{ backgroundColor: config.bg, minHeight: '100vh' }}>
            <Navbar />
            <div className="profile-scroll">
                <div className="profile-header">
                    <div className="avatar-wrapper">
                        <div className="profile-avatar" style={{ overflow: 'hidden', position: 'relative' }}>
                            {isUploading ? (
                                <span className="loader">⌛</span> // Simple loading indicator
                            ) : user?.avatar_url ? (
                                <img
                                    src={
                                        user.avatar_url?.startsWith('/uploads')
                                            ? `${import.meta.env.VITE_API_URL || 'https://rent-safe-backend.onrender.com'}${user.avatar_url}`
                                            : user.avatar_url || "https://ui-avatars.com/api/?name=User"
                                    }
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        // THIS PART IS CRITICAL:
                                        console.log("CHECK THIS URL IN CONSOLE:", e.target.src);
                                        e.target.src = "https://ui-avatars.com/api/?name=User&background=EBF4FF&color=7F9CF5";
                                    }}
                                    alt="Profile"
                                />
                            ) : (
                                user?.full_name ? user.full_name.charAt(0).toUpperCase() : "M"
                            )}
                        </div>

                        {/* Trigger the hidden input when pencil is clicked */}
                        <div
                            className="edit-avatar-btn"
                            onClick={() => fileInputRef.current.click()}
                            style={{ cursor: 'pointer' }}
                        >
                            ✏️
                        </div>

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
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

                <div className="kyc-banner" onClick={() => openPopup('kyc', 'KYC Overview')} style={{ cursor: "pointer", backgroundColor: config.kycBg }}>
                    <div className="kyc-icon"><BiSolidShield size={32} color="#F3F3F3" /></div>
                    <div className="kyc-text">
                        <p className="kyc-status" style={{ color: 'rgba(255,255,255,0.8)' }}>Verification Status</p>
                        <h3 className="kyc-title" style={{ color: '#fff' }}>Tier 1 - {config.statusLabel}</h3>
                        <p className="kyc-desc" style={{ color: 'rgba(255,255,255,0.9)' }}>Unlock Stage 2 KYC to unlock more features</p>
                    </div>
                    <div className="kyc-arrow" style={{ color: '#fff' }}>&gt;</div>
                </div>

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

                <div className="section">
                    <h3>My Activity</h3>
                    {config.activity.map((item, idx) => (
                        <div key={idx} className="card" onClick={() => openPopup('desc', item.label)} style={{ cursor: 'pointer' }}>
                            <span>{item.icon} {item.label}</span>
                            <span style={{ fontWeight: '300', color: '#666', fontSize: '14px' }}>{item.detail} &gt;</span>
                        </div>
                    ))}
                </div>

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

                <div className="section">
                    <h3>Preferences</h3>
                    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>🌐 Language</span>
                        <select value={language} onChange={(e) => setLanguage(e.target.value)}
                            onFocus={(e) => e.target.style.color = '#069494'} onBlur={(e) => e.target.style.color = '#666'}
                            style={{ border: 'none', background: 'transparent', color: '#666', fontWeight: '300', fontSize: '14px', outline: 'none', cursor: 'pointer', textAlign: 'right', appearance: 'none' }}>
                            <option value="English">English</option><option value="Yoruba">Yoruba</option><option value="Igbo">Igbo</option><option value="Hausa">Hausa</option>
                        </select>
                    </div>

                    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>💱 Currency</span>
                        <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                            onFocus={(e) => e.target.style.color = '#069494'} onBlur={(e) => e.target.style.color = '#666'}
                            style={{ border: 'none', background: 'transparent', color: '#666', fontWeight: '300', fontSize: '14px', outline: 'none', cursor: 'pointer', textAlign: 'right', appearance: 'none' }}>
                            <option value="NGN">NGN (₦)</option><option value="USD">USD ($)</option><option value="GBP">GBP (£)</option><option value="EUR">EUR (€)</option>
                        </select>
                    </div>

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
                    <div className="card" onClick={() => openPopup('faq', 'Help & FAQ')} style={{ cursor: 'pointer' }}>❓ Help & FAQ <span style={{ fontWeight: '300', color: '#666' }}>&gt;</span></div>
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

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {modalContent === 'kyc' && <KycOverview role={role} onClose={() => setShowModal(false)} />}
                    {modalContent === 'faq' && (
                        <div style={{ padding: '20px', textAlign: 'left', maxHeight: '70vh', overflowY: 'auto' }}>
                            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>{activeTab}</h2>
                            {faqData.map((item, index) => (
                                <div key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
                                    <div
                                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '10px 0' }}
                                    >
                                        <p style={{ fontWeight: '500', color: activeFaq === index ? '#28a745' : '#333', fontSize: '14px', margin: 0 }}>{item.q}</p>
                                        <span style={{ transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s', color: activeFaq === index ? '#28a745' : '#666', fontSize: '12px' }}>▼</span>
                                    </div>

                                    {activeFaq === index && (
                                        <p style={{ fontSize: '13px', color: '#666', fontWeight: '300', lineHeight: '1.5', padding: '0 0 10px 0', margin: 0 }}>
                                            {item.a}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <button className="vitel-otp-btn" style={{ marginTop: '20px' }} onClick={() => setShowModal(false)}>Close</button>
                        </div>
                    )}
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
                                        <input type="text" placeholder="Full Name" value={profileForm.full_name} onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })} className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                        <input type="text" placeholder="Phone Number" value={profileForm.phone_number} onChange={(e) => setProfileForm({ ...profileForm, phone_number: e.target.value })} className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                        <input type="email" placeholder="Email Address" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                        <button className="vitel-otp-btn" onClick={handleSaveProfile}>Save Changes</button>
                                    </>
                                )}
                                {activeTab === 'Change Password' && (
                                    <>
                                        <input type="password" placeholder="Current Password" onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })} className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                        <input type="password" placeholder="New Password" onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })} className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                        <input type="password" placeholder="Confirm New Password" onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })} className="auth-input" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                                        <button className="vitel-otp-btn" onClick={handleSavePassword}>Save Password</button>
                                    </>
                                )}
                                {activeTab === 'Bank Account' && (
                                    <>
                                        <select
                                            className="auth-input"
                                            value={bankForm.bank_name}
                                            onChange={(e) => setBankForm({ ...bankForm, bank_name: e.target.value })}
                                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}
                                        >
                                            <option>Access Bank</option>
                                            <option>GTBank</option>
                                            <option>Zenith Bank</option>
                                            <option>Kuda MFB</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Account Number"
                                            value={bankForm.account_number}
                                            onChange={(e) => setBankForm({ ...bankForm, account_number: e.target.value })}
                                            className="auth-input"
                                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Account Name"
                                            value={bankForm.account_name}
                                            onChange={(e) => setBankForm({ ...bankForm, account_name: e.target.value })}
                                            className="auth-input"
                                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                                        />
                                        <button className="vitel-otp-btn" onClick={() => {
                                            if (bankForm.account_number.length !== 10 || isNaN(bankForm.account_number)) {
                                                alert("Please enter a valid 10-digit Account Number");
                                                return;
                                            }
                                            console.log("Saving Bank Info:", bankForm);
                                            // Call your profileService update here when ready
                                            setShowModal(false);
                                        }}>Save Changes</button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
}