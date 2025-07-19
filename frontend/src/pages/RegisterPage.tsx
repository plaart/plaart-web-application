import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { useAuth } from "../hooks/useAuth";
import type { RegisterRequest } from "../types/auth/RegisterRequest";

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterRequest & { confirmPassword: string }>();

  const password = watch("password");

  const onSubmit = async (
    data: RegisterRequest & { confirmPassword: string }
  ) => {
    setIsLoading(true);
    try {
      const { ...registerData } = data;
      await registerUser(registerData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-600 background-pattern py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crear Cuenta
          </h1>
          <p className="text-gray-600">Únete a nuestra plataforma</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                {...register("firstName", {
                  required: "El nombre es requerido",
                })}
                type="text"
                className="input w-full"
                placeholder="Juan"
              />
              {errors.firstName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-600">
                  {errors.firstName.message}
                </motion.p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <input
                {...register("lastName", {
                  required: "El apellido es requerido",
                })}
                type="text"
                className="input w-full"
                placeholder="Pérez"
              />
              {errors.lastName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-600">
                  {errors.lastName.message}
                </motion.p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              type="email"
              className="input w-full"
              placeholder="tu@email.com"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de usuario
            </label>
            <input
              {...register("username", {
                required: "El nombre de usuario es requerido",
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
              placeholder="usuario123"
            />
            {errors.username && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-600">
                {errors.username.message}
              </motion.p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className="input w-full pr-10"
                placeholder="••••••••"
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
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <input
              {...register("confirmPassword", {
                required: "Confirma tu contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
              type={showPassword ? "text" : "password"}
              className="input w-full"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full h-12 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-6">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Creando cuenta...</span>
              </div>
            ) : (
              "Crear Cuenta"
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
