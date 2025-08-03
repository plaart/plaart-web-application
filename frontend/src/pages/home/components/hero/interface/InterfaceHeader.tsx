import useIntl from "../../../../../hooks/useIntl";

export const InterfaceHeader = () => {
  const { t } = useIntl();
  return (
    <div className="flex items-center justify-between mb-6 text-white">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-sm text-gray-400">
        {t("home.hero.header.data.title")}
      </div>
    </div>
  );
};
