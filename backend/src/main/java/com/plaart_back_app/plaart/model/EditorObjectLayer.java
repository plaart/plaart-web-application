package com.plaart_back_app.plaart.model;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class EditorObjectLayer {
    @Id
    private Long id;
    private Transform transform;
    private State state;
    private Style style;
    private DrawLine drawLine;
    private Boolean hasImageContent;
    private ImageContent imageContent;
    private EditorMetaData objectMetadata;
}
