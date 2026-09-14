import React, { useState } from "react";

function AddMedicine() {
  const [medicine, setMedicine] = useState({
    name: "",
    genericName: "",
    category: "",
    manufacturer: "",
    price: "",
    stock: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setMedicine({
      ...medicine,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Medicine details:", medicine);

    alert("Medicine added successfully!");

    setMedicine({
      name: "",
      genericName: "",
      category: "",
      manufacturer: "",
      price: "",
      stock: "",
      expiryDate: "",
    });
  };

  return (
    <div className="admin-page">

      <div className="admin-header">
        <h1>Add Medicine</h1>
        <p>
          Add a new medicine record to the MediKey database.
        </p>
      </div>

      <div className="medicine-form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Medicine Name</label>
            <input
              type="text"
              name="name"
              value={medicine.name}
              onChange={handleChange}
              placeholder="Enter medicine name"
              required
            />
          </div>

          <div className="form-group">
            <label>Generic Name</label>
            <input
              type="text"
              name="genericName"
              value={medicine.genericName}
              onChange={handleChange}
              placeholder="Enter generic name"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={medicine.category}
              onChange={handleChange}
              placeholder="Example: Antibiotic"
              required
            />
          </div>

          <div className="form-group">
            <label>Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={medicine.manufacturer}
              onChange={handleChange}
              placeholder="Enter manufacturer"
              required
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={medicine.price}
                onChange={handleChange}
                placeholder="₹ 0.00"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={medicine.stock}
                onChange={handleChange}
                placeholder="Quantity"
                min="0"
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={medicine.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="add-medicine-button">
            Add Medicine
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddMedicine;