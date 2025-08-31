import { motion } from "framer-motion";
import type { ToastType } from "./types";
import { RiAlertLine, RiCheckLine } from "@remixicon/react";

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const iconVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 30,
      delay: 0.1,
    },
  },
};

interface ToastIconProps {
  type: ToastType;
}

const ToastIcon = ({ type }: ToastIconProps) => {
  switch (type) {
    case "loading":
      return (
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 rounded-full border border-white/20"></div>
          <motion.div
            className="absolute inset-0 rounded-full border border-transparent border-t-white/60"
            variants={spinnerVariants}
            animate="animate"
          />
        </div>
      );
    case "success":
      return (
        <motion.div variants={iconVariants} initial="initial" animate="animate">
          <RiCheckLine className="w-4 h-4 text-emerald-400" strokeWidth={2.5} />
        </motion.div>
      );
    case "error":
      return (
        <motion.div variants={iconVariants} initial="initial" animate="animate">
          <RiAlertLine className="w-4 h-4 text-red-400" strokeWidth={2.5} />
        </motion.div>
      );
    case "retry":
      return (
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 rounded-full border border-amber-500/20"></div>
          <motion.div
            className="absolute inset-0 rounded-full border border-transparent border-t-amber-400"
            variants={spinnerVariants}
            animate="animate"
          />
        </div>
      );
    default:
      return null;
  }
};

export default ToastIcon;
