import { useState } from "react";
import { motion } from "framer-motion";
import { RiAddLine } from "@remixicon/react";

// Componente de avatar de usuario
const UserAvatar = ({ user, size = "sm" }) => {
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium`}>
      {user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()}
    </div>
  );
};

const Settings = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [workspaceName, setWorkspaceName] = useState(
    "Sixtus Nosike's Workspace"
  );
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const settingsMenuItems = [
    { id: "general", label: "General" },
    { id: "plans", label: "Plans & Billing" },
    { id: "palettes", label: "Palettes" },
  ];

  const accountMenuItems = [
    { id: "profile", label: "Profile" },
    { id: "changelog", label: "Changelog" },
  ];

  // Mock data
  const mockMembers = [
    {
      id: 1,
      name: "Sixtus Nosike",
      email: "sixtusnosike@gmail.com",
      role: "Owner",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      role: "Editor",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      role: "Viewer",
      status: "pending",
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      email: "elena.r@company.com",
      role: "Editor",
      status: "active",
    },
  ];

  const mockTeams = [
    {
      id: 1,
      name: "Design Team",
      members: 8,
      description: "Main design and creative team",
    },
    {
      id: 2,
      name: "Product Team",
      members: 5,
      description: "Product development and strategy",
    },
    {
      id: 3,
      name: "Marketing Team",
      members: 3,
      description: "Marketing and brand management",
    },
  ];

  const colorPalettes = [
    {
      id: 1,
      name: "Primary Brand",
      colors: ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B"],
    },
    {
      id: 2,
      name: "Secondary",
      colors: ["#10B981", "#3B82F6", "#F97316", "#EF4444"],
    },
    {
      id: 3,
      name: "Neutral",
      colors: ["#1F2937", "#6B7280", "#D1D5DB", "#F9FAFB"],
    },
  ];

  // Renderizado del contenido según la sección activa
  const renderGeneralSettings = () => (
    <div className="space-y-6">
      {/* Workspace Name */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Workspace name
        </h3>
        <div className="flex space-x-3">
          <input
            type="text"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>

      {/* Workspace Logo */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Workspace logo
        </h3>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">SN</span>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Upload logo
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Recommended size is 256×256px
        </p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email notifications</h4>
              <p className="text-sm text-gray-500">
                Receive notifications via email
              </p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotifications ? "bg-blue-600" : "bg-gray-200"
              }`}>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Push notifications</h4>
              <p className="text-sm text-gray-500">
                Receive push notifications in browser
              </p>
            </div>
            <button
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                pushNotifications ? "bg-blue-600" : "bg-gray-200"
              }`}>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  pushNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Workspace */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Delete workspace
        </h3>
        <p className="text-gray-600 mb-4">
          Deleting a workspace will permanently delete all of its data,
          including all files and folders. This action is irreversible.
        </p>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Delete "Sixtus Nosike's Workspace"
        </button>
      </div>
    </div>
  );


  const renderPlansSettings = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h3>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Free Plan</h4>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
              Current
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Basic features for personal use
          </p>
          <ul className="text-sm text-gray-600 space-y-1 mb-4">
            <li>• Up to 3 projects</li>
            <li>• 1GB storage</li>
            <li>• Basic support</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Billing History</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">
            No billing history available for free plan
          </p>
        </div>
      </div>
    </div>
  );

  const renderPalettesSettings = () => (
    <div className="space-y-6">
      {/* Create Palette */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Create new palette
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Palette name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex space-x-2">
            <input
              type="color"
              className="w-12 h-10 border border-gray-300 rounded"
              defaultValue="#6366F1"
            />
            <input
              type="color"
              className="w-12 h-10 border border-gray-300 rounded"
              defaultValue="#8B5CF6"
            />
            <input
              type="color"
              className="w-12 h-10 border border-gray-300 rounded"
              defaultValue="#EC4899"
            />
            <input
              type="color"
              className="w-12 h-10 border border-gray-300 rounded"
              defaultValue="#F59E0B"
            />
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <RiAddLine size={16} />
            </button>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Palette
          </button>
        </div>
      </div>

      {/* Existing Palettes */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Your Palettes ({colorPalettes.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {colorPalettes.map((palette) => (
            <div key={palette.id} className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{palette.name}</h4>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-700 text-sm">
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex space-x-2">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded border border-gray-200"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      {/* Profile Info */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Profile Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <UserAvatar user={{ name: "Sixtus Nosike" }} size="lg" />
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Change Avatar
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                defaultValue="Sixtus"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Nosike"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              defaultValue="sixtusnosike@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderChangelogSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Updates
        </h3>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Version 2.4.0</h4>
              <span className="text-sm text-gray-500">January 15, 2025</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• New collaboration features</li>
              <li>• Improved file organization</li>
              <li>• Bug fixes and performance improvements</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Version 2.3.1</h4>
              <span className="text-sm text-gray-500">December 22, 2024</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Enhanced palette management</li>
              <li>• New export formats</li>
              <li>• UI/UX improvements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Función para renderizar el contenido según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return renderGeneralSettings();
      case "plans":
        return renderPlansSettings();
      case "palettes":
        return renderPalettesSettings();
      case "profile":
        return renderProfileSettings();
      case "changelog":
        return renderChangelogSettings();
      default:
        return renderGeneralSettings();
    }
  };

  // Función para obtener el título de la página
  const getPageTitle = () => {
    const titles = {
      general: "General",
      plans: "Plans & Billing",
      palettes: "Palettes",
      profile: "Profile",
      changelog: "Changelog",
    };
    return titles[activeSection] || "General";
  };

  // Función para obtener la descripción de la página
  const getPageDescription = () => {
    const descriptions = {
      general: "Manage your workspace settings",
      members: "Manage workspace members and permissions",
      teams: "Organize members into teams",
      plans: "Manage your subscription and billing",
      palettes: "Create and manage color palettes",
      profile: "Update your profile information",
      changelog: "View recent updates and changes",
    };
    return descriptions[activeSection] || "Manage your workspace settings";
  };

  return (
    <div className="flex h-full">
      {/* Settings Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-lg font-semibold mb-6">Settings</h2>

        <div className="mb-6">
          <h3 className="text-xs font-medium text-gray-400 uppercase mb-3">
            Workspace
          </h3>
          <div className="space-y-1">
            {settingsMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium text-gray-400 uppercase mb-3">
            Account
          </h3>
          <div className="space-y-1">
            {accountMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="max-w-4xl">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {getPageTitle()}
              </h1>
              <p className="text-gray-600">{getPageDescription()}</p>
            </div>
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
