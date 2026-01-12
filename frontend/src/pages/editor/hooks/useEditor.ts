import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor debe usarse dentro de un EditorProvider");
  }
  return context;
};
