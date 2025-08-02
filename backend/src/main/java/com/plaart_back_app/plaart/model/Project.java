package com.plaart_back_app.plaart.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "projects")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    // Project metadata
    @Id
    private String id;
    // Project details
    @Indexed(unique = true)
    private String name;
    private String description;
    @Indexed
    private String userId;
    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
