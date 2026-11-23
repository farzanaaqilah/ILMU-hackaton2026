import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainHome from "./pages/MainHome";
import AuthPage from "./pages/AuthPage";
import { MetricsDashboard } from "./pages/MetricsDashboard";
import { PatientManagement } from "./pages/PatientsManagement";
import { AppointmentSum } from "./pages/AppointmentSum";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<MetricsDashboard />} />
        <Route path="/patients" element={<PatientManagement />} />
        <Route path="/appointments" element={<AppointmentSum />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
