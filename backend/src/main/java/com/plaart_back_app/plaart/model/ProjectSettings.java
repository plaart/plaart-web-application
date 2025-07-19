package com.plaart_back_app.plaart.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectSettings {
    private boolean notificationsEnabled;
    private boolean autoSaveEnabled;
    private String defaultView; // e.g., "grid", "list"
    private boolean enableVersioning;
    private String theme;
    private String language;
}
