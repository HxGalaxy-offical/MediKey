import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./components/home";
import Dashboard from "./components/Dashboard";
import SearchHistory from "./components/SearchHistory";


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Home Page - Member 1 */}
        <Route path="/home" element={<Home />} />

        {/* Dashboard - Member 3 */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Search History - Member 3 */}
        <Route path="/history" element={<SearchHistory />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;