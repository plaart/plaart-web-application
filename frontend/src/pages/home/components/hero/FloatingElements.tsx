import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedDots } from './floating/AnimatedDots';
import { LearningIndicators } from './floating/LearningIndicators';

export const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatedDots />
      <LearningIndicators />
    </div>
  );
};
