import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/kycOverview.css";

export default function KycOverview({ onClose }) {
    const navigate = useNavigate();

    return (
        <div className="kyc-container">

            {/* HEADER */}
            <div className="kyc-header">

                <h2 className="kyc-overview-title">
                    KYC Verification
                </h2>

                <p className="kyc-subtitle">
                    Your current verification progress
                </p>

            </div>

            {/* TIER 1 - COMPLETED */}
            <div className="kyc-block completed">

                <div className="kyc-left">
                    <div className="kyc-icon success">✔</div>

                    <div>
                        <h3 className="kyc-stage">
                            Stage 1 - Basic Identity
                        </h3>
                        <p className="kyc-desc">
                            NIN / BVN / Passport
                        </p>
                    </div>
                </div>

                <div className="kyc-status success">
                    ✅
                </div>
            </div>

            {/* TIER 2 - LOCKED */}
            <div className="kyc-block locked">

                <div className="kyc-left">
                    <div className="kyc-icon number">2</div>

                    <div>
                        <h3 className="kyc-stage">
                            Stage 2 - Extended Verification
                        </h3>
                        <p className="kyc-desc">
                            Selfie • Employment • Income • Rent Budget
                        </p>
                    </div>
                </div>

                <div className="kyc-status locked">
                    🔒
                </div>
            </div>

            {/* CTA BUTTON */}
            <button
                className="kyc-submit-btn"
                onClick={() => {
                    onClose?.();        // closes modal
                    navigate("/kyc");   // goes to full page
                }}
            >
                Complete Stage 2 KYC
            </button>

        </div>
    );
}