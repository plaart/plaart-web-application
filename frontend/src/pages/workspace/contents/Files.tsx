import { mockFiles, mockFolders } from "../../../mocks/mock_workspace_data";
import { FolderCard } from "../components/FolderCard";
import useIntl from "../../../hooks/useIntl";
import { FileCreateCard } from "../components/FileCreateCard";
import { FileCard } from "../components/FileCard";

const Files = () => {
  const { t } = useIntl();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t("workspace.content.file.header.title")}
        </h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            {t("workspace.content.file.header.button.new.folder")}
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {t("workspace.content.file.header.button.new.file")}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t("workspace.content.file.section.folder.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockFolders.map((folder) => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t("workspace.content.file.section.file.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
          <FileCreateCard />
        </div>
      </div>
    </div>
  );
};

export default Files;
