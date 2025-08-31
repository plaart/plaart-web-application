import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useIntl from "../../../../hooks/useIntl";

export const HeroButtons = () => {
  const navigate = useNavigate();
  const { t } = useIntl();

  const handleGetStarted = () => {
    navigate("/auth/login");
  };

  const handleWatchDocs = () => {
    // Aquí puedes agregar la lógica para abrir documentación
    window.open('/docs', '_blank');
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {/* Botón principal - Get Started */}
      <motion.button
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGetStarted}
      >
        {t("home.hero.buttons.btnStart")}
      </motion.button>

      {/* Botón secundario - Watch Docs - CORREGIDO */}
      <motion.button
        className="relative group bg-white text-gray-700 px-8 py-3 text-lg font-medium border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleWatchDocs}
      >
        <span className="flex items-center gap-2">
          {/* Icono de play para "Watch Docs" */}
          <svg 
            className="w-5 h-5 transition-transform group-hover:scale-110" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
              clipRule="evenodd" 
            />
          </svg>
          {t("home.hero.buttons.btnDocs")}
        </span>
        
        {/* Efecto de brillo al hacer hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          layoutId="button-glow"
        />
      </motion.button>
    </motion.div>
  );
};
