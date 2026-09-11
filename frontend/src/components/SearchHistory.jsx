import { useEffect, useState } from "react";
import "./SearchHistory.css";

function SearchHistory() {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history =
      JSON.parse(localStorage.getItem("searchHistory")) || [];

    setSearchHistory(history);
  }, []);

  return (
    <div className="history-page">
      <h1>📋 Search History</h1>

      <p className="history-subtitle">
        View your previous medicine searches
      </p>

      {searchHistory.length === 0 ? (
        <div className="empty-history">
          <h2>🔍 No searches yet</h2>
          <p>Search for a medicine to see it here.</p>
        </div>
      ) : (
        <div className="history-list">
          {searchHistory.map((item, index) => (
            <div className="history-card" key={index}>
              <div>
                <h2>💊 {item.medicine}</h2>
                <p>Medicine searched</p>
              </div>

              <span>{item.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchHistory;