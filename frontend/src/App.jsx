import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./components/home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        

        <Route
          path="/dashboard"
          element={<h1>Dashboard Coming Soon</h1>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;