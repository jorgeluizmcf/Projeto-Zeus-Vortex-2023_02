// Router.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importe BrowserRouter como Router e Routes
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import ProtectedRoute from "./components/ProtectedRoute/index";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute element={HomePage} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
