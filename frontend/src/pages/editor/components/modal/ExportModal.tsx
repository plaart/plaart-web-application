import React, { useState, useContext } from 'react';
import { 
  RiCloseLine, 
  RiDownloadLine, 
  RiImageLine,
  RiFileTextLine,
  RiSettings3Line,
  RiLoader4Line
} from '@remixicon/react';
import { EditorContext } from '../../context/EditorContext';
import { useEditorToast } from '../../hooks/useEditorToast';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportModal = ({ isOpen, onClose }: ExportModalProps) => {
  const context = useContext(EditorContext);
  const { showSuccess, showError, showLoading, removeToast } = useEditorToast();
  
  const [exportFormat, setExportFormat] = useState<'png' | 'jpeg' | 'svg'>('png');
  const [quality, setQuality] = useState(100);
  const [resolution, setResolution] = useState('1x');
  const [includeBackground, setIncludeBackground] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!context) {
    throw new Error("ExportModal must be used within EditorProvider");
  }

  const { exportCanvas, projectId } = context;

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    const loadingId = showLoading("Exportando imagen...");
    
    try {
      // Calcular el factor de resolución
      const scaleFactor = parseFloat(resolution.replace('x', ''));
      
      // Exportar usando la función del contexto
      const dataUrl = await exportCanvas(exportFormat, {
        quality: exportFormat === 'jpeg' ? quality / 100 : undefined,
        scale: scaleFactor,
        pixelRatio: scaleFactor
      });
      
      removeToast(loadingId);
      
      if (dataUrl) {
        // Crear y descargar el archivo
        const link = document.createElement("a");
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        link.download = `plaart-${projectId?.slice(-6) || 'project'}-${timestamp}.${exportFormat}`;
        link.href = dataUrl;
        link.click();
        
        showSuccess(`🎉 Imagen exportada en ${exportFormat.toUpperCase()}`, 3000);
        onClose();
      } else {
        showError("No se pudo generar la imagen", 4000);
      }
    } catch (error) {
      removeToast(loadingId);
      console.error("Error exportando:", error);
      showError(`Error al exportar: ${error instanceof Error ? error.message : 'Error desconocido'}`, 5000);
    } finally {
      setIsExporting(false);
    }
  };

  const formatOptions = [
    { 
      value: 'png', 
      label: 'PNG', 
      description: 'Mejor calidad, soporta transparencia',
      icon: '🖼️'
    },
    { 
      value: 'jpeg', 
      label: 'JPEG', 
      description: 'Menor tamaño, ideal para fotografías',
      icon: '📸'
    },
    { 
      value: 'svg', 
      label: 'SVG', 
      description: 'Vector escalable (experimental)',
      icon: '⚡'
    }
  ] as const;

  const resolutionOptions = [
    { value: '0.5x', label: '0.5x', description: 'Baja calidad, menor tamaño' },
    { value: '1x', label: '1x', description: 'Calidad normal' },
    { value: '2x', label: '2x', description: 'Alta calidad (recomendado)' },
    { value: '3x', label: '3x', description: 'Ultra alta calidad' }
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isExporting) {
      onClose();
    }
  };

  const estimatedSize = () => {
    const baseSize = exportFormat === 'jpeg' ? 0.5 : 1.2; // MB aproximados
    const qualityFactor = exportFormat === 'jpeg' ? quality / 100 : 1;
    const resolutionFactor = Math.pow(parseFloat(resolution.replace('x', '')), 2);
    return Math.round(baseSize * qualityFactor * resolutionFactor * 10) / 10;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <RiDownloadLine className="h-5 w-5 mr-2 text-blue-600" />
            Exportar Proyecto
          </h2>
          <button
            onClick={onClose}
            disabled={isExporting}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <RiCloseLine className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Formato */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Formato de archivo
            </label>
            <div className="space-y-2">
              {formatOptions.map((option) => (
                <label
                  key={option.value}
                  className={`
                    flex items-center p-3 border rounded-xl cursor-pointer transition-all
                    ${exportFormat === option.value 
                      ? 'border-blue-500 bg-blue-50 shadow-sm' 
                      : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }
                    ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <input
                    type="radio"
                    name="format"
                    value={option.value}
                    checked={exportFormat === option.value}
                    onChange={(e) => setExportFormat(e.target.value as typeof exportFormat)}
                    disabled={isExporting}
                    className="sr-only"
                  />
                  <span className="text-2xl mr-3">{option.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                  {exportFormat === option.value && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Calidad (solo para JPEG) */}
          {exportFormat === 'jpeg' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Calidad
                </label>
                <span className="text-sm font-medium text-blue-600">{quality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                disabled={isExporting}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Menor tamaño</span>
                <span>Mejor calidad</span>
              </div>
            </div>
          )}

          {/* Resolución */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Resolución
            </label>
            <div className="grid grid-cols-2 gap-2">
              {resolutionOptions.map((option) => (
                <label
                  key={option.value}
                  className={`
                    flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all
                    ${resolution === option.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                    }
                    ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <input
                    type="radio"
                    name="resolution"
                    value={option.value}
                    checked={resolution === option.value}
                    onChange={(e) => setResolution(e.target.value)}
                    disabled={isExporting}
                    className="sr-only"
                  />
                  <span className="font-medium text-gray-900">{option.label}</span>
                  <span className="text-xs text-gray-500 text-center">{option.description}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Opciones adicionales */}
          {exportFormat !== 'svg' && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Opciones adicionales
              </label>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <RiSettings3Line className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Incluir fondo blanco</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeBackground}
                    onChange={(e) => setIncludeBackground(e.target.checked)}
                    disabled={isExporting}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )}

          {/* Vista previa */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <RiFileTextLine className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Resumen de exportación</span>
            </div>
            <div className="text-sm text-blue-800 space-y-1">
              <div className="flex justify-between">
                <span>Formato:</span>
                <span className="font-medium">{exportFormat.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>Resolución:</span>
                <span className="font-medium">{resolution}</span>
              </div>
              {exportFormat === 'jpeg' && (
                <div className="flex justify-between">
                  <span>Calidad:</span>
                  <span className="font-medium">{quality}%</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tamaño estimado:</span>
                <span className="font-medium">~{estimatedSize()} MB</span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              disabled={isExporting}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <RiLoader4Line className="h-4 w-4 animate-spin" />
                  <span>Exportando...</span>
                </>
              ) : (
                <>
                  <RiDownloadLine className="h-4 w-4" />
                  <span>Exportar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;