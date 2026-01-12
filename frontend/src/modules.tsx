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
      <Route path="/auth" element={<AuthPages />} />
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

      {/* Workspace - Para usuarios autenticados */}
      <Route
        path="/workspace"
        element={
          <ProtectedRoute>
            <WorkspacePage />
          </ProtectedRoute>
        }
      />

      {/* Editor - Para usuarios autenticados con ID de proyecto */}
      <Route
        path="/editor/:projectId"
        element={
          <ProtectedRoute>
            <Editor />
          </ProtectedRoute>
        }
      />

      {/* Editor sin ID - Redirigir al workspace */}
      <Route
        path="/editor"
        element={<Navigate to="/workspace" replace />}
      />

      {/* Perfil - Para usuarios autenticados */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Usuarios - Solo para MANAGER y ADMIN */}
      <Route
        path="/users"
        element={
          <ProtectedRoute requiredRole="MANAGER">
            <UsersPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - Redirigir a home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
