import type { ToolType } from "./editor.enums";
import type { Editor, EditorObjectLayer } from "./editor.interface";
import type { CanvasSettings } from "./editor.ui";

export interface EditorState {
  serverEditor: Editor | null;
  pendingChanges: Map<string, EditorObjectLayer>;
  selectedLayerId: string | null;
  currentTool: ToolType;
  canvasSettings: CanvasSettings;
  isSyncing: boolean;
  hasUnsavedChanges: boolean;
  lastSyncTimestamp: number;
}

export type EditorAction =
  | { type: "LOAD_EDITOR"; payload: Editor }
  | { type: "ADD_LAYER"; payload: EditorObjectLayer }
  | {
      type: "UPDATE_LAYER";
      payload: { id: string; changes: Partial<EditorObjectLayer> };
    }
  | { type: "DELETE_LAYER"; payload: string }
  | { type: "SELECT_LAYER"; payload: string | null }
  | { type: "SET_TOOL"; payload: ToolType }
  | { type: "SET_ZOOM"; payload: number }
  | { type: "SYNC_STARTED" }
  | { type: "SYNC_COMPLETED"; payload: Editor }
  | { type: "SYNC_FAILED"; payload: string }
  | { type: "CLEAR_PENDING_CHANGES" };
