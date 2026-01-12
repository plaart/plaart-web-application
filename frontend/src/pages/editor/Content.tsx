import { useCallback, useContext, useEffect } from "react";
import CanvasContainer from "./components/canvas/CanvasContainer";
import { Tool } from "./types/editor";
import { EditorContext } from "./context/EditorContext";
import ToolNavbar from "./components/ToolNavbar";
import ToastContainer from "./toast/ToastContainer";
import Header from "./components/Header";
import ModalManager from "./components/modal/ModalManager";
import { useEditorToast } from "./hooks/useEditorToast";
import { useModal } from "./hooks/useModal";
import { useEditor } from "./hooks/useEditor";

const EditorContent = () => {
  const { showSuccess, showError, showLoading, removeToast } = useEditorToast();

  const { activeModal, openModal, closeModal } = useModal();

  const {
    state: { currentTool, drawWidth, drawColor },
    action: { setCurrentTool, setDrawWidth, setDrawColor },
  } = useEditor();

  // ✅ Toast notifications for sync status
  useEffect(() => {
    let loadingToastId: number | null = null;

    if (!loadingToastId) {
      loadingToastId = showLoading("Sincronizando...");
    } else if (loadingToastId) {
      removeToast(loadingToastId);
      loadingToastId = null;
    }

    return () => {
      if (loadingToastId) {
        removeToast(loadingToastId);
      }
    };
  }, [showLoading, showSuccess, removeToast]);

  // ✅ Enhanced export with modal integration
  const handleExport = useCallback(async () => {
    openModal("export");
  }, [openModal]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* ✅ Modern Toast Container */}
      <ToastContainer />

      {/* ✅ Header Component - Much cleaner */}
      <Header modalAction={() => openModal("user")} />

      {/* ✅ Main Canvas Area - Full height with proper spacing */}
      <main className="flex-1 pt-16 relative">
        <CanvasContainer />
      </main>

      {/* ✅ Enhanced ToolNavbar */}
      <ToolNavbar
        currentTool={currentTool}
        onToolChange={setCurrentTool}
        brushSize={drawWidth}
        onBrushSizeChange={setDrawWidth}
        brushColor={drawColor}
        onBrushColorChange={setDrawColor}
        onExport={handleExport}
      />
      {/* ✅ Modal Manager - Clean modal system */}
      <ModalManager activeModal={activeModal} closeModal={closeModal} />
    </div>
  );
};

export default EditorContent;
