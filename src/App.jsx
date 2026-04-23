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
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminDisputes from "./pages/admin/AdminDisputes";
import ListProperty from "./pages/ListProperty";
import Properties from "./pages/Properties";
import LandlordAnalytics from "./pages/LandlordAnalytics";
import AgentAnalytics from "./pages/AgentAnalytics";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        <Route path="/admin/disputes" element={<AdminDisputes />} />
        <Route path="/tenant" element={<TenantDashboard />} />
        <Route path="/landlord" element={<LandlordDashboard />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/list-property" element={<ListProperty />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/landlord/analytics" element={<LandlordAnalytics />} />
        <Route path="/agent/analytics" element={<AgentAnalytics />} />
      </Routes >
    </>
  );
}