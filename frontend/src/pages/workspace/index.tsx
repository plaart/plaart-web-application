import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

import { useState } from "react";
import Home from "./contents/Home";
import Files from "./contents/Files";
import Settings from "./contents/Setting";
import { Sidebar } from "./components/Sidebar";

const WorkspacePage = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "files":
        return <Files />;
      case "settings":
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
        user={user}
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
