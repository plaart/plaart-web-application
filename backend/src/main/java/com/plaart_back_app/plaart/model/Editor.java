package com.plaart_back_app.plaart.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "project_editor")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Editor {
    @Id
    private String id;
    @Field("layers")
    private List<EditorObjectLayer> objectLayers;
    private EditorObjectLayer objectLayerSelected;
    private String userId;
    private String projectId;
    private DrawLine activeDrawLine;
    private Dimension editorDimension;
    @Transient
    @JsonIgnore
    private List<HistoryEntry> history;
    @Transient
    @JsonIgnore
    private Integer historyPosition;
    private EditorScreenInfo screenInfo;
    private EditorMetaData editorMetadata;
}
