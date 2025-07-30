import { RiFileTextLine, RiMoreLine } from "@remixicon/react";
import { motion } from "framer-motion";
// File card component
export const FileCard = ({ file }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    whileHover={{ y: -2 }}
    className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex items-start justify-between mb-3">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-medium text-gray-600">
        {file.thumbnail}
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <RiMoreLine size={16} />
      </button>
    </div>
    <h3 className="font-medium text-gray-900 mb-1">{file.name}</h3>
    <div className="flex items-center space-x-2 text-xs text-gray-500">
      <RiFileTextLine size={12} />
      <span>Edited {file.edited}</span>
    </div>
    <p className="text-xs text-gray-400 mt-1">by {file.createdBy}</p>
  </motion.div>
);
