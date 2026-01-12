import React, { useState } from "react";
import {
  RiPencilLine,
  RiEraserLine,
  RiShapesLine,
  RiRectangleLine,
  RiCircleLine,
  RiText,
  RiCursorLine,
  RiDragMove2Line,
  RiPaletteLine,
  RiSettings3Line,
  RiZoomInLine,
  RiZoomOutLine,
  RiRefreshLine,
  RiDownloadLine,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
} from "@remixicon/react";
import { Tool, type ToolType } from "../types";

interface ToolNavbarProps {
  currentTool?: Tool;
  onToolChange?: (tool: ToolType) => void;
  brushSize?: number;
  onBrushSizeChange?: (size: number) => void;
  brushColor?: string;
  onBrushColorChange?: (color: string) => void;
  onExport?: () => void;
}

const ToolNavbar = ({
  currentTool,
  onToolChange,
  brushSize,
  onBrushSizeChange,
  brushColor,
  onBrushColorChange,
  onExport,
}: ToolNavbarProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Herramientas actualizadas para coincidir con GraphQL
  const tools = [
    { id: Tool.BRUSH, icon: RiPencilLine, name: "Pincel", shortcut: "B" },
    { id: Tool.ERASER, icon: RiEraserLine, name: "Borrador", shortcut: "E" },
    { id: Tool.LINE, icon: RiShapesLine, name: "Línea", shortcut: "L" },
    {
      id: Tool.RECTANGLE,
      icon: RiRectangleLine,
      name: "Rectángulo",
      shortcut: "R",
    },
    { id: Tool.CIRCLE, icon: RiCircleLine, name: "Círculo", shortcut: "C" },
    { id: Tool.TEXT, icon: RiText, name: "Texto", shortcut: "T" },
    { id: Tool.SELECT, icon: RiCursorLine, name: "Seleccionar", shortcut: "S" },
    { id: Tool.MOVE, icon: RiDragMove2Line, name: "Mover", shortcut: "M" },
  ];

  const handleToolSelect = (tool: ToolType) => {
    onToolChange?.(tool);
  };

  const predefinedColors = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#FFC0CB",
    "#A52A2A",
    "#808080",
    "#000080",
  ];

  const brushSizes = [1, 2, 3, 5, 8, 12, 16, 20, 25, 30];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Herramientas principales */}
          <div className="flex items-center space-x-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = currentTool === tool.id;

              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolSelect(tool.id)}
                  className={`
                    relative p-3 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-600 shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    }
                  `}
                  title={`${tool.name} (${tool.shortcut})`}>
                  <Icon className="h-5 w-5" />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Separador */}
          <div className="w-px h-8 bg-gray-300" />

          {/* Tamaño del pincel - Solo para herramientas que lo necesiten */}
          {[Tool.BRUSH, Tool.ERASER, Tool.PEN].includes(currentTool) && (
            <>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-600">
                  Tamaño:
                </span>
                <div className="relative">
                  <select
                    value={brushSize}
                    onChange={(e) =>
                      onBrushSizeChange?.(Number(e.target.value))
                    }
                    className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {brushSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}px
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Separador */}
              <div className="w-px h-8 bg-gray-300" />
            </>
          )}

          {/* Color - Solo para herramientas que lo necesiten */}
          {![Tool.ERASER, Tool.SELECT, Tool.MOVE].includes(currentTool) && (
            <>
              <div className="relative">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Seleccionar color">
                  <RiPaletteLine className="h-4 w-4 text-gray-600" />
                  <div
                    className="w-6 h-6 rounded-lg border-2 border-white shadow-sm"
                    style={{ backgroundColor: brushColor }}
                  />
                </button>

                {/* Color picker dropdown */}
                {showColorPicker && (
                  <div className="absolute bottom-full mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px]">
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {predefinedColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            onBrushColorChange?.(color);
                            setShowColorPicker(false);
                          }}
                          className={`
                            w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110
                            ${
                              brushColor === color
                                ? "border-blue-500 scale-110"
                                : "border-gray-200"
                            }
                          `}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      value={brushColor}
                      onChange={(e) => onBrushColorChange?.(e.target.value)}
                      className="w-full h-8 rounded border border-gray-200 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Separador */}
              <div className="w-px h-8 bg-gray-300" />
            </>
          )}

          {/* Controles de zoom */}
          <div className="flex items-center space-x-1">
            <button
              //onClick={handleZoomOut}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              title="Alejar">
              <RiZoomOutLine className="h-4 w-4" />
            </button>
            <button
             // onClick={handleZoomReset}
              className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors min-w-[50px]"
              title="Restablecer zoom">
            </button>
            <button
           //   onClick={handleZoomIn}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              title="Acercar">
              <RiZoomInLine className="h-4 w-4" />
            </button>
          </div>

          {/* Separador */}
          <div className="w-px h-8 bg-gray-300" />

          {/* Acciones */}
          <div className="flex items-center space-x-2">
            <button
   //           onClick={onUndo}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              title="Deshacer (Ctrl+Z)">
              <RiArrowGoBackLine className="h-4 w-4" />
            </button>
            <button
   //           onClick={onRedo}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              title="Rehacer (Ctrl+Y)">
              <RiArrowGoForwardLine className="h-4 w-4" />
            </button>
            <button
       //       onClick={onClear}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              title="Limpiar canvas">
              <RiRefreshLine className="h-4 w-4" />
            </button>
            <button
              onClick={onExport}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              title="Exportar imagen">
              <RiDownloadLine className="h-4 w-4" />
            </button>

            {/* Configuración */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                title="Configuración">
                <RiSettings3Line className="h-4 w-4" />
              </button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolNavbar;
