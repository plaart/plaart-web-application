package com.plaart_back_app.plaart.dto.request;

import java.util.List;

import com.plaart_back_app.plaart.model.Dimension;
import com.plaart_back_app.plaart.model.DrawLine;
import com.plaart_back_app.plaart.model.EditorMetaData;
import com.plaart_back_app.plaart.model.EditorObjectLayer;
import com.plaart_back_app.plaart.model.EditorScreenInfo;

import lombok.Data;

@Data
public class UpdateEditorInput {
    private List<EditorObjectLayer> objectLayers;
    private EditorObjectLayer objectLayerSelected;
    private String userId;
    private String projectId;
    private DrawLine activeDrawLine;
    private Dimension editorDimension;
    private EditorScreenInfo screenInfo;
    private EditorMetaData editorMetadata;
}
