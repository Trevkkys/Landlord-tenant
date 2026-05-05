import React from "react";

const KycBanner = () => {
    return (
        <div
            className="kyc-banner"
            onClick={() => navigate("/kyc")}
        >

            {/* LEFT ICON */}
            <div className="kyc-icon">
                🔐
            </div>

            {/* TEXT SECTION */}
            <div className="kyc-text">

                <p className="kyc-status">
                    Verification Status
                </p>

                <h3 className="kyc-title">
                    Tier 1 - Basic Verified
                </h3>

                <p className="kyc-desc">
                    Unlock Stage 2 KYC to unlock more features
                </p>

            </div>

            {/* RIGHT ARROW */}
            <div className="kyc-arrow">
                &gt;
            </div>

        </div>
    );
};

export default KycBanner;