/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useReducer } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/client";
import { EditorContext } from "../context/EditorContext";
import { editorReducer, initialState } from "../reducer/editorReducer";
import useHandlerToolActions from "../hooks/editor/use-handlers";
import type { ToolState } from "../types";

interface EditorProviderProps {
  children: React.ReactNode;
}

// Componente interno que usa los hooks dentro del ApolloProvider
const EditorProviderContext = ({ children }: EditorProviderProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const action = useHandlerToolActions({ dispatch });

  // Tool state that matches ToolState interface
  const toolState: ToolState = {
    lines: state.lines,
    aiPointsSelection: state.aiPointsSelection,
    annotationsToDraw: state.annotationsToDraw,
    selectedShapeDrawId: state.selectedShapeDrawId,
    drawColor: state.drawColor,
    drawWidth: state.drawWidth,
    currentTool: state.currentTool,
  };

  // Crear el valor del contexto con todos los datos del editor
  const contextValue = {
    state,
    dispatch,
    action,
    toolState,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <EditorProviderContext>{children}</EditorProviderContext>
    </ApolloProvider>
  );
};
