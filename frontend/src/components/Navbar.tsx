import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  RiSettings2Line,
  RiMenuFill,
  RiCloseLine,
  RiUserLine,
  RiGroupLine,
  RiHomeLine,
  RiLogoutBoxRLine,
} from "@remixicon/react";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: RiHomeLine,
      roles: ["USER", "MANAGER", "ADMIN"],
    },
    {
      name: "Perfil",
      href: "/profile",
      icon: RiUserLine,
      roles: ["USER", "MANAGER", "ADMIN"],
    },
    {
      name: "Usuarios",
      href: "/users",
      icon: RiGroupLine,
      roles: ["MANAGER", "ADMIN"],
    },
    {
      name: "Configuración",
      href: "/settings",
      icon: RiMenuFill,
      roles: ["ADMIN"],
    },
  ];

  const filteredNavigation = navigation.filter(
    (item) => user && item.roles.includes(user.role)
  );

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

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold text-gray-900">AuthApp</span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}>
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                    user?.role || ""
                  )}`}>
                  {user?.role}
                </span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              <RiLogoutBoxRLine className="w-4 h-4" />
              <span>Salir</span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              {isOpen ? (
                <RiCloseLine className="block h-6 w-6" />
              ) : (
                <RiSettings2Line className="block h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
              {/* User Info */}
              <div className="flex items-center space-x-3 px-3 py-3 border-b border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRoleColor(
                      user?.role || ""
                    )}`}>
                    {user?.role}
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              {filteredNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:text-blue-600 hover:bg-white"
                    }`}>
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-red-700 hover:text-red-900 hover:bg-red-50 w-full">
                <RiLogoutBoxRLine className="w-5 h-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
