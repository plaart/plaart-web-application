const Changelog = () => {
  return (
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
};

export default Changelog;
