
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import AuthPages from "./pages/auth";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import Layout from "./pages/Layout";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import WorkspacePage from "./pages/workspace";

const AppRoutes = () => {
  console.log("AppRoutes renderizado");

  return (
    <Routes>
      {/* Ruta principal - Landing Page (pública) */}
      <Route path="/" element={<HomePage />} />

      {/* Rutas de autenticación (públicas) */}
      <Route path="/auth/login" element={<AuthPages />} />
      <Route path="/auth/register" element={<AuthPages />} />

      {/* Dashboard - Solo para ADMIN */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Workspace - Para USER y MANAGER */}
      <Route
        path="/workspace"
        element={
          <ProtectedRoute>
            <Layout>
              <WorkspacePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute requiredRole="MANAGER">
            <Layout>
              <UsersPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
