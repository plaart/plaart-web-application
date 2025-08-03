import { mockFiles } from "../../../mocks/mock_workspace_data";
import HeaderActions from "../components/HeaderActions";
import SectionHeader from "../components/SectionHeader";
import useIntl from "../../../hooks/useIntl";
import { RecentFilesGrid } from "../components/RecentFilesGrid";
import { AllFilesTable } from "../components/AllFilesTable";

const Home = () => {
  const { t } = useIntl();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t("workspace.content.home.header.title")}
        </h1>
        <HeaderActions />
      </div>

      <div className="mb-6">
        <SectionHeader
          title={t("workspace.content.home.main.templates.title")}
          actionText={t("workspace.content.home.main.templates.button")}
        />
      </div>

      <div className="mb-8">
        <SectionHeader title={t("workspace.content.home.main.recent.title")} />
        <RecentFilesGrid files={mockFiles} />
      </div>

      <div>
        <SectionHeader
          title={t("workspace.content.home.main.all.title")}
          actionText={t("workspace.content.home.main.all.sort")}
        />
        <AllFilesTable files={mockFiles} />
      </div>
    </div>
  );
};

export default Home;
