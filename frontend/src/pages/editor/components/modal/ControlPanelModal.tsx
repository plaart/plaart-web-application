import { useState, useContext } from "react";
import {
  RiCloseLine,
  RiPaletteLine,
  RiSettings3Line,
  RiZoomInLine,
  RiZoomOutLine,
  RiGridLine,
  RiEyeLine,
  RiEyeOffLine,
  RiKeyboardLine,
  RiMagicLine,
} from "@remixicon/react";
import { EditorContext } from "../../context/EditorContext";
import { useEditorToast } from "../../hooks/useEditorToast";

interface ControlPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ControlPanelModal = ({ isOpen, onClose }: ControlPanelModalProps) => {
  const context = useContext(EditorContext);
  const { showSuccess } = useEditorToast();
  
  const [showGrid, setShowGrid] = useState(false);
  const [showLayers, setShowLayers] = useState(true);
  const [canvasOpacity, setCanvasOpacity] = useState(100);

  if (!context) {
    throw new Error("ControlPanelModal must be used within EditorProvider");
  }

  const { canvasSettings, setZoom } = context;

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(canvasSettings.zoom * 1.2, 5);
    setZoom(newZoom);
    showSuccess(`🔍 Zoom: ${Math.round(newZoom * 100)}%`, 1000);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(canvasSettings.zoom / 1.2, 0.1);
    setZoom(newZoom);
    showSuccess(`🔍 Zoom: ${Math.round(newZoom * 100)}%`, 1000);
  };

  const handleResetZoom = () => {
    setZoom(1);
    showSuccess("🔍 Zoom: 100%", 1000);
  };

  const shortcuts = [
    { key: "B", description: "Pincel" },
    { key: "E", description: "Borrador" },
    { key: "L", description: "Línea" },
    { key: "R", description: "Rectángulo" },
    { key: "C", description: "Círculo" },
    { key: "T", description: "Texto" },
    { key: "Ctrl+Z", description: "Deshacer" },
    { key: "Ctrl+Y", description: "Rehacer" },
    { key: "Ctrl+S", description: "Guardar" },
    { key: "Ctrl+E", description: "Exportar" },
    { key: "Ctrl+0", description: "Zoom 100%" },
    { key: "ESC", description: "Cerrar modal" },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <RiSettings3Line className="h-5 w-5 mr-2 text-blue-600" />
            Panel de Control
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <RiCloseLine className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vista del canvas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <RiEyeLine className="h-5 w-5 mr-2 text-indigo-600" />
              Vista del Canvas
            </h3>

            <div className="space-y-4 bg-gray-50 rounded-lg p-4">
              {/* Grilla */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <RiGridLine className="h-4 w-4 text-gray-600" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Mostrar grilla
                    </span>
                    <p className="text-xs text-gray-500">Ayuda visual para alineación</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showGrid}
                    onChange={(e) => {
                      setShowGrid(e.target.checked);
                      showSuccess(e.target.checked ? "📐 Grilla activada" : "📐 Grilla desactivada", 1000);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Capas */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <RiEyeLine className="h-4 w-4 text-gray-600" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Panel de capas
                    </span>
                    <p className="text-xs text-gray-500">Gestionar elementos del canvas</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showLayers}
                    onChange={(e) => {
                      setShowLayers(e.target.checked);
                      showSuccess(e.target.checked ? "📋 Panel de capas visible" : "📋 Panel de capas oculto", 1000);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Opacidad del canvas */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <RiMagicLine className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Opacidad del canvas
                    </span>
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    {canvasOpacity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={canvasOpacity}
                  onChange={(e) => setCanvasOpacity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Transparente</span>
                  <span>Opaco</span>
                </div>
              </div>
            </div>

            {/* Zoom actual */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">Zoom actual</span>
                <span className="text-lg font-bold text-blue-700">
                  {Math.round(canvasSettings.zoom * 100)}%
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleZoomOut}
                  className="flex-1 flex items-center justify-center space-x-1 p-2 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <RiZoomOutLine className="h-4 w-4" />
                  <span className="text-sm">Alejar</span>
                </button>
                <button
                  onClick={handleResetZoom}
                  className="flex-1 p-2 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                >
                  100%
                </button>
                <button
                  onClick={handleZoomIn}
                  className="flex-1 flex items-center justify-center space-x-1 p-2 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <RiZoomInLine className="h-4 w-4" />
                  <span className="text-sm">Acercar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Atajos de teclado */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <RiKeyboardLine className="h-5 w-5 mr-2 text-purple-600" />
              Atajos de Teclado
            </h3>

            <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{shortcut.description}</span>
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>

            {/* Atajos rápidos */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                <RiPaletteLine className="h-4 w-4 mr-2 text-green-600" />
                Acciones Rápidas
              </h4>
              
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={handleZoomIn}
                  className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <RiZoomInLine className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Zoom +</span>
                </button>

                <button 
                  onClick={handleZoomOut}
                  className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <RiZoomOutLine className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Zoom -</span>
                </button>

                <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors">
                  <RiPaletteLine className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Colores</span>
                </button>

                <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors">
                  <RiEyeOffLine className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Ocultar UI</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Información del proyecto */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            💡 Tip: Usa <kbd className="px-1 py-0.5 text-xs bg-gray-200 rounded">Ctrl+Shift+?</kbd> para mostrar/ocultar este panel
          </p>
        </div>
      </div>
    </div>
  );
};

export default ControlPanelModal;