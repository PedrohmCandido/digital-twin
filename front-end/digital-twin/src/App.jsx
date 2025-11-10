import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx'
import LandingPage from './pages/LandingPage/LandingPage.tsx'
import DeviceList from './pages/Devices/DeviceList.jsx'
import DeviceForm from './pages/Devices/DeviceForm.jsx'
import DeviceDetails from './pages/Devices/DeviceDetails.jsx'
import DashBoard from './pages/DashBoard/DashBoard.tsx'
import AiAssistant from './pages/AiAssistant/AiAssistant.jsx'

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App
