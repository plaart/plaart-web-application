import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const HeroButtons = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth/login");
  };
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}>
      <motion.button
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGetStarted}>
        Get started
      </motion.button>
      <motion.button
        className="text-gray-600 px-8 py-3 text-lg font-medium hover:text-black transition-colors duration-200 border border-gray-300 rounded-lg hover:border-gray-400"
        whileHover={{ scale: 1.05 }}>
        Watch Docs
      </motion.button>
    </motion.div>
  );
};
