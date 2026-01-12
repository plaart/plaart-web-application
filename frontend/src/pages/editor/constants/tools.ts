import { Tool, type ToolType } from "../types/editor";


export interface ToolConfig {
  tool: ToolType;
  icon: string;
  label: string;
  description: string;
  color: string;
  category: 'draw' | 'shape' | 'text' | 'selection';
}

export const TOOL_CONFIGS: ToolConfig[] = [
  { tool: Tool.BRUSH, icon: '✏️', label: 'Pincel', description: 'Dibujar líneas a mano alzada', color: 'bg-blue-500', category: 'draw' },
  { tool: Tool.ERASER, icon: '🧹', label: 'Borrador', description: 'Borrar partes del dibujo', color: 'bg-red-500', category: 'draw' },
  { tool: Tool.LINE, icon: '📏', label: 'Línea', description: 'Dibujar líneas rectas', color: 'bg-gray-500', category: 'draw' },
  { tool: Tool.RECTANGLE, icon: '⬜', label: 'Rectángulo', description: 'Crear rectángulos', color: 'bg-green-500', category: 'shape' },
  { tool: Tool.CIRCLE, icon: '🔵', label: 'Círculo', description: 'Crear círculos', color: 'bg-purple-500', category: 'shape' },
  { tool: Tool.TEXT, icon: '📝', label: 'Texto', description: 'Agregar texto', color: 'bg-yellow-500', category: 'text' },
  { tool: Tool.SELECT, icon: '👆', label: 'Seleccionar', description: 'Seleccionar y mover objetos', color: 'bg-indigo-500', category: 'selection' },
  { tool: Tool.MOVE, icon: '✋', label: 'Mover', description: 'Mover el canvas', color: 'bg-orange-500', category: 'selection' },
];

export const CATEGORIES = {
  draw: { name: 'Dibujo', icon: '🎨' },
  shape: { name: 'Formas', icon: '📐' },
  text: { name: 'Texto', icon: '📝' },
  selection: { name: 'Selección', icon: '👆' },
} as const;
