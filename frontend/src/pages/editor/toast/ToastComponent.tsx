import React from "react";
import { motion } from "framer-motion";
import type { EditorToast } from "./types";
import ToastIcon from "./ToastIcon";
import { RiCloseLine } from "@remixicon/react";

const toastVariants = {
  initial: { opacity: 0, x: 100, scale: 0.9 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.9,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

interface ToastComponentProps {
  toast: EditorToast;
  onRemove: (id: number) => void;
}

const ToastComponent: React.FC<ToastComponentProps> = ({ toast, onRemove }) => {
  const { id, type, message } = toast;

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="group relative backdrop-blur-xl bg-black/80 border border-white/10 rounded-2xl px-4 py-3 shadow-2xl shadow-black/20 hover:bg-black/85 transition-colors duration-300"
      whileHover={{ scale: 1.02 }}>
      <div className="flex items-center gap-3">
        <ToastIcon type={type} />
        <motion.span
          className="flex-1 text-sm font-medium text-white/90 tracking-wide"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}>
          {message}
        </motion.span>
        <motion.button
          onClick={() => onRemove(id)}
          className="opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity duration-200 p-0.5 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close toast">
          <RiCloseLine className="w-3.5 h-3.5 text-white/60" strokeWidth={2} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ToastComponent;
