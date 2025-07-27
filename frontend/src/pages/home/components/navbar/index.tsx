import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold text-black"
            whileHover={{ scale: 1.05 }}
          >
            plaart
          </motion.div>

          {/* Desktop Menu - FORZAR VISUALIZACIÓN */}
          <div className="flex items-center space-x-8" style={{ display: 'flex' }}>
            {/* Enlaces del menú */}
            <div className="hidden lg:flex items-center space-x-6">
              {["Products", "Solutions", "Resources", "Pricing", "Contact"].map(
                (item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="text-gray-600 hover:text-black transition-colors duration-200 flex items-center text-sm font-medium"
                    whileHover={{ y: -2 }}
                  >
                    {item}
                    {["Products", "Solutions", "Resources"].includes(item) && (
                      <svg
                        className="w-4 h-4 ml-1"
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
                )
              )}
            </div>

            {/* Botón Login - Visible en desktop */}
            <motion.button
              className="hidden lg:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

            {/* Mobile Menu Button - Solo visible en móvil */}
            <motion.button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6"
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
              <div className="py-4 space-y-2">
                {["Products", "Solutions", "Resources", "Pricing", "Contact"].map(
                  (item, index) => (
                    <motion.a
                      key={item}
                      href="#"
                      className="block px-4 py-3 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg mx-2 transition-colors duration-200"
                      initial={{ 
                        opacity: 0, 
                        x: -20 
                      }}
                      animate={{ 
                        opacity: 1, 
                        x: 0 
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: -20 
                      }}
                      transition={{ 
                        delay: index * 0.05,
                        duration: 0.2
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        {item}
                        {["Products", "Solutions", "Resources"].includes(item) && (
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
                      </div>
                    </motion.a>
                  )
                )}
                
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
                  exit={{ 
                    opacity: 0, 
                    y: 20 
                  }}
                  transition={{ 
                    delay: 0.2,
                    duration: 0.3
                  }}
                >
                  <motion.button 
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
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
