import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

import { useState } from "react";
import Home from "./contents/Home";
import Files from "./contents/Files";
import Settings from "./contents/Setting";
import { Sidebar } from "./components/Sidebar";
import { useLogger } from "../../hooks/useLogger";
import { useProjects } from "../../hooks/useProject";
import { WORKSPACE_PAGE } from "../../constant";

const WorkspacePage = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState(WORKSPACE_PAGE.HOME);
  const logger = useLogger();
  const { id, firstName, lastName, email } = user!;
  const { projects } = useProjects(id);

  logger.info("INFORMACION DEL USUARIO :::", {
    userId: id,
    name: `${firstName} ${lastName}`,
    email: email,
    projects: JSON.stringify(projects),
  });

  const renderPage = () => {
    switch (currentPage) {
      case WORKSPACE_PAGE.HOME:
        return <Home />;
      case WORKSPACE_PAGE.FILE:
        return <Files />;
      case WORKSPACE_PAGE.SETTING:
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={logout}
        user={user!}
      />
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full">
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkspacePage;
