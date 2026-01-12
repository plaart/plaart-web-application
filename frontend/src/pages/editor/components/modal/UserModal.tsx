import React from 'react';
import { RiCloseLine, RiUserLine, RiLogoutBoxLine, RiSettings3Line } from '@remixicon/react';
import { useAuth } from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserModal = ({ isOpen, onClose }: UserModalProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Perfil de Usuario
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <RiCloseLine className="h-6 w-6" />
          </button>
        </div>

        {user && (
          <div className="space-y-4">
            {/* Información del usuario */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <RiUserLine className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role?.toLowerCase()}</p>
              </div>
            </div>

            {/* Acciones */}
            <div className="space-y-2">
              <button
                onClick={handleProfile}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <RiSettings3Line className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Configuración de perfil</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
              >
                <RiLogoutBoxLine className="h-5 w-5" />
                <span>Cerrar sesión</span>
              </button>
            </div>

            {/* Información adicional */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Plaart Editor v1.0.0
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
