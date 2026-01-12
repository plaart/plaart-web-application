// src/pages/editor/hooks/useEditorToast.ts
import { useState, useCallback } from "react";
import type { EditorToast, ToastType } from "../toast/types";

let toastIdCounter = 0;

export const useEditorToast = () => {
  const [toasts, setToasts] = useState<EditorToast[]>([]);

  const addToast = useCallback((
    type: ToastType,
    message: string,
    duration: number = 4000
  ) => {
    const id = ++toastIdCounter;
    const newToast: EditorToast = {
      id,
      type,
      message,
      duration,
      createdAt: Date.now(),
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback((message: string, duration?: number) => 
    addToast("success", message, duration), [addToast]);

  const showError = useCallback((message: string, duration?: number) => 
    addToast("error", message, duration), [addToast]);

  const showLoading = useCallback((message: string) => 
    addToast("loading", message, 0), [addToast]); // 0 = no auto-remove

  const showRetry = useCallback((message: string, duration?: number) => 
    addToast("retry", message, duration), [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showLoading,
    showRetry,
  };
};