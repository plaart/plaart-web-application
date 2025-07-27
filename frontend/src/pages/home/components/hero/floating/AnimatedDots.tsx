import { motion } from 'framer-motion';

export const AnimatedDots = () => {
  const getColorClass = (index: number): string => {
    const colors = ['bg-blue-400', 'bg-purple-400', 'bg-pink-400'];
    return colors[index % 3];
  };

  return (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-3 h-3 rounded-full opacity-20 ${getColorClass(i)}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};
