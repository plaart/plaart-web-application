/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../hooks/useAuth";
import type { RegisterRequest } from "../../../types/auth/RegisterRequest";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import useIntl from "../../../hooks/useIntl";

// Formulario de Registro
export const RegisterForm = () => {
  const { register: registerUser } = useAuth();
  const { t } = useIntl();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validar firstName
    if (!formData.firstName.trim()) {
      newErrors.firstName = t("auth.register.validation.firstName");
    }

    // Validar lastName
    if (!formData.lastName.trim()) {
      newErrors.lastName = t("auth.register.validation.lastName");
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = t("auth.register.validation.email.required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = t("auth.register.validation.email.invalid");
    }

    // Validar username
    if (!formData.username.trim()) {
      newErrors.username = t("auth.register.validation.username.required");
    } else if (formData.username.length < 3) {
      newErrors.username = t("auth.register.validation.username.minLength");
    } else if (formData.username.length > 20) {
      newErrors.username = t("auth.register.validation.username.maxLength");
    }

    // Validar password
    if (!formData.password) {
      newErrors.password = t("auth.register.validation.password.required");
    } else if (formData.password.length < 6) {
      newErrors.password = t("auth.register.validation.password.minLength");
    }

    // Validar confirmPassword
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t(
        "auth.register.validation.confirmPassword.required"
      );
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t(
        "auth.register.validation.confirmPassword.mismatch"
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Extraer confirmPassword ya que no es parte de RegisterRequest
      const { confirmPassword, ...registerData } = formData;
      await registerUser(registerData as RegisterRequest);
      // ✅ NO navegar aquí - AuthProvider maneja la redirección según el rol
    } catch (error) {
      console.error("Registration failed:", error);
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
            {t("auth.register.title")}
          </h1>
          <p className="text-gray-600">{t("auth.register.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1">
                {t("auth.register.fields.firstName.label")}
              </label>
              <motion.input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                placeholder={t("auth.register.fields.firstName.placeholder")}
                whileFocus={{ scale: 1.02 }}
                required
              />
              {errors.firstName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-600">
                  {errors.firstName}
                </motion.p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1">
                {t("auth.register.fields.lastName.label")}
              </label>
              <motion.input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                placeholder={t("auth.register.fields.lastName.placeholder")}
                whileFocus={{ scale: 1.02 }}
                required
              />
              {errors.lastName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-600">
                  {errors.lastName}
                </motion.p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1">
              {t("auth.register.fields.email.label")}
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              placeholder={t("auth.register.fields.email.placeholder")}
              whileFocus={{ scale: 1.02 }}
              required
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-600">
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1">
              {t("auth.register.fields.username.label")}
            </label>
            <motion.input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              placeholder={t("auth.register.fields.username.placeholder")}
              whileFocus={{ scale: 1.02 }}
              required
            />
            {errors.username && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-600">
                {errors.username}
              </motion.p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1">
              {t("auth.register.fields.password.label")}
            </label>
            <div className="relative">
              <motion.input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                placeholder={t("auth.register.fields.password.placeholder")}
                whileFocus={{ scale: 1.02 }}
                required
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
                {errors.password}
              </motion.p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1">
              {t("auth.register.fields.confirmPassword.label")}
            </label>
            <motion.input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              placeholder={t(
                "auth.register.fields.confirmPassword.placeholder"
              )}
              whileFocus={{ scale: 1.02 }}
              required
            />
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-600">
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>{t("auth.register.loading")}</span>
              </div>
            ) : (
              t("auth.register.submit")
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
