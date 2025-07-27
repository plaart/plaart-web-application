import { motion } from "framer-motion";

export const LearningIndicators = () => {
  const indicators = ["Learning...", "Adapting...", "Improving..."];

  return (
    <>
      {indicators.map((text, i) => (
        <motion.div
          key={`learn-${i}`}
          className="absolute text-xs text-gray-400 font-medium"
          style={{
            left: `${20 + i * 30}%`,
            top: `${60 + i * 10}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -20, -40],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeOut",
          }}>
          {text}
        </motion.div>
      ))}
    </>
  );
};
