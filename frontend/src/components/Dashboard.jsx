import "./Dashboard.css";

function Dashboard() {
  const userName = "User";
  const medicineCount = 12;

  return (
    <div className="dashboard">
      <h1>Welcome, {userName}! 👋</h1>

      <p className="subtitle">
        Welcome to MediKey Dashboard
      </p>

      <div className="dashboard-card">
        <h2>💊 Medicine Search</h2>
        <p>You have checked {medicineCount} medicines.</p>
      </div>

      <div className="dashboard-card">
        <h2>📋 Search History</h2>
        <p>View your previous medicine searches here.</p>
      </div>
    </div>
  );
}

export default Dashboard;