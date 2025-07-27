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

// const WorkspacePage = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
//       <div className="container mx-auto px-4 py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             ¡Bienvenido al Workspace, {user?.firstName}!
//           </h1>
//           <p className="text-xl text-gray-600 mb-8">
//             Esta es tu área de trabajo como {user?.role}
//           </p>

//           {/* Contenido específico del workspace */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               Tu espacio de trabajo
//             </h2>
//             <p className="text-gray-600">
//               Aquí puedes gestionar tus tareas y proyectos.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={logout}
//               className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors">
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                 />
//               </svg>
//               <span className="font-medium">Cerrar Sesión</span>
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default WorkspacePage;
