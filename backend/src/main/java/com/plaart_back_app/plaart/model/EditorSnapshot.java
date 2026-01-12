package com.plaart_back_app.plaart.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EditorSnapshot {
    private List<EditorObjectLayer> objectLayers;
    private EditorObjectLayer objectLayerSelected;
    private String userId;
    private String projectId;
    private DrawLine activeDrawLine;
    private Dimension editorDimension;
    private EditorScreenInfo screenInfo;
    private EditorMetaData editorMetadata;

    public static EditorSnapshot fromState(Editor editor) {
        return EditorSnapshot.builder()
                .objectLayers(deepCopyObjectLayers(editor.getObjectLayers()))
                .objectLayerSelected(deepCopyObjectLayer(editor.getObjectLayerSelected()))
                .userId(editor.getUserId())
                .projectId(editor.getProjectId())
                .activeDrawLine(editor.getActiveDrawLine())
                .editorDimension(editor.getEditorDimension())
                .screenInfo(editor.getScreenInfo())
                .editorMetadata(editor.getEditorMetadata())
                .build();
    }

    /**
     * Crea una copia profunda de la lista de capas de objetos para evitar
     * referencias compartidas
     */
    private static List<EditorObjectLayer> deepCopyObjectLayers(List<EditorObjectLayer> originalLayers) {
        if (originalLayers == null) {
            return null;
        }

        List<EditorObjectLayer> copiedLayers = new ArrayList<>();
        for (EditorObjectLayer layer : originalLayers) {
            copiedLayers.add(deepCopyObjectLayer(layer));
        }
        return copiedLayers;
    }

    /**
     * Crea una copia profunda de una capa de objeto individual
     */
    private static EditorObjectLayer deepCopyObjectLayer(EditorObjectLayer original) {
        if (original == null) {
            return null;
        }

        EditorObjectLayer copy = new EditorObjectLayer();
        copy.setId(original.getId());
        copy.setTransform(original.getTransform());
        copy.setState(original.getState());
        copy.setStyle(original.getStyle());
        copy.setDrawLine(original.getDrawLine());
        copy.setHasImageContent(original.getHasImageContent());
        copy.setImageContent(deepCopyImageContent(original.getImageContent()));
        copy.setObjectMetadata(original.getObjectMetadata());

        return copy;
    }

    /**
     * Crea una copia profunda del contenido de imagen
     */
    private static ImageContent deepCopyImageContent(ImageContent original) {
        if (original == null) {
            return null;
        }

        return ImageContent.builder()
                .image(original.getImage())
                .src(original.getSrc())
                .loading(original.isLoading())
                .build();
    }

    /**
     * Crea un snapshot básico sin copias profundas (más eficiente para casos
     * simples)
     */
    public static EditorSnapshot fromStateShallow(Editor editor) {
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
