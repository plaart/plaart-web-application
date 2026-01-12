package com.plaart_back_app.plaart.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.plaart_back_app.plaart.model.Editor;
import com.plaart_back_app.plaart.model.EditorStats;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EditorResponse {
    // Estado de la operación
    private boolean success;
    private String message;
    private String errorCode;

    // Datos del editor
    private Editor editor;

    // Metadatos de la respuesta
    private LocalDateTime timestamp;
    private String operation;
    private Long executionTimeMs;

    // Información adicional útil para el front-end
    private EditorStats stats;
    private List<String> warnings;
    private boolean hasUnsavedChanges;

    // Métodos de conveniencia para crear respuestas
    public static EditorResponse success(Editor editor, String operation, String message) {
        return EditorResponse.builder()
                .success(true)
                .message(message)
                .editor(editor)
                .timestamp(LocalDateTime.now())
                .operation(operation)
                .build();
    }

    public static EditorResponse success(Editor editor, String operation) {
        return success(editor, operation, "Operación completada exitosamente");
    }

    public static EditorResponse error(String message, String errorCode, String operation) {
        return EditorResponse.builder()
                .success(false)
                .message(message)
                .errorCode(errorCode)
                .timestamp(LocalDateTime.now())
                .operation(operation)
                .build();
    }

    public static EditorResponse notFound(String projectId, String userId) {
        return EditorResponse.builder()
                .success(false)
                .message("Editor no encontrado para el proyecto " + projectId + " y usuario " + userId)
                .errorCode("EDITOR_NOT_FOUND")
                .timestamp(LocalDateTime.now())
                .operation("GET_EDITOR")
                .build();
    }

    // Métodos para agregar información adicional
    public EditorResponse withStats(EditorStats stats) {
        this.stats = stats;
        return this;
    }

    public EditorResponse withWarnings(List<String> warnings) {
        this.warnings = warnings;
        return this;
    }

    public EditorResponse withExecutionTime(Long executionTimeMs) {
        this.executionTimeMs = executionTimeMs;
        return this;
    }

    public EditorResponse withUnsavedChanges(boolean hasUnsavedChanges) {
        this.hasUnsavedChanges = hasUnsavedChanges;
        return this;
    }
}
