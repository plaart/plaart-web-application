import { motion } from "framer-motion";
import { mockFiles, mockFolders } from "../../../mocks/mock_workspace_data";
import {
  RiAddLine,
  RiExpandVerticalLine,
  RiFolder5Line,
} from "@remixicon/react";
import { FileCard } from "../components/FileCard";

const Files = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My files</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            New folder
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            New file
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Folders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockFolders.map((folder) => (
            <motion.div
              key={folder.id}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-lg p-4 cursor-pointer group relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <RiFolder5Line size={24} className="text-gray-400" />
                  <div>
                    <h3 className="font-medium text-white">{folder.name}</h3>
                    <p className="text-sm text-gray-400">
                      {folder.fileCount} files
                    </p>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <RiExpandVerticalLine size={16} className="text-gray-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Files</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="aspect-video bg-gray-600 rounded-lg flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-400">
            <div className="text-center">
              <RiAddLine size={24} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Create new file</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Files;
