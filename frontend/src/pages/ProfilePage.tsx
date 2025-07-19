import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  RiPencilLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiEyeOffLine,
} from "@remixicon/react";

import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { apiService } from "../services/index";
import type { UpdateUserRequest } from "../types/auth/UpdateUserRequest";
import type { ApiError } from "../types/api/ApiError";

const ProfilePage: React.FC = () => {
  const { user, logout, refetchUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserRequest>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      avatar: user?.avatar || "",
    },
  });

  const onSubmit = async (data: UpdateUserRequest) => {
    setUpdateLoading(true);
    try {
      // Filtrar campos vacíos
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([, value]) => value !== "" && value !== undefined
        )
      ) as UpdateUserRequest;

      await apiService.user.updateProfile(filteredData);
      await refetchUser(); // Refrescar datos del usuario

      toast.success("Perfil actualizado correctamente");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      const apiError = error as ApiError;
      toast.error(apiError.message || "Error al actualizar el perfil");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    setDeleteLoading(true);
    try {
      await apiService.user.deleteProfile();
      toast.success("Cuenta eliminada correctamente");
      logout();
    } catch (error) {
      console.error("Error deleting profile:", error);
      const apiError = error as ApiError;
      toast.error(apiError.message || "Error al eliminar la cuenta");
    } finally {
      setDeleteLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "from-red-500 to-pink-600";
      case "MANAGER":
        return "from-yellow-500 to-orange-600";
      case "USER":
        return "from-green-500 to-blue-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getRoleBadgeColor = (role: string) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className={`w-32 h-32 bg-gradient-to-r ${getRoleColor(
                user?.role || ""
              )} rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl`}>
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              )}
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
            <p className="text-gray-600">Gestiona tu información personal</p>
          </div>

          {/* Profile Information */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Información Personal
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsEditing(!isEditing);
                  if (!isEditing) {
                    reset({
                      firstName: user?.firstName || "",
                      lastName: user?.lastName || "",
                      username: user?.username || "",
                      avatar: user?.avatar || "",
                    });
                  }
                }}
                className="btn btn-primary flex items-center space-x-2">
                <RiPencilLine className="w-4 h-4" />
                <span>{isEditing ? "Cancelar" : "Editar"}</span>
              </motion.button>
            </div>

            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                      </label>
                      <input
                        {...register("firstName")}
                        type="text"
                        className="input w-full"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido
                      </label>
                      <input
                        {...register("lastName")}
                        type="text"
                        className="input w-full"
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de usuario
                    </label>
                    <input
                      {...register("username", {
                        minLength: {
                          value: 3,
                          message: "Debe tener al menos 3 caracteres",
                        },
                        maxLength: {
                          value: 20,
                          message: "No puede tener más de 20 caracteres",
                        },
                      })}
                      type="text"
                      className="input w-full"
                      placeholder="Tu nombre de usuario"
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Avatar (URL)
                    </label>
                    <input
                      {...register("avatar")}
                      type="url"
                      className="input w-full"
                      placeholder="https://ejemplo.com/tu-avatar.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nueva contraseña (opcional)
                    </label>
                    <div className="relative">
                      <input
                        {...register("password", {
                          minLength: {
                            value: 6,
                            message: "Debe tener al menos 6 caracteres",
                          },
                        })}
                        type={showPassword ? "text" : "password"}
                        className="input w-full pr-10"
                        placeholder="Dejar en blanco para mantener actual"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {showPassword ? (
                          <RiEyeOffLine className="h-5 w-5 text-gray-400" />
                        ) : (
                          <RiEyeLine className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={updateLoading}
                      className="btn btn-primary disabled:opacity-50">
                      {updateLoading ? "Guardando..." : "Guardar Cambios"}
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn btn-secondary">
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Nombre
                      </label>
                      <p className="text-lg text-gray-900">{user?.firstName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Apellido
                      </label>
                      <p className="text-lg text-gray-900">{user?.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Email
                      </label>
                      <p className="text-lg text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Nombre de usuario
                      </label>
                      <p className="text-lg text-gray-900">{user?.username}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Rol
                      </label>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(
                          user?.role || ""
                        )}`}>
                        {user?.role}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Estado
                      </label>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          user?.enabled
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {user?.enabled ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Información de la Cuenta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Fecha de registro
                </label>
                <p className="text-lg text-gray-900">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "No disponible"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Última actualización
                </label>
                <p className="text-lg text-gray-900">
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "No disponible"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Último acceso
                </label>
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
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email verificado
                </label>
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    user?.emailVerifield
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {user?.emailVerifield ? "Verificado" : "Pendiente"}
                </span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl shadow-lg border border-red-200">
            <div className="px-6 py-4 bg-red-50 border-b border-red-200">
              <h2 className="text-xl font-semibold text-red-900">
                Zona de Peligro
              </h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Eliminar cuenta
                  </h3>
                  <p className="text-sm text-gray-600">
                    Esta acción no se puede deshacer. Se eliminarán
                    permanentemente todos los datos.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                  <RiDeleteBinLine className="w-4 h-4" />
                  <span>Eliminar Cuenta</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
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
                    Confirmar eliminación
                  </h3>
                  <p className="text-sm text-gray-600">
                    Esta acción no se puede deshacer
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                ¿Estás seguro de que quieres eliminar tu cuenta? Se perderán
                todos tus datos permanentemente.
              </p>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeleteProfile}
                  disabled={deleteLoading}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors">
                  {deleteLoading ? "Eliminando..." : "Sí, eliminar"}
                </motion.button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
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

export default ProfilePage;
