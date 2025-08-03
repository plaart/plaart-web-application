

const Plans = () => {
  return (
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
};

export default Plans;
