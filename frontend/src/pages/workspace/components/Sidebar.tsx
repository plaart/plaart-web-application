import { motion } from "framer-motion";
import {
  RiHomeLine,
  RiFolderLine,
  RiSettingsLine,
  RiLogoutBoxLine,
  RiAddLine,
  RiUserLine,
  RiFlashlightLine,
} from "@remixicon/react";

// Mock data
const mockFiles = [
  {
    id: 1,
    name: "Palettes Basics",
    type: "file",
    thumbnail: "VIZCOM\nPALETTES",
    edited: "13 days ago",
    createdBy: "Sixtus Nosike",
    location: "My files",
  },
  {
    id: 2,
    name: "Untitled",
    type: "file",
    thumbnail: "character-design",
    edited: "5 months ago",
    createdBy: "Sixtus Nosike",
    location: "My files",
  },
];

const mockFolders = [{ id: 1, name: "Designer Style 2D", fileCount: 0 }];

// Sidebar component with TypeScript-style props
export const Sidebar = ({ currentPage, onPageChange, onLogout, user }) => {
  const menuItems = [
    { id: "home", label: "Home", icon: RiHomeLine },
    { id: "files", label: "My Files", icon: RiFolderLine },
    { id: "settings", label: "Settings", icon: RiSettingsLine },
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold">SN</span>
          </div>
          <div>
            <h2 className="font-medium">Sixtus Nosike's Wo...</h2>
            <p className="text-xs text-gray-400">Free plan</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}>
                <Icon size={20} />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Teams Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-gray-400 uppercase">
              Teams
            </h3>
            <button className="text-gray-400 hover:text-white">
              <RiAddLine size={16} />
            </button>
          </div>
          <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>All Sixtus Nosike's Wor...</span>
          </div>
        </div>
      </nav>

      {/* Upgrade Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <RiFlashlightLine size={16} className="text-blue-400" />
            <span className="text-sm font-medium">
              Upgrade to unlock more features
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Upgrade
          </motion.button>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <RiUserLine size={16} className="text-gray-400" />
            <div>
              <p className="text-sm">{user.firstName + ` ` + user.lastName}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-400 hover:text-red-400 transition-colors"
            title="Logout">
            <RiLogoutBoxLine size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
