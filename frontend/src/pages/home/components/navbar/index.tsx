import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "../../../../components/LanguageSwitcher";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth/login");
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold text-gray-900 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              plaart
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Enlaces del menú */}
            <div className="flex items-center space-x-6">
              {[
                { name: "Products", href: "#products" },
                { name: "Solutions", href: "#solutions" },
                { name: "Resources", href: "#resources" },
                { name: "Pricing", href: "#pricing" },
                { name: "Contact", href: "#contact" }
              ].map((item) => {
                const hasDropdown = ["Products", "Solutions", "Resources"].includes(item.name);
                
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium group"
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                    {hasDropdown && (
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Selector de idioma - Desktop */}
            <LanguageSwitcher variant="light" size="sm" />

            {/* Botón Login - Desktop */}
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
            >
              Iniciar Sesión
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Selector de idioma - Mobile (siempre visible) */}
            <div className="scale-90">
              <LanguageSwitcher variant="light" size="sm" />
            </div>
            
            {/* Hamburger button */}
            <motion.button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Abrir menú"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm"
              initial={{ 
                opacity: 0, 
                height: 0,
                y: -10
              }}
              animate={{ 
                opacity: 1, 
                height: "auto",
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                y: -10
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <div className="py-4 space-y-1">
                {/* Navigation Links */}
                {[
                  { name: "Products", href: "#products" },
                  { name: "Solutions", href: "#solutions" },
                  { name: "Resources", href: "#resources" },
                  { name: "Pricing", href: "#pricing" },
                  { name: "Contact", href: "#contact" }
                ].map((item, index) => {
                  const hasDropdown = ["Products", "Solutions", "Resources"].includes(item.name);
                  
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg mx-2 transition-all duration-200"
                      initial={{ 
                        opacity: 0, 
                        x: -20 
                      }}
                      animate={{ 
                        opacity: 1, 
                        x: 0 
                      }}
                      transition={{ 
                        delay: index * 0.05,
                        duration: 0.2
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="font-medium">{item.name}</span>
                      {hasDropdown && (
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </motion.a>
                  );
                })}
                
                {/* Divider */}
                <hr className="my-4 mx-2 border-gray-200" />
                
                {/* Login Button */}
                <motion.div
                  className="px-2 pt-2"
                  initial={{ 
                    opacity: 0, 
                    y: 20 
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0 
                  }}
                  transition={{ 
                    delay: 0.2,
                    duration: 0.3
                  }}
                >
                  <motion.button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md"
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogin}
                  >
                    Iniciar Sesión
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};