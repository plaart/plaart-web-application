import { FileCard } from "../components/FileCard";
import { mockFiles } from "../../../mocks/mock_workspace_data";
import { RiExpandVerticalLine, RiFileTextLine } from "@remixicon/react";

const Home = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Home</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            New folder
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            New Tab
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Get started with templates
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Show Templates
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">All files</h2>
          <button className="text-sm text-gray-600">Last created</button>
        </div>
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 text-sm font-medium text-gray-600">
            <div>Name</div>
            <div>Created</div>
            <div>Edited by</div>
            <div>Location</div>
            <div></div>
          </div>
          {mockFiles.map((file) => (
            <div
              key={file.id}
              className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <RiFileTextLine size={16} className="text-gray-400" />
                <span className="text-gray-900">{file.name}</span>
              </div>
              <div className="text-sm text-gray-600">December 22nd, 2024</div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{file.createdBy}</span>
              </div>
              <div className="text-sm text-gray-600">{file.location}</div>
              <div className="flex justify-end">
                <button>
                  <RiExpandVerticalLine size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
