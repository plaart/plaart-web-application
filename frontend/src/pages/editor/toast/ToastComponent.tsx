import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiCloseLine, RiCheckLine, RiErrorWarningLine, RiLoader4Line, RiInformationLine } from "@remixicon/react";

export interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "loading" | "info";
  duration?: number;
}

interface ToastComponentProps {
  toast: Toast;
  onRemove: (id: number) => void;
}

const ToastComponent: React.FC<ToastComponentProps> = ({ toast, onRemove }) => {
  const [progress, setProgress] = useState(100);

  // Auto remove toast after duration
  useEffect(() => {
    if (toast.type === 'loading') return; // No auto-remove loading toasts

    const duration = toast.duration || 4000;
    const interval = 50;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev - step;
        if (next <= 0) {
          onRemove(toast.id);
          return 0;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [toast.id, toast.duration, toast.type, onRemove]);

  const getToastConfig = () => {
    switch (toast.type) {
      case "success":
        return {
          icon: RiCheckLine,
          bgColor: "bg-emerald-50",
          borderColor: "border-emerald-200",
          textColor: "text-emerald-800",
          iconColor: "text-emerald-600",
          progressColor: "bg-emerald-500",
          accentColor: "border-l-emerald-500"
        };
      case "error":
        return {
          icon: RiErrorWarningLine,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-800",
          iconColor: "text-red-600",
          progressColor: "bg-red-500",
          accentColor: "border-l-red-500"
        };
      case "loading":
        return {
          icon: RiLoader4Line,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-800",
          iconColor: "text-blue-600",
          progressColor: "bg-blue-500",
          accentColor: "border-l-blue-500"
        };
      case "info":
      default:
        return {
          icon: RiInformationLine,
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          textColor: "text-gray-800",
          iconColor: "text-gray-600",
          progressColor: "bg-gray-500",
          accentColor: "border-l-gray-500"
        };
    }
  };

  const config = getToastConfig();
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={`
        relative overflow-hidden rounded-xl border-l-4 shadow-lg backdrop-blur-sm
        ${config.bgColor} ${config.borderColor} ${config.accentColor}
        max-w-sm w-full
      `}
    >
      {/* Progress bar */}
      {toast.type !== 'loading' && (
        <div className="absolute top-0 left-0 h-1 bg-black/5 w-full">
          <motion.div
            className={`h-full ${config.progressColor} opacity-60`}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <IconComponent 
              className={`
                h-5 w-5 ${config.iconColor}
                ${toast.type === 'loading' ? 'animate-spin' : ''}
              `} 
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${config.textColor} leading-relaxed`}>
              {toast.message}
            </p>
          </div>

          {/* Close button */}
          {toast.type !== 'loading' && (
            <button
              onClick={() => onRemove(toast.id)}
              className={`
                flex-shrink-0 p-1 rounded-md transition-colors
                hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20
                ${config.iconColor} hover:${config.textColor}
              `}
            >
              <RiCloseLine className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 pointer-events-none" />
    </motion.div>
  );
};

export default ToastComponent;