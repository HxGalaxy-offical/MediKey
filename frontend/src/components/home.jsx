import { useState } from "react";
import "./Home.css";

function Home() {
  const [medicineId, setMedicineId] = useState("");

  const handleSearch = () => {
    if (medicineId.trim() === "") {
      alert("Please enter Medicine ID");
      return;
    }

    alert("Searching: " + medicineId);
  };

  return (
    <div className="home">

      <nav className="navbar">
        <div className="logo">✚ MediKey</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#help">Help</a>
        </div>
      </nav>

      <section className="hero" id="home">

        <div className="hero-text">

          <div className="badge">
            ✓ Trusted Medicine Verification
          </div>

          <h1>
            Verify Your Medicine
          </h1>
          <h1>
            Before You Take It
          </h1>

          <p>
            Check medicine details quickly and securely using
            your unique Medicine ID.
          </p>

          <div className="search-box">

            <input
              type="text"
              placeholder="Enter Medicine ID"
              value={medicineId}
              onChange={(e) => setMedicineId(e.target.value)}
            />

            <button onClick={handleSearch}>
              Search
            </button>

          </div>

        </div>

        <div className="medicine-card">

          <div className="circle">💊</div>

          <h2>Medicine Check</h2>

          <p>
            Get important medicine information in seconds.
          </p>

          <div className="check-item">✓ Medicine authenticity</div>
          <div className="check-item">✓ Manufacturer details</div>
          <div className="check-item">✓ Manufacturing information</div>

        </div>

      </section>

      <section className="features" id="about">

        <div className="feature">
          <div className="feature-icon">🔍</div>
          <h3>Quick Search</h3>
          <p>Search your medicine using its unique ID.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">🛡️</div>
          <h3>Verification</h3>
          <p>Verify important medicine information.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">📋</div>
          <h3>Clear Details</h3>
          <p>View medicine information clearly.</p>
        </div>

      </section>

      <footer id="help">
        MediKey — Smart Medicine Verification System
      </footer>

    </div>
  );
}

export default Home;