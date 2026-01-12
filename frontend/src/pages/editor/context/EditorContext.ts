import { createContext } from "react";
import type {
  EditorAction,
  EditorState,
  ToolAction,
  ToolState,
} from "../types";

interface EditorContextType {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
  action: ToolAction;
  toolState: ToolState;
}

export const EditorContext = createContext<EditorContextType | null>(null);
