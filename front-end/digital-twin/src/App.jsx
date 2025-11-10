// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import DashBoard from "./pages/DashBoard/DashBoard.tsx";
import AiAssistant from "./pages/AiAssistant/AiAssistant.jsx";

function safeGetUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function RequireAuth({ children }) {
  const user = safeGetUser();
  return user ? children : <Navigate to="/login" replace />;
}

function RedirectIfAuth({ children }) {
  const user = safeGetUser();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  const user = safeGetUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
  <Route path="/devices" element={<DeviceList />} />
  <Route path="/devices/new" element={<DeviceForm />} />
  <Route path="/devices/:id" element={<DeviceDetails />} />
  <Route path="/devices/:id/edit" element={<DeviceForm />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/ai-assistant" element={<AiAssistant />} />
      </Routes>
    </BrowserRouter>
  );
}
