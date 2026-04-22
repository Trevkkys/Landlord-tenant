import React, { useState } from "react";
import "./ListProperty.css";
import { Link } from "react-router-dom";

export default function ListProperty() {

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        location: "",
        type: "",
        bedrooms: "",
        bathrooms: "",
        description: "",
        image: "",
        status: "available",
    });

    const [imageSource, setImageSource] = useState("");
    const [role, setRole] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]?.name || ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!role) {
            alert("Please select a role (Landlord or Tenant)");
            return;
        }

        const finalData = {
            ...formData,
            role
        };

        console.log("Property Submitted:", finalData);
        alert("Property Listed Successfully ✅");
    };

    return (
        <div className="list-property-page">

            {/* LEFT SIDE */}
            <div className="list-property-left">

                <h1>List Your Property</h1>

                <p>
                    Post your property on VitRent and connect with trusted tenants,
                    agents, and landlords easily.
                </p>

                <div className="list-property-features">
                    <p>✔ Smart property listings</p>
                    <p>✔ Trusted landlord–tenant system</p>
                    <p>✔ Fast and secure rental process</p>
                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="list-property-right">

                <div className="list-property-card">

                    <h2>Create Listing 🏠</h2>
                    <p>Fill in all property details</p>

                    {/* TITLE */}
                    <input
                        placeholder="Property Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    {/* PRICE */}
                    <input
                        placeholder="Price (₦)"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    {/* LOCATION */}
                    <input
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />

                    {/* TYPE */}
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="">Select Property Type</option>
                        <option value="apartment">Apartment</option>
                        <option value="duplex">Duplex</option>
                        <option value="bungalow">Bungalow</option>
                        <option value="self-contain">Self Contain</option>
                    </select>

                    {/* BED / BATH */}
                    <div className="form-row">

                        <input
                            placeholder="Bedrooms"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                        />

                        <input
                            placeholder="Bathrooms"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                        />

                    </div>

                    {/* IMAGE */}
                    <select
                        value={imageSource}
                        onChange={(e) => setImageSource(e.target.value)}
                    >
                        <option value="">Choose upload method</option>
                        <option value="gallery">Choose from Gallery</option>
                        <option value="camera">Take Photo (Camera)</option>
                        <option value="file">Upload File</option>
                    </select>

                    {(imageSource === "gallery" || imageSource === "file") && (
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    )}

                    {imageSource === "camera" && (
                        <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
                    )}

                    {/* DESCRIPTION */}
                    <textarea
                        placeholder="Describe the property..."
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    {/* STATUS */}
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="available">Available</option>
                        <option value="rented">Rented</option>
                    </select>

                    {/* ROLE */}
                    <p className="role-title">Who is listing?</p>

                    <div className="role-buttons">

                        <button
                            type="button"
                            className={role === "landlord" ? "role-active" : ""}
                            onClick={() => setRole("landlord")}
                        >
                            Landlord
                        </button>

                        <button
                            type="button"
                            className={role === "tenant" ? "role-active" : ""}
                            onClick={() => setRole("tenant")}
                        >
                            Tenant
                        </button>

                    </div>

                    {/* SUBMIT */}
                    <button className="login-btn" onClick={handleSubmit}>
                        List Property
                    </button>

                    {/* BACK */}
                    <div className="auth-back">
                        <Link to="/" className="back-link">
                            ← Back to Home
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
}