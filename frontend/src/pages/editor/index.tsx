import { useParams } from "react-router-dom";
import { EditorProvider } from "./provider/EditorProvider";
import EditorContent from "./Content";
import { useAuth } from "../../hooks/useAuth";
import "./editor.css";
import "./editor-enhanced.css";

const Editor = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();

  if (!projectId || !user?.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">❌</span>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Parámetros inválidos
            </h3>
            <p className="text-gray-600">
              No se pudo acceder al editor. Verifica que el enlace sea correcto.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <EditorProvider projectId={projectId} userId={user.id}>
      <EditorContent />
    </EditorProvider>
  );
};

export default Editor;