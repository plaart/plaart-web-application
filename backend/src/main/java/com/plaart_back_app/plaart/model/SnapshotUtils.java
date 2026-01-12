package com.plaart_back_app.plaart.model;

public class SnapshotUtils {
    public static EditorSnapshot fromState(Editor editor) {
        return EditorSnapshot.builder()
                .objectLayers(editor.getObjectLayers())
                .objectLayerSelected(editor.getObjectLayerSelected())
                .userId(editor.getUserId())
                .projectId(editor.getProjectId())
                .activeDrawLine(editor.getActiveDrawLine())
                .editorDimension(editor.getEditorDimension())
                .screenInfo(editor.getScreenInfo())
                .editorMetadata(editor.getEditorMetadata())
                .build();
    }
}
