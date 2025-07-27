import { motion } from 'framer-motion';

export const AnimatedPath = () => {
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 300 200"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
    >
      <motion.path
        d="M50,100 Q150,50 250,100 T400,100"
        stroke="#3B82F6"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />
    </motion.svg>
  );
};
