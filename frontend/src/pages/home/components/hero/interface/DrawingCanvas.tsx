import React from 'react';
import { motion } from 'framer-motion';
// ✅ CORRECTO - Rutas absolutas
import { AnimatedPath } from '@/pages/home/components/hero/interface/AnimatedPath';
import { CanvasContent } from '@/pages/home/components/hero/interface/CanvasContent';

export const DrawingCanvas = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-8 mb-6 min-h-64 flex items-center justify-center relative overflow-hidden">
      {/* Drawing Canvas Simulation */}
      <div className="absolute inset-4 border-2 border-dashed border-gray-600 rounded-lg"></div>
      
      <AnimatedPath />
      <CanvasContent />
    </div>
  );
};
