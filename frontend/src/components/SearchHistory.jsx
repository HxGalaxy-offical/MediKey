import "./SearchHistory.css";

function SearchHistory() {
  const searchHistory = [
    {
      medicine: "Paracetamol",
      date: "10 Sep 2026",
    },
    {
      medicine: "Amoxicillin",
      date: "9 Sep 2026",
    },
    {
      medicine: "Cetirizine",
      date: "8 Sep 2026",
    },
    {
      medicine: "Azithromycin",
      date: "7 Sep 2026",
    },
  ];

  return (
    <div className="history-page">
      <h1>Search History</h1>
      <p className="history-subtitle">
        Your previous medicine searches
      </p>

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
    </div>
  );
}

export default SearchHistory;