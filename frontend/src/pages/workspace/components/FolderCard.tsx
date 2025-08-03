import { motion } from "framer-motion";
import { RiFolder5Line, RiExpandVerticalLine } from "@remixicon/react";
import type { Folder } from "../../../types/types";

type Props = {
  folder: Folder;
};

export const FolderCard = ({ folder }: Props) => (
  <motion.div
    key={folder.id}
    whileHover={{ scale: 1.02 }}
    className="bg-gray-800 rounded-lg p-4 cursor-pointer group relative">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <RiFolder5Line size={24} className="text-gray-400" />
        <div>
          <h3 className="font-medium text-white">{folder.name}</h3>
          <p className="text-sm text-gray-400">{folder.fileCount} files</p>
        </div>
      </div>
      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
        <RiExpandVerticalLine size={16} className="text-gray-400" />
      </button>
    </div>
  </motion.div>
);
