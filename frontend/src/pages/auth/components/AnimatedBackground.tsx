import { motion } from 'framer-motion';
// Componente de fondo animado inspirado en el Hero
export const AnimatedBackground = ({ type = 'login' }) => {
  const isLogin = type === 'login';
  
  return (
    <div className="min-h-screen relative w-full bg-black overflow-hidden">
      {/* Elementos flotantes de fondo */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full opacity-10 ${
              i % 4 === 0 ? 'bg-blue-400' : 
              i % 4 === 1 ? 'bg-purple-400' : 
              i % 4 === 2 ? 'bg-pink-400' : 'bg-cyan-400'
            }`}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Objeto principal */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isLogin ? (
          // Diseño tipo coche futurista para Login
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.svg
              width="400"
              height="200"
              viewBox="0 0 400 200"
              className="drop-shadow-2xl"
              animate={{ rotateY: [0, 5, 0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Cuerpo del coche */}
              <motion.ellipse
                cx="200"
                cy="120"
                rx="180"
                ry="60"
                fill="url(#carGradient)"
                animate={{ scaleX: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Luces delanteras */}
              <motion.circle
                cx="320"
                cy="110"
                r="8"
                fill="#00ffff"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.circle
                cx="320"
                cy="130"
                r="8"
                fill="#00ffff"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />

              {/* Gradientes */}
              <defs>
                <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </motion.svg>
            
            {/* Líneas de velocidad */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-gradient-to-r from-blue-400 to-transparent h-0.5"
                style={{
                  left: -100 - i * 20,
                  top: 100 + i * 10,
                  width: 80,
                }}
                animate={{
                  x: [0, 500],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        ) : (
          // Diseño tipo zapatilla para Registro
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.svg
              width="350"
              height="200"
              viewBox="0 0 350 200"
              className="drop-shadow-2xl"
              animate={{ rotateX: [0, 10, 0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Suela de la zapatilla */}
              <motion.ellipse
                cx="175"
                cy="150"
                rx="160"
                ry="30"
                fill="url(#shoeGradient)"
                animate={{ scaleX: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Cuerpo de la zapatilla */}
              <motion.path
                d="M50 120 Q100 80 200 90 Q280 95 300 120 Q290 140 200 135 Q100 130 50 120 Z"
                fill="url(#shoeBodyGradient)"
                animate={{ 
                  d: [
                    "M50 120 Q100 80 200 90 Q280 95 300 120 Q290 140 200 135 Q100 130 50 120 Z",
                    "M50 120 Q100 75 200 85 Q285 90 300 120 Q290 145 200 140 Q100 135 50 120 Z",
                    "M50 120 Q100 80 200 90 Q280 95 300 120 Q290 140 200 135 Q100 130 50 120 Z"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Logo tipo Nike */}
              <motion.path
                d="M120 110 Q140 120 160 115 Q180 110 200 105"
                stroke="#ff0040"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />

              {/* Gradientes */}
              <defs>
                <linearGradient id="shoeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1F2937" />
                  <stop offset="100%" stopColor="#4B5563" />
                </linearGradient>
                <linearGradient id="shoeBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Partículas de movimiento */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: Math.random() * 350,
                  top: Math.random() * 200,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Información del diseñador */}
      <motion.div
        className="absolute bottom-8 left-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <h3 className="font-semibold text-lg">
          {'Sixtus Nosike'}
        </h3>
        <p className="text-sm text-gray-300">
          {'CEO Chief Executive Officer'}
        </p>
      </motion.div>

      {/* Botón Follow */}
      <motion.button
        className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors duration-200 flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <span>Follow</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
};
