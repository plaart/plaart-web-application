import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useLogger } from "../hooks/useLogger";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "USER" | "MANAGER" | "ADMIN";
}

const roleHierarchy: Record<string, number> = {
  USER: 1,
  MANAGER: 2,
  ADMIN: 3,
};

const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg p-8 shadow-2xl">
      <div className="flex items-center space-x-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <span className="text-gray-700 font-medium">
          Verificando autenticación...
        </span>
      </div>
    </motion.div>
  </div>
);

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const logger = useLogger();

  // Log inicial con información de la ruta y estado de autenticación
  logger.debug("ProtectedRoute accessed", {
    pathname: location.pathname,
    userRole: user?.role || "none",
    requiredRole: requiredRole || "none",
    loading: loading.toString(),
    isAuthenticated: isAuthenticated.toString(),
    component: "ProtectedRoute",
  });

  if (loading) {
    logger.info("Authentication verification in progress", {
      pathname: location.pathname,
      component: "ProtectedRoute",
    });
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    logger.warn("Access denied - user not authenticated", {
      pathname: location.pathname,
      redirectTo: "/",
      component: "ProtectedRoute",
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requiredRole && user) {
    const userRoleLevel = roleHierarchy[user.role];
    const requiredRoleLevel = roleHierarchy[requiredRole];

    logger.debug("Role verification process", {
      userRole: user.role,
      userRoleLevel: userRoleLevel.toString(),
      requiredRole,
      requiredRoleLevel: requiredRoleLevel.toString(),
      pathname: location.pathname,
      component: "ProtectedRoute",
    });

    if (userRoleLevel < requiredRoleLevel) {
      logger.error("Access denied - insufficient role level", {
        userRole: user.role,
        userRoleLevel: userRoleLevel.toString(),
        requiredRole,
        requiredRoleLevel: requiredRoleLevel.toString(),
        pathname: location.pathname,
        userId: user.id?.toString() || "unknown",
        component: "ProtectedRoute",
      });

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-8 shadow-2xl text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Acceso Denegado
            </h2>
            <p className="text-gray-600 mb-4">
              No tienes permisos suficientes para acceder a esta página.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Se requiere rol:{" "}
              <span className="font-semibold">{requiredRole}</span>
              <br />
              Tu rol actual: <span className="font-semibold">{user.role}</span>
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  logger.info("User clicked go back button", {
                    userRole: user.role,
                    pathname: location.pathname,
                    component: "ProtectedRoute",
                  });
                  window.history.back();
                }}
                className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg">
                Volver
              </button>
              <button
                onClick={() => {
                  const targetPath =
                    user.role === "ADMIN" ? "/dashboard" : "/workspace";
                  logger.info("User redirected to their area", {
                    userRole: user.role,
                    targetPath,
                    currentPath: location.pathname,
                    component: "ProtectedRoute",
                  });
                  window.location.href = targetPath;
                }}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                Ir a mi área
              </button>
            </div>
          </motion.div>
        </div>
      );
    }
  }

  logger.info("Access granted - rendering protected content", {
    userRole: user?.role || "unknown",
    requiredRole: requiredRole || "none",
    pathname: location.pathname,
    userId: user?.id?.toString() || "unknown",
    component: "ProtectedRoute",
  });

  return <>{children}</>;
};
