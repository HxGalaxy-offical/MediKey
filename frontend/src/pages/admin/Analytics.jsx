import React from "react";

function Analytics() {
  return (
    <div className="admin-page">

      <div className="admin-header">
        <h1>Analytics</h1>
        <p>
          View medicine, user, search, and expiry statistics.
        </p>
      </div>

      <div className="analytics-grid">

        <div className="analytics-card">
          <div className="analytics-icon">💊</div>
          <p>Total Medicines</p>
          <h2>1,250</h2>
          <span>Medicine records</span>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon">👥</div>
          <p>Total Users</p>
          <h2>342</h2>
          <span>Registered users</span>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon">🔍</div>
          <p>Total Searches</p>
          <h2>5,684</h2>
          <span>Medicine searches</span>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon">⚠️</div>
          <p>Expiring Soon</p>
          <h2 className="analytics-warning">43</h2>
          <span>Need attention</span>
        </div>

      </div>

      <div className="analytics-section">

        <h2>System Overview</h2>

        <div className="progress-item">
          <div className="progress-label">
            <span>Active Users</span>
            <strong>82%</strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: "82%" }}
            ></div>
          </div>
        </div>

        <div className="progress-item">
          <div className="progress-label">
            <span>Medicine Availability</span>
            <strong>91%</strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: "91%" }}
            ></div>
          </div>
        </div>

        <div className="progress-item">
          <div className="progress-label">
            <span>Pharmacist Accounts</span>
            <strong>27</strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: "55%" }}
            ></div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Analytics;