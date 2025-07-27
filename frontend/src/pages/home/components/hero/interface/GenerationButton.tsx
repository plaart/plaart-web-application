import { motion } from "framer-motion";

export const GenerationButton = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg text-center cursor-pointer relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <span className="relative z-10 text-lg font-medium">
        Listening to your most artistic side...
      </span>

      {/* AI Brain Icon */}
      <motion.div
        className="absolute right-8 top-1/2 transform -translate-y-1/2"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}>
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
        </svg>
      </motion.div>
    </motion.div>
  );
};
