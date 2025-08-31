import { useNavigate } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiUserLine,
  RiShareLine,

} from "@remixicon/react";
import { useAuth } from "../../../hooks/useAuth";

interface HeaderProps {
  modalAction: () => void;
}

const Header = ({ modalAction }: HeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBackToWorkspace = () => navigate("/workspace");

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Izquierda */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackToWorkspace}
            className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100/70 rounded-xl transition">
            <RiArrowLeftLine className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">Workspace</span>
          </button>

          <div>
            <h1 className="text-lg font-medium text-gray-900 tracking-tight truncate max-w-xs">
              Nuevo
            </h1>
          </div>
        </div>

        {/* Derecha */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100/70 rounded-xl transition"
            title="Compartir proyecto">
            <RiShareLine className="h-5 w-5" />
          </button>

          <button
            onClick={modalAction}
            className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100/70 rounded-xl transition">
            <RiUserLine className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">
              {user?.firstName || "Usuario"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
