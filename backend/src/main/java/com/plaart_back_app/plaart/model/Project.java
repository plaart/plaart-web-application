package com.plaart_back_app.plaart.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Document(collection = "projects")
public class Project {
    // Project metadata
    @Id
    private String id;
    // Project details
    @Indexed(unique = true)
    private String name;
    private String description;
    private String userId;

    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Configuration
    private boolean isPublic;
    private List<String> tags;
    private String category;
    private boolean isArchived;

    // Project settings
    private ProjectSettings settings;
}
