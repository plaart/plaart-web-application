import { motion } from "framer-motion";

export const HeroHeader = () => {
  return (
    <>
      {/* Main Heading */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-black mb-4">
          Draw with{" "}
          <motion.span
            className="italic font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}>
            AI
          </motion.span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}>
        Learn, experiment, and explore the endless possibilities of creative
        collaboration. Transform your artistic journey with intelligent drawing
        assistance that grows with you.
      </motion.p>
    </>
  );
};
