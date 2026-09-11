import React, { useState } from "react";

function BulkUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setMessage("Please select a CSV file.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage("");
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a CSV file first.");
      return;
    }

    console.log("CSV file selected:", file);

    setMessage(
      `${file.name} is ready for upload.`
    );
  };

  return (
    <div className="admin-page">

      <div className="admin-header">
        <h1>Bulk Upload</h1>
        <p>
          Upload multiple medicine records using a CSV file.
        </p>
      </div>

      <div className="bulk-upload-card">

        <div className="upload-icon">
          📁
        </div>

        <h2>Upload Medicine CSV</h2>

        <p>
          Select a CSV file containing medicine records.
        </p>

        <form onSubmit={handleUpload}>

          <div className="file-input-container">
            <label htmlFor="csvFile">
              Choose CSV File
            </label>

            <input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>

          {file && (
            <p className="selected-file">
              Selected: <strong>{file.name}</strong>
            </p>
          )}

          {message && (
            <p className="upload-message">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="upload-button"
          >
            Upload CSV
          </button>

        </form>

      </div>

    </div>
  );
}

export default BulkUpload;