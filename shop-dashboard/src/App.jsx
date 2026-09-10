import { useEffect, useMemo, useState } from "react";
import "./App.css";

const medicinesData = [
  { id: 1, name: "Paracetamol 500mg", generic: "Paracetamol", stock: 120, expiry: "2027-01-10", batch: "PCM001", price: 25 },
  { id: 2, name: "Amoxicillin 500mg", generic: "Amoxicillin", stock: 5, expiry: "2026-10-15", batch: "AMX002", price: 85 },
  { id: 3, name: "Cetirizine 10mg", generic: "Cetirizine", stock: 150, expiry: "2027-02-20", batch: "CTZ003", price: 18 },
  { id: 4, name: "Ibuprofen 400mg", generic: "Ibuprofen", stock: 90, expiry: "2027-05-12", batch: "IBU004", price: 35 },
  { id: 5, name: "Pantoprazole 40mg", generic: "Pantoprazole", stock: 110, expiry: "2027-06-18", batch: "PAN005", price: 55 },
  { id: 6, name: "Metformin 500mg", generic: "Metformin", stock: 3, expiry: "2026-09-30", batch: "MET006", price: 30 },
  { id: 7, name: "Azithromycin 500mg", generic: "Azithromycin", stock: 60, expiry: "2027-04-05", batch: "AZI007", price: 95 },
  { id: 8, name: "Omeprazole 20mg", generic: "Omeprazole", stock: 40, expiry: "2026-12-12", batch: "OME008", price: 42 },
  { id: 9, name: "Diclofenac 50mg", generic: "Diclofenac", stock: 25, expiry: "2027-03-15", batch: "DIC009", price: 28 },
  { id: 10, name: "Levocetirizine 5mg", generic: "Levocetirizine", stock: 80, expiry: "2027-08-01", batch: "LEV010", price: 32 },
];

const menu = [
  ["dashboard", "⌂", "Dashboard"],
  ["medicines", "💊", "Medicines"],
  ["stock", "▣", "Stock Manager"],
  ["expiry", "⚠", "Expiry Alerts"],
  ["reports", "▥", "Reports"],
  ["settings", "⚙", "Settings"],
];

function expiryStatus(date) {
  const today = new Date();
  const exp = new Date(date);
  const days = Math.ceil((exp - today) / 86400000);

  if (days < 0) return "Expired";
  if (days <= 30) return "30 Days";
  if (days <= 90) return "90 Days";
  return "Safe";
}

function Status({ medicine }) {
  return medicine.stock < 10 ? (
    <span className="status low">Low Stock</span>
  ) : (
    <span className="status available">Available</span>
  );
}

function MedicineTable({ medicines, onEdit, onDelete, onView }) {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Generic Name</th>
            <th>Stock</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {medicines.map((m) => (
            <tr key={m.id}>
              <td>
                <button className="medicineName" onClick={() => onView(m)}>
                  {m.name}
                </button>
              </td>

              <td>{m.generic}</td>

              <td className={m.stock < 10 ? "redStock" : ""}>
                {m.stock}
              </td>

              <td>{m.expiry}</td>

              <td>
                <Status medicine={m} />
              </td>

              <td>
                <div className="actions">
                  <button
                    className="editBtn"
                    onClick={() => onEdit(m)}
                  >
                    ✎
                  </button>

                  <button
                    className="deleteBtn"
                    onClick={() => onDelete(m.id)}
                  >
                    🗑
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {medicines.length === 0 && (
        <div className="empty">
          <span>🔎</span>
          <h3>No medicines found</h3>
          <p>Try another medicine name.</p>
        </div>
      )}
    </div>
  );
}

/* DASHBOARD */

function Dashboard({
  medicines,
  search,
  setSearch,
  setPage,
  setSelected,
  openAdd,
  editMedicine,
  deleteMedicine,
}) {
  const lowStock = medicines.filter((m) => m.stock < 10);

  const expired = medicines.filter(
    (m) => expiryStatus(m.expiry) === "Expired"
  );

  const within30 = medicines.filter(
    (m) => expiryStatus(m.expiry) === "30 Days"
  );

  const within90 = medicines.filter(
    (m) => expiryStatus(m.expiry) === "90 Days"
  );

  const expiringSoon = [...expired, ...within30, ...within90];

  const filtered = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.generic.toLowerCase().includes(search.toLowerCase()) ||
      m.batch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="pageTitle">
        <h1>Shop Dashboard</h1>
        <p>Pharmacy Summary</p>
      </div>

      <div className="cards">
        <div className="card blue">
          <div className="cardIcon">💊</div>
          <div>
            <span>Total Medicines</span>
            <strong>{medicines.length}</strong>
          </div>
        </div>

        <div className="card green">
          <div className="cardIcon">📦</div>
          <div>
            <span>In Stock</span>
            <strong>{medicines.length - lowStock.length}</strong>
          </div>
        </div>

        <div className="card yellow">
          <div className="cardIcon">⚠</div>
          <div>
            <span>Low Stock</span>
            <strong>{lowStock.length}</strong>
          </div>
        </div>

        <div className="card red">
          <div className="cardIcon">⏰</div>
          <div>
            <span>Expiring Soon</span>
            <strong>{expiringSoon.length}</strong>
          </div>
        </div>
      </div>

      <div className="dashboardGrid">

        <div className="leftContent">

          <div className="searchRow">
            <div className="search">
              <span>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search medicine by name, generic name or batch number..."
              />
            </div>

            <button className="addBtn" onClick={openAdd}>
              + Add Medicine
            </button>
          </div>

          <div className="box">
            <div className="boxHeader">
              <div>
                <h2>Recent Medicines</h2>
              </div>

              <button onClick={() => setPage("medicines")}>
                View All →
              </button>
            </div>

            <MedicineTable
              medicines={filtered.slice(0, 10)}
              onView={(m) => {
                setSelected(m);
                setPage("details");
              }}
              onEdit={editMedicine}
              onDelete={deleteMedicine}
            />
          </div>
        </div>

        <div className="rightContent">

          <div className="sideBox expiryBox">
            <div className="sideHeader">
              <h2>🔔 Expiry Alerts</h2>
              <button onClick={() => setPage("expiry")}>
                View All →
              </button>
            </div>

            <div className="alert">
              <span className="dot redDot"></span>
              <span>Expired</span>
              <b>{expired.length}</b>
              <span>›</span>
            </div>

            <div className="alert">
              <span className="dot orangeDot"></span>
              <span>Expiring within 30 days</span>
              <b>{within30.length}</b>
              <span>›</span>
            </div>

            <div className="alert">
              <span className="dot yellowDot"></span>
              <span>Expiring within 90 days</span>
              <b>{within90.length}</b>
              <span>›</span>
            </div>
          </div>

          <div className="sideBox quickBox">
            <h2>⚡ Quick Actions</h2>

            <button onClick={openAdd}>
              <span>＋</span>
              <b>Add Medicine</b>
              <strong>›</strong>
            </button>

            <button onClick={() => setPage("stock")}>
              <span>📦</span>
              <b>Manage Stock</b>
              <strong>›</strong>
            </button>

            <button onClick={() => setPage("expiry")}>
              <span>🔔</span>
              <b>View Expiry Alerts</b>
              <strong>›</strong>
            </button>

            <button onClick={() => setPage("reports")}>
              <span>📊</span>
              <b>Generate Report</b>
              <strong>›</strong>
            </button>
          </div>

          <div className="safeBox">
            <div className="safeIcon">🛡</div>
            <div>
              <b>Safe Medicines, Healthy Lives</b>
              <span>Track • Manage • Prevent Expiry</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

/* MEDICINES */

function Medicines({
  medicines,
  search,
  setSearch,
  setSelected,
  setPage,
  openAdd,
  editMedicine,
  deleteMedicine,
}) {
  const [filter, setFilter] = useState("All");

  const filtered = medicines.filter((m) => {
    const text =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.generic.toLowerCase().includes(search.toLowerCase()) ||
      m.batch.toLowerCase().includes(search.toLowerCase());

    if (filter === "Low") return text && m.stock < 10;
    if (filter === "Available") return text && m.stock >= 10;

    return text;
  });

  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Medicines</h1>
          <p>Manage your complete medicine inventory.</p>
        </div>

        <button className="addBtn" onClick={openAdd}>
          + Add Medicine
        </button>
      </div>

      <div className="toolbar">
        <div className="search">
          <span>⌕</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicines..."
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Low">Low Stock</option>
        </select>
      </div>

      <div className="box">
        <div className="boxHeader">
          <div>
            <h2>Medicine Inventory</h2>
            <p>{filtered.length} medicines found</p>
          </div>
        </div>

        <MedicineTable
          medicines={filtered}
          onView={(m) => {
            setSelected(m);
            setPage("details");
          }}
          onEdit={editMedicine}
          onDelete={deleteMedicine}
        />
      </div>
    </>
  );
}

/* STOCK */

function StockManager({ medicines, updateStock }) {
  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Stock Manager</h1>
          <p>Monitor and update medicine stock.</p>
        </div>
      </div>

      <div className="cards three">
        <div className="card blue">
          <div className="cardIcon">📦</div>
          <div>
            <span>Total Stock</span>
            <strong>
              {medicines.reduce((a, b) => a + b.stock, 0)}
            </strong>
          </div>
        </div>

        <div className="card green">
          <div className="cardIcon">✓</div>
          <div>
            <span>Healthy Items</span>
            <strong>
              {medicines.filter((m) => m.stock >= 10).length}
            </strong>
          </div>
        </div>

        <div className="card yellow">
          <div className="cardIcon">⚠</div>
          <div>
            <span>Low Stock</span>
            <strong>
              {medicines.filter((m) => m.stock < 10).length}
            </strong>
          </div>
        </div>
      </div>

      <div className="box stockBox">
        <div className="boxHeader">
          <div>
            <h2>Stock Control</h2>
            <p>Update stock instantly.</p>
          </div>
        </div>

        {medicines.map((m) => (
          <div className="stockRow" key={m.id}>
            <div className="medicineInfo">
              <div className="medicineIcon">💊</div>
              <div>
                <b>{m.name}</b>
                <span>{m.batch}</span>
              </div>
            </div>

            <div className={m.stock < 10 ? "redStock" : "goodStock"}>
              {m.stock} units
            </div>

            <div className="stockControls">
              <button onClick={() => updateStock(m.id, -1)}>
                −
              </button>
              <b>{m.stock}</b>
              <button onClick={() => updateStock(m.id, 1)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* EXPIRY */

function ExpiryAlerts({ medicines }) {
  const alerts = medicines.filter(
    (m) => expiryStatus(m.expiry) !== "Safe"
  );

  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Expiry Alerts</h1>
          <p>Monitor medicines nearing their expiry date.</p>
        </div>
      </div>

      <div className="cards three">
        <div className="card red">
          <div className="cardIcon">⏰</div>
          <div>
            <span>Expired</span>
            <strong>
              {medicines.filter(
                (m) => expiryStatus(m.expiry) === "Expired"
              ).length}
            </strong>
          </div>
        </div>

        <div className="card yellow">
          <div className="cardIcon">⚠</div>
          <div>
            <span>Within 30 Days</span>
            <strong>
              {medicines.filter(
                (m) => expiryStatus(m.expiry) === "30 Days"
              ).length}
            </strong>
          </div>
        </div>

        <div className="card blue">
          <div className="cardIcon">◷</div>
          <div>
            <span>Within 90 Days</span>
            <strong>
              {medicines.filter(
                (m) => expiryStatus(m.expiry) === "90 Days"
              ).length}
            </strong>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="boxHeader">
          <div>
            <h2>Expiry Monitor</h2>
            <p>{alerts.length} medicines require attention</p>
          </div>
        </div>

        {alerts.map((m) => (
          <div className="expiryRow" key={m.id}>
            <div className="medicineIcon">💊</div>

            <div>
              <b>{m.name}</b>
              <span>Batch: {m.batch}</span>
            </div>

            <div>
              <small>Expiry Date</small>
              <b>{m.expiry}</b>
            </div>

            <span
              className={
                expiryStatus(m.expiry) === "Expired"
                  ? "status low"
                  : "status warning"
              }
            >
              {expiryStatus(m.expiry)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

/* REPORTS */

function Reports({ medicines }) {
  const total = medicines.length;
  const low = medicines.filter((m) => m.stock < 10).length;
  const expired = medicines.filter(
    (m) => expiryStatus(m.expiry) === "Expired"
  ).length;

  const stock = medicines.reduce((a, b) => a + b.stock, 0);

  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Reports</h1>
          <p>Pharmacy inventory overview and analytics.</p>
        </div>

        <button className="addBtn" onClick={() => window.print()}>
          Print Report
        </button>
      </div>

      <div className="cards">
        <div className="card blue">
          <div className="cardIcon">💊</div>
          <div>
            <span>Total Medicines</span>
            <strong>{total}</strong>
          </div>
        </div>

        <div className="card green">
          <div className="cardIcon">📦</div>
          <div>
            <span>Total Units</span>
            <strong>{stock}</strong>
          </div>
        </div>

        <div className="card yellow">
          <div className="cardIcon">⚠</div>
          <div>
            <span>Low Stock</span>
            <strong>{low}</strong>
          </div>
        </div>

        <div className="card red">
          <div className="cardIcon">⏰</div>
          <div>
            <span>Expired</span>
            <strong>{expired}</strong>
          </div>
        </div>
      </div>

      <div className="box">
        <h2>Inventory Summary</h2>

        <div className="summary">
          <div>
            <span>Total Medicines</span>
            <b>{total}</b>
          </div>

          <div>
            <span>Total Stock Units</span>
            <b>{stock}</b>
          </div>

          <div>
            <span>Low Stock Items</span>
            <b>{low}</b>
          </div>

          <div>
            <span>Expired Medicines</span>
            <b>{expired}</b>
          </div>
        </div>
      </div>
    </>
  );
}

/* SETTINGS */

function Settings() {
  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Settings</h1>
          <p>Manage pharmacy profile and preferences.</p>
        </div>
      </div>

      <div className="box settings">
        <h2>Pharmacy Information</h2>

        <div className="formGrid">
          <label>
            Pharmacy Name
            <input defaultValue="MediKey Pharmacy" />
          </label>

          <label>
            Pharmacist Name
            <input defaultValue="Pharmacist" />
          </label>

          <label>
            Email
            <input defaultValue="pharmacy@medikey.com" />
          </label>

          <label>
            Phone
            <input defaultValue="+91 98765 43210" />
          </label>

          <label className="full">
            Address
            <input defaultValue="Tamil Nadu, India" />
          </label>
        </div>

        <button className="addBtn">Save Changes</button>
      </div>
    </>
  );
}

/* DETAILS */

function Details({ medicine, setPage }) {
  return (
    <>
      <button className="backBtn" onClick={() => setPage("medicines")}>
        ← Back to Medicines
      </button>

      <div className="pageHeader">
        <div>
          <h1>{medicine.name}</h1>
          <p>Medicine details and inventory information.</p>
        </div>
      </div>

      <div className="detailsGrid">
        <div className="box profileBox">
          <div className="bigMedicine">💊</div>
          <h2>{medicine.name}</h2>
          <p>{medicine.generic}</p>
          <Status medicine={medicine} />
        </div>

        <div className="box">
          <h2>Medicine Information</h2>

          <div className="detail">
            <span>Generic Name</span>
            <b>{medicine.generic}</b>
          </div>

          <div className="detail">
            <span>Batch Number</span>
            <b>{medicine.batch}</b>
          </div>

          <div className="detail">
            <span>Current Stock</span>
            <b>{medicine.stock} units</b>
          </div>

          <div className="detail">
            <span>Expiry Date</span>
            <b>{medicine.expiry}</b>
          </div>

          <div className="detail">
            <span>Price</span>
            <b>₹{medicine.price}</b>
          </div>
        </div>
      </div>
    </>
  );
}

/* MODAL */

function MedicineModal({ medicine, close, save }) {
  const [form, setForm] = useState(
    medicine || {
      name: "",
      generic: "",
      stock: 0,
      expiry: "",
      batch: "",
      price: 0,
    }
  );

  const change = (key, value) => {
    setForm((old) => ({ ...old, [key]: value }));
  };

  const submit = (e) => {
    e.preventDefault();

    save({
      ...form,
      stock: Number(form.stock),
      price: Number(form.price),
    });
  };

  return (
    <div className="modalOverlay" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <div>
            <h2>{medicine ? "Edit Medicine" : "Add Medicine"}</h2>
            <p>Enter medicine information.</p>
          </div>

          <button onClick={close}>×</button>
        </div>

        <form onSubmit={submit}>
          <div className="formGrid">
            <label>
              Medicine Name
              <input
                value={form.name}
                onChange={(e) => change("name", e.target.value)}
                required
              />
            </label>

            <label>
              Generic Name
              <input
                value={form.generic}
                onChange={(e) => change("generic", e.target.value)}
                required
              />
            </label>

            <label>
              Batch Number
              <input
                value={form.batch}
                onChange={(e) => change("batch", e.target.value)}
              />
            </label>

            <label>
              Expiry Date
              <input
                type="date"
                value={form.expiry}
                onChange={(e) => change("expiry", e.target.value)}
                required
              />
            </label>

            <label>
              Stock
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => change("stock", e.target.value)}
              />
            </label>

            <label>
              Price
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => change("price", e.target.value)}
              />
            </label>
          </div>

          <div className="modalActions">
            <button type="button" className="cancel" onClick={close}>
              Cancel
            </button>

            <button className="addBtn">
              {medicine ? "Save Changes" : "Add Medicine"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* APP */

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [medicines, setMedicines] = useState(medicinesData);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const openAdd = () => {
    setEditing(null);
    setModal(true);
  };

  const editMedicine = (medicine) => {
    setEditing(medicine);
    setModal(true);
  };

  const deleteMedicine = (id) => {
    const item = medicines.find((m) => m.id === id);

    if (window.confirm(`Delete ${item?.name}?`)) {
      setMedicines((old) => old.filter((m) => m.id !== id));
    }
  };

  const saveMedicine = (medicine) => {
    if (medicine.id) {
      setMedicines((old) =>
        old.map((m) => (m.id === medicine.id ? medicine : m))
      );
    } else {
      setMedicines((old) => [
        ...old,
        {
          ...medicine,
          id: Date.now(),
          batch: medicine.batch || `MED${Date.now()}`,
        },
      ]);
    }

    setModal(false);
    setEditing(null);
  };

  const updateStock = (id, amount) => {
    setMedicines((old) =>
      old.map((m) =>
        m.id === id
          ? { ...m, stock: Math.max(0, m.stock + amount) }
          : m
      )
    );
  };

  const currentPage = useMemo(() => {
    switch (page) {
      case "medicines":
        return (
          <Medicines
            medicines={medicines}
            search={search}
            setSearch={setSearch}
            setSelected={setSelected}
            setPage={setPage}
            openAdd={openAdd}
            editMedicine={editMedicine}
            deleteMedicine={deleteMedicine}
          />
        );

      case "stock":
        return (
          <StockManager
            medicines={medicines}
            updateStock={updateStock}
          />
        );

      case "expiry":
        return <ExpiryAlerts medicines={medicines} />;

      case "reports":
        return <Reports medicines={medicines} />;

      case "settings":
        return <Settings />;

      case "details":
        return (
          <Details
            medicine={selected}
            setPage={setPage}
          />
        );

      default:
        return (
          <Dashboard
            medicines={medicines}
            search={search}
            setSearch={setSearch}
            setPage={setPage}
            setSelected={setSelected}
            openAdd={openAdd}
            editMedicine={editMedicine}
            deleteMedicine={deleteMedicine}
          />
        );
    }
  }, [page, medicines, search, selected]);

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="logo">
          <div className="logoIcon">💊</div>
          <div>
            <h2>MediKey</h2>
            <span>Scan • Verify • Stay Safe</span>
          </div>
        </div>

        <nav>
          {menu.map(([key, icon, name]) => (
            <button
              key={key}
              className={page === key ? "navItem active" : "navItem"}
              onClick={() => {
                setPage(key);
                setSelected(null);
              }}
            >
              <span className="navIcon">{icon}</span>
              <span>{name}</span>

              {key === "expiry" && (
                <b className="menuBadge">
                  {
                    medicines.filter(
                      (m) => expiryStatus(m.expiry) !== "Safe"
                    ).length
                  }
                </b>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebarBottom">
          <p>© 2025 MediKey</p>
          <span>Smart Medicine Management</span>
        </div>
      </aside>

      <main className="main">

        <header className="topbar">
          <div></div>

          <div className="profile">
            <span className="shop">🏪</span>

            <div>
              <b>Pharmacy / Shop</b>
              <small>Welcome, Pharmacist</small>
            </div>

            <span>⌄</span>

            <div className="avatar">👤</div>
          </div>
        </header>

        <section className="content">
          {currentPage}
        </section>
      </main>

      {modal && (
        <MedicineModal
          medicine={editing}
          close={() => {
            setModal(false);
            setEditing(null);
          }}
          save={saveMedicine}
        />
      )}
    </div>
  );
}