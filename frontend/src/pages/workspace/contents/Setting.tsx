import { useState } from "react";
import { motion } from "framer-motion";
import { WORKSPACE_SETTING } from "../../../constant";
import General from "../components/settings/General";
import Plans from "../components/settings/Plans";
import Profile from "../components/settings/Profile";
import Changelog from "../components/settings/Changelog";
import SettingsSidebar from "../components/SettingSidebar";

const Settings = () => {
  const [activeSection, setActiveSection] = useState(WORKSPACE_SETTING.GENERAL);

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return <General />;
      case "plans":
        return <Plans />;
      case "profile":
        return <Profile />;
      case "changelog":
        return <Changelog />;
      default:
        return <General />;
    }
  };

  const getPageTitle = () =>
    ({
      general: "General",
      plans: "Plans & Billing",
      profile: "Profile",
      changelog: "Changelog",
    }[activeSection] || "General");

  const getPageDescription = () =>
    ({
      general: "Manage your workspace settings",
      plans: "Manage your subscription and billing",
      profile: "Update your profile information",
      changelog: "View recent updates and changes",
    }[activeSection] || "Manage your workspace settings");

  return (
    <div className="flex h-full">
      <SettingsSidebar
        activeSection={activeSection}
        onChange={setActiveSection}
      />

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
