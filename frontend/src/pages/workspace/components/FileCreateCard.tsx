import { motion } from "framer-motion";
import { RiAddLine } from "@remixicon/react";

export const FileCreateCard = () => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="aspect-video bg-gray-600 rounded-lg flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-400">
    <div className="text-center">
      <RiAddLine size={24} className="text-gray-300 mx-auto mb-2" />
      <p className="text-sm text-gray-300">Create new file</p>
    </div>
  </motion.div>
);
