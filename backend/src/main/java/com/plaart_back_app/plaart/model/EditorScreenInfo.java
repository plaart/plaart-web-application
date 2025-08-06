package com.plaart_back_app.plaart.model;

import com.plaart_back_app.plaart.model.enums.VisualMode;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EditorScreenInfo {
    private Integer zoom;
    private VisualMode visualMode;
    private boolean status;
}
