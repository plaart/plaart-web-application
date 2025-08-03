import { motion } from "framer-motion";
import { InterfaceHeader } from "./interface/InterfaceHeader";
import { DrawingCanvas } from "./interface/DrawingCanvas";
import { GenerationButton } from "./interface/GenerationButton";

export const DemoInterface = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.8 }}>
      <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
        <InterfaceHeader />
        <DrawingCanvas />
        <GenerationButton />
      </div>
    </motion.div>
  );
};
