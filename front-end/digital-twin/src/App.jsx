import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import DashBoard from "./pages/DashBoard/DashBoard.jsx";
import AiAssistant from "./pages/AiAssistant/AiAssistant.jsx";
import DeviceList from "./pages/Devices/DeviceList.jsx";
import DeviceForm from "./pages/Devices/DeviceForm.jsx";
import DeviceDetails from "./pages/Devices/DeviceDetails.jsx";
import TechSheet from "./pages/TechSheet/TechSheet.jsx";

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
        {/* Raiz redireciona conforme sessão */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/login" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Públicas (redireciona se já logado) */}
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <LoginPage />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfAuth>
              <RegisterPage />
            </RedirectIfAuth>
          }
        />

        {/* Protegidas */}
        <Route
          path="/landing-page"
          element={
            <RequireAuth>
              <LandingPage />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashBoard />
            </RequireAuth>
          }
        />
        <Route
          path="/ai-assistant"
          element={
            <RequireAuth>
              <AiAssistant />
            </RequireAuth>
          }
        />

        <Route
          path="/devices"
          element={
            <RequireAuth>
              <DeviceList />
            </RequireAuth>
          }
        />
        <Route
          path="/devices/new"
          element={
            <RequireAuth>
              <DeviceForm />
            </RequireAuth>
          }
        />
        <Route
          path="/devices/:id"
          element={
            <RequireAuth>
              <DeviceDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/devices/:id/edit"
          element={
            <RequireAuth>
              <DeviceForm />
            </RequireAuth>
          }
        />

        <Route
          path="/tech-sheet"
          element={
            <RequireAuth>
              <TechSheet />
            </RequireAuth>
          }
        />

        {/* 404 -> login (ou dashboard se preferir) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
