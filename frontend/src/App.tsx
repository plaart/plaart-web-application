import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import { AuthProvider } from "./provider/auth/AuthProvider";
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import { ProtectedRoute } from './pages/ProtectedRoute';
import DashboardPage from './pages/Dashboard';
import Layout from './pages/Layout';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />

            <Route
              path="users"
              element={
                <ProtectedRoute requiredRole="MANAGER">
                  <UsersPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
