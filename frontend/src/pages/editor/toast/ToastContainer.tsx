// src/pages/editor/toast/ToastContainer.tsx
import React from "react";
import { AnimatePresence } from "framer-motion";
import ToastComponent from "./ToastComponent";
import { useEditorToast } from "../hooks/useEditorToast";

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useEditorToast();

  return (
    <div className="fixed top-6 right-6 z-[9999] space-y-3 max-w-sm">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;