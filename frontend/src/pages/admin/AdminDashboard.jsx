import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";

function AdminDashboard() {
  return (
    <div className="admin-page">

      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>
          Manage medicines, users, uploads, and system analytics.
        </p>
      </div>

      <div className="admin-stats">

        <div className="stat-card">
          <p>Total Medicines</p>
          <h2>1,250</h2>
        </div>

        <div className="stat-card">
          <p>Total Users</p>
          <h2>342</h2>
        </div>

        <div className="stat-card">
          <p>Pharmacists</p>
          <h2>27</h2>
        </div>

        <div className="stat-card">
          <p>Expiring Soon</p>
          <h2 className="warning-number">43</h2>
        </div>

      </div>

      <h2 className="controls-title">
        Admin Controls
      </h2>

      <div className="admin-controls">

        <Link
          to="/admin/add-medicine"
          className="admin-card"
        >
          <div className="admin-icon">💊</div>
          <h3>Add Medicine</h3>
          <p>
            Add a new medicine record to the MediKey database.
          </p>
          <span>Add Medicine →</span>
        </Link>

        <Link
          to="/admin/bulk-upload"
          className="admin-card"
        >
          <div className="admin-icon">📁</div>
          <h3>Bulk Upload</h3>
          <p>
            Upload hundreds of medicine records using a CSV file.
          </p>
          <span>Upload CSV →</span>
        </Link>

        <Link
          to="/admin/users"
          className="admin-card"
        >
          <div className="admin-icon">👥</div>
          <h3>Manage Users</h3>
          <p>
            View, block, and manage registered users and pharmacists.
          </p>
          <span>Manage Users →</span>
        </Link>

        <Link
          to="/admin/analytics"
          className="admin-card"
        >
          <div className="admin-icon">📊</div>
          <h3>Analytics</h3>
          <p>
            View medicine, user, search, and expiry statistics.
          </p>
          <span>View Analytics →</span>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;