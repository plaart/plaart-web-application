import { RiFolderLine, RiMoreLine } from '@remixicon/react';
import { motion } from 'framer-motion';
// Folder card component
const FolderCard = ({ folder }) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    whileHover={{ y: -2 }}
    className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
        <RiFolderLine size={20} className="text-blue-500" />
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <RiMoreLine size={16} />
      </button>
    </div>
    <h3 className="font-medium text-gray-900 mb-1">{folder.name}</h3>
    <p className="text-xs text-gray-400">{folder.fileCount} files</p>
  </motion.div>
);
