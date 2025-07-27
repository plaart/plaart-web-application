/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../hooks/useAuth";
import useIntl from "../../../hooks/useIntl";
import type { LoginRequest } from "../../../types/auth/LoginRequest";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";

export const LoginForm = () => {
  const { login } = useAuth();
  const { t } = useIntl();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Cambiado para usar los nombres correctos que espera LoginRequest
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Corregido: ahora NO navega manualmente - deja que AuthProvider maneje la redirección
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del form
    setIsLoading(true);

    try {
      // Solo hacer login - AuthProvider maneja la redirección según el rol
      await login(formData as LoginRequest);
      // ✅ NO navegar aquí - AuthProvider redirige automáticamente según el rol
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <motion.div
        className="w-full max-w-md pt-16" // Agregamos padding-top para el switcher
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}>
        <div className="mb-8">
          <h1 className="text-4xl font-light text-black mb-4">
            {t("auth.login.title", { default: "Welcome" })}
          </h1>
          <p className="text-gray-600">
            {t("auth.login.subtitle", {
              default: "We're happy to see you. Please sign in below.",
            })}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2">
              {t("auth.login.fields.username.label", { default: "Usuario:" })}
            </label>
            <motion.input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              placeholder={t("auth.login.fields.username.placeholder", {
                default: "Ingresa tu usuario",
              })}
              whileFocus={{ scale: 1.02 }}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2">
              {t("auth.login.fields.password.label", {
                default: "Contraseña:",
              })}
            </label>
            <div className="relative">
              <motion.input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                placeholder={t("auth.login.fields.password.placeholder", {
                  default: "Ingresa tu contraseña",
                })}
                whileFocus={{ scale: 1.02 }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showPassword ? (
                  <RiEyeLine className="h-5 w-5 text-gray-400" />
                ) : (
                  <RiEyeOffLine className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>
                  {t("auth.login.loading", { default: "Iniciando sesión..." })}
                </span>
              </div>
            ) : (
              t("auth.login.submit", { default: "Continue" })
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
