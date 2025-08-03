import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import AuthPages from "./pages/auth";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import WorkspacePage from "./pages/workspace";
import Editor from "./pages/editor";

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
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Workspace - Para USER y MANAGER */}
      <Route
        path="/workspace"
        element={
          <ProtectedRoute>
            <WorkspacePage />
          </ProtectedRoute>
        }
      />
      {/* Workspace - Para USER y MANAGER */}
      <Route
        path="/editor/:id"
        element={
          <ProtectedRoute>
            <Editor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute requiredRole="MANAGER">
            <UsersPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
