import { AnimatedDots } from './floating/AnimatedDots';
import { LearningIndicators } from './floating/LearningIndicators';

export const FloatingElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatedDots />
      <LearningIndicators />
    </div>
  );
};
