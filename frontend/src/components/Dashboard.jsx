import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [medicineCount, setMedicineCount] = useState(0);

  useEffect(() => {
    const history =
      JSON.parse(localStorage.getItem("searchHistory")) || [];

    setMedicineCount(history.length);
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to MediKey! 👋</h1>

      <p className="subtitle">
        Your Smart Medicine Verification Dashboard
      </p>

      <div className="dashboard-card">
        <h2>💊 Medicine Search</h2>
        <p>
          You have searched <strong>{medicineCount}</strong> medicines.
        </p>
      </div>

      <div className="dashboard-card">
        <h2>📋 Search History</h2>
        <p>
          View your previous medicine searches here.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;