import { RiExpandVerticalLine, RiFileTextLine } from "@remixicon/react";
import useIntl from "../../../hooks/useIntl";

type Props = {
  files: any[];
};

export const AllFilesTable = ({ files }: Props) => {
  const { t } = useIntl();
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 text-sm font-medium text-gray-600">
        <div>{t("workspace.content.home.main.all.table.columns.name")}</div>
        <div>{t("workspace.content.home.main.all.table.columns.created")}</div>
        <div>{t("workspace.content.home.main.all.table.columns.editBy")}</div>
        <div>{t("workspace.content.home.main.all.table.columns.location")}</div>
        <div></div>
      </div>
      {files.map((file) => (
        <div
          key={file.id}
          className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <RiFileTextLine size={16} className="text-gray-400" />
            <span className="text-gray-900">{file.name}</span>
          </div>
          <div className="text-sm text-gray-600">December 22nd, 2024</div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-purple-500 rounded-full" />
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
  );
};
