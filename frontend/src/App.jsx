import { useState } from "react";
import Dashboard from "./components/Dashboard";
import SearchHistory from "./components/SearchHistory";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div>
      <nav className="navbar">
        <button onClick={() => setPage("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setPage("history")}>
          Search History
        </button>
      </nav>

      {page === "dashboard" && <Dashboard />}
      {page === "history" && <SearchHistory />}
    </div>
  );
}

export default App;