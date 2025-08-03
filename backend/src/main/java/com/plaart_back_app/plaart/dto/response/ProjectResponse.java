package com.plaart_back_app.plaart.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.plaart_back_app.plaart.model.Project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectResponse {
    private boolean success;
    private String message;
    private Project project;
    private List<Project> projects;
    // Metadatos adicionales
    private String userId;
    private Integer count;
}
