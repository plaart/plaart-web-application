import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { apiService } from "../services/api";
import { getRoleBadgeColor, getRoleColor } from "../utils/userUtils";

interface TestResult {
  message: string;
  status: string;
  role?: string;
  allowedRoles?: string;
}

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [testResults, setTestResults] = useState<{
    public?: TestResult;
    user?: TestResult;
    manager?: TestResult;
    admin?: TestResult;
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runTests = async () => {
      const results: Partial<{
        public: TestResult;
        user: TestResult;
        manager: TestResult;
        admin: TestResult;
      }> = {};

      try {
        // Test público (siempre disponible)
        results.public = await apiService.test.testPublic();
      } catch (error) {
        console.error("Public test failed:", error);
      }

      if (user) {
        try {
          // Test solo para admins
          if (user.role === "ADMIN") {
            results.admin = await apiService.test.testAdmin();
          }
        } catch (error) {
          console.error("Admin test failed:", error);
        }
      }

      setTestResults(results);
      setLoading(false);
    };

    runTests();
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8">
          {/* Header con botón de logout */}
          <motion.div variants={itemVariants} className="text-center relative">
            {/* Botón de logout en la esquina superior derecha */}
            <div className="absolute top-0 right-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium">Cerrar Sesión</span>
              </motion.button>
            </div>

            <div
              className={`w-32 h-32 bg-gradient-to-r ${getRoleColor(
                user?.role || ""
              )} rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl`}>
              <span className="text-4xl font-bold text-white">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              ¡Bienvenido, {user?.firstName}!
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {user?.firstName} {user?.lastName}
            </p>
            <div className="flex items-center justify-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(
                  user?.role || ""
                )}`}>
                {user?.role}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{user?.email}</span>
            </div>
          </motion.div>

          {/* User Info Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Información del Usuario
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Email verificado
                </p>
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    user?.emailVerifield
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {user?.emailVerifield ? "Verificado" : "Pendiente"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Último acceso
                </p>
                <p className="text-lg text-gray-900">
                  {user?.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Nunca"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* API Tests */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pruebas de API REST
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Public Test */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Endpoint Público
                </h3>
                {testResults.public ? (
                  <div className="space-y-1">
                    <p className="text-sm text-blue-700">
                      {testResults.public.message}
                    </p>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {testResults.public.status}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-red-500">Sin acceso</p>
                )}
              </div>

              {/* User Test */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">
                  Endpoint Usuario
                </h3>
                {testResults.user ? (
                  <div className="space-y-1">
                    <p className="text-sm text-green-700">
                      {testResults.user.message}
                    </p>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {testResults.user.status} - {testResults.user.role}
                    </span>
                  </div>
                ) : user && ["USER", "MANAGER", "ADMIN"].includes(user.role) ? (
                  <p className="text-sm text-gray-500">Error de acceso</p>
                ) : (
                  <p className="text-sm text-red-500">Sin acceso</p>
                )}
              </div>

              {/* Manager Test */}
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">
                  Endpoint Manager
                </h3>
                {testResults.manager ? (
                  <div className="space-y-1">
                    <p className="text-sm text-yellow-700">
                      {testResults.manager.message}
                    </p>
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                      {testResults.manager.status} - {testResults.manager.role}
                    </span>
                  </div>
                ) : user && ["MANAGER", "ADMIN"].includes(user.role) ? (
                  <p className="text-sm text-gray-500">Error de acceso</p>
                ) : (
                  <p className="text-sm text-red-500">Sin acceso</p>
                )}
              </div>

              {/* Admin Test */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-semibold text-red-900 mb-2">
                  Endpoint Admin
                </h3>
                {testResults.admin ? (
                  <div className="space-y-1">
                    <p className="text-sm text-red-700">
                      {testResults.admin.message}
                    </p>
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                      {testResults.admin.status} - {testResults.admin.role}
                    </span>
                  </div>
                ) : user && user.role === "ADMIN" ? (
                  <p className="text-sm text-gray-500">Error de acceso</p>
                ) : (
                  <p className="text-sm text-red-500">Sin acceso</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/profile")}
                className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-medium">Editar Perfil</span>
                </div>
              </motion.button>

              {(user?.role === "MANAGER" || user?.role === "ADMIN") && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (window.location.href = "/users")}
                  className="p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-6a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                    <span className="font-medium">Gestionar Usuarios</span>
                  </div>
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/api-tester")}
                className="p-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-medium">Probar API</span>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Estadísticas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
                <div className="text-sm text-blue-700">Cuenta Activa</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {user?.lastLoginAt ? "✓" : "✗"}
                </div>
                <div className="text-sm text-green-700">Último Acceso</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {user?.role}
                </div>
                <div className="text-sm text-yellow-700">Rol Actual</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {user?.emailVerifield ? "✓" : "!"}
                </div>
                <div className="text-sm text-purple-700">Email Verificado</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
