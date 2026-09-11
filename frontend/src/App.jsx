import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./components/home.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddMedicine from "./pages/admin/AddMedicine";
import BulkUpload from "./pages/admin/BulkUpload";
import ManageUsers from "./pages/admin/ManageUsers";
import Analytics from "./pages/admin/Analytics";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
  path="/admin/add-medicine"
  element={<AddMedicine />}
/>
<Route
  path="/admin/bulk-upload"
  element={<BulkUpload />}
/>
<Route
  path="/admin/users"
  element={<ManageUsers />}
/>
<Route
  path="/admin/analytics"
  element={<Analytics />}
/>
        

        <Route
          path="/dashboard"
          element={<h1>Dashboard Coming Soon</h1>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;