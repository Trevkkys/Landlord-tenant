import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TenantDashboard from "./pages/TenantDashboard";
import LandlordDashboard from "./pages/LandlordDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import Profile from "./pages/Profile";
import Insurance from "./pages/Insurance";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tenant" element={<TenantDashboard />} />
        <Route path="/landlord" element={<LandlordDashboard />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/insurance" element={<Insurance />} />
      </Routes >
    </>
  );
}