type Props = {
  activeSection: string;
  onChange: (section: string) => void;
};

const SettingsSidebar = ({ activeSection, onChange }: Props) => {
  const settingsMenuItems = [
    { id: "general", label: "General" },
    { id: "plans", label: "Plans & Billing" },
  ];

  const accountMenuItems = [
    { id: "profile", label: "Profile" },
    { id: "changelog", label: "Changelog" },
  ];

  return (
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
              onClick={() => onChange(item.id)}
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
              onClick={() => onChange(item.id)}
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
  );
};

export default SettingsSidebar;
