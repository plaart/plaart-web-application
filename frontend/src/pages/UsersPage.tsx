import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiGroupLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiCheckLine,
  RiCloseLine,
  RiSearchLine,
  RiFilterLine,
} from "@remixicon/react";
import { useAuth } from "../hooks/useAuth";
import { apiService } from "../services/index";
import toast from "react-hot-toast";
import type { User } from "../types/user/User";
import type { ApiError } from "../types/api/ApiError";

const UsersPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Cargar usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      let userData: User[];

      // Usar el endpoint apropiado según el rol
      if (currentUser?.role === "ADMIN") {
        userData = await apiService.admin.getAllUsers();
      } else {
        userData = await apiService.manager.getAllUsers();
      }

      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
      const apiError = error as ApiError;
      toast.error(apiError.message || "Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUser]);

  const filteredUsers = users.filter((user: User) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800";
      case "MANAGER":
        return "bg-yellow-100 text-yellow-800";
      case "USER":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      await apiService.admin.updateUserRole(userId, newRole);
      toast.success("Rol actualizado correctamente");
      await fetchUsers(); // Recargar usuarios
      setShowRoleModal(false);
      setSelectedUser(null);
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message || "Error al actualizar el rol");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await apiService.admin.deleteUser(userId);
      toast.success("Usuario eliminado correctamente");
      await fetchUsers(); // Recargar usuarios
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message || "Error al eliminar el usuario");
    }
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      if (user.enabled) {
        await apiService.admin.disableUser(user.id);
        toast.success("Usuario deshabilitado");
      } else {
        await apiService.admin.enableUser(user.id);
        toast.success("Usuario habilitado");
      }
      await fetchUsers(); // Recargar usuarios
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message || "Error al cambiar el estado del usuario");
    }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <RiGroupLine className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestión de Usuarios
            </h1>
            <p className="text-gray-600">Administra usuarios y sus permisos</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <RiSearchLine className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10 w-full"
                />
              </div>

              {/* Role Filter */}
              <div className="flex items-center space-x-2">
                <RiFilterLine className="w-5 h-5 text-gray-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="input">
                  <option value="ALL">Todos los roles</option>
                  <option value="USER">Usuario</option>
                  <option value="MANAGER">Manager</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {users.length}
                </div>
                <div className="text-sm text-blue-700">Total Usuarios</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {users.filter((u: User) => u.role === "USER").length}
                </div>
                <div className="text-sm text-green-700">Usuarios</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {users.filter((u: User) => u.role === "MANAGER").length}
                </div>
                <div className="text-sm text-yellow-700">Managers</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {users.filter((u: User) => u.role === "ADMIN").length}
                </div>
                <div className="text-sm text-red-700">Admins</div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Último acceso
                    </th>
                    {currentUser?.role === "ADMIN" && (
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user: User) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {user.firstName[0]}
                              {user.lastName[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                            user.role
                          )}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.enabled
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                          {user.enabled ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLoginAt
                          ? new Date(user.lastLoginAt).toLocaleDateString(
                              "es-ES"
                            )
                          : "Nunca"}
                      </td>
                      {currentUser?.role === "ADMIN" && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            {/* Toggle Status */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleToggleUserStatus(user)}
                              className={`p-2 rounded-full ${
                                user.enabled
                                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                                  : "bg-green-100 text-green-600 hover:bg-green-200"
                              }`}
                              title={
                                user.enabled ? "Deshabilitar" : "Habilitar"
                              }>
                              {user.enabled ? (
                                <RiCloseLine className="w-4 h-4" />
                              ) : (
                                <RiCheckLine className="w-4 h-4" />
                              )}
                            </motion.button>

                            {/* Edit Role */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setSelectedUser(user);
                                setShowRoleModal(true);
                              }}
                              className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                              title="Cambiar rol">
                              <RiPencilLine className="w-4 h-4" />
                            </motion.button>

                            {/* Delete */}
                            {user.id !== currentUser?.id && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowDeleteModal(true);
                                }}
                                className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                                title="Eliminar usuario">
                                <RiDeleteBinLine className="w-4 h-4" />
                              </motion.button>
                            )}
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <RiGroupLine className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron usuarios</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Role Modal */}
        {showRoleModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cambiar rol de {selectedUser.firstName} {selectedUser.lastName}
              </h3>

              <div className="space-y-3 mb-6">
                {["USER", "MANAGER", "ADMIN"].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleUpdateRole(selectedUser.id, role)}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                      selectedUser.role === role
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{role}</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getRoleColor(
                          role
                        )}`}>
                        {role}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setSelectedUser(null);
                }}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
                Cancelar
              </button>
            </motion.div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <RiDeleteBinLine className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Eliminar usuario
                  </h3>
                  <p className="text-sm text-gray-600">
                    Esta acción no se puede deshacer
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                ¿Estás seguro de que quieres eliminar a{" "}
                <strong>
                  {selectedUser.firstName} {selectedUser.lastName}
                </strong>
                ?
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                  Sí, eliminar
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
