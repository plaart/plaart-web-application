import { motion } from 'framer-motion';

// Componente de Navbar reutilizable
export const AuthNavbar = ({ onTogglePage, currentPage }) => {
  return (
    <motion.nav
      className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-200/80 bg-white/80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container px-4 mx-auto relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl font-bold tracking-tight text-black">plaart</span>
          </motion.div>

          {/* Toggle Login/Register */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-sm">
              {currentPage === 'login' ? "Don't have an account?" : "Already have an account?"}
            </span>
            <motion.button
              onClick={onTogglePage}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              {currentPage === 'login' ? 'Create one' : 'Sign in'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
