import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/LoginPage";
import Register from "./pages/Register";
import Admin from "./pages/AdminDashboard";
import OwnerList from "./pages/OwnerList";
import CarList from "./pages/CarList";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/ownerList" element={<OwnerList />} />
          <Route path="/carList" element={<CarList />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
