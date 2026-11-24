import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainHome from "./pages/MainHome";
import AuthPage from "./pages/AuthPage";
import { MetricsDashboard } from "./pages/MetricsDashboard";
import { PatientsManagement } from "./pages/PatientsManagement";
import { AppointmentSum } from "./pages/AppointmentSum";

// Helper component to guard staff routes
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuth = localStorage.getItem("isAuthenticated") === "true";
  return isAuth ? children : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainHome />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Clinical Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MetricsDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <PatientsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentSum />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;