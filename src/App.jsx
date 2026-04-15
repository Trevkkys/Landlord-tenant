import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TenantDashboard from "./pages/TenantDashboard";
import LandlordDashboard from "./pages/LandlordDashboard";
import AgentDashboard from "./pages/AgentDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tenant" element={<TenantDashboard />} />
      <Route path="/landlord" element={<LandlordDashboard />} />
      <Route path="/agent" element={<AgentDashboard />} />
    </Routes>
  );
}