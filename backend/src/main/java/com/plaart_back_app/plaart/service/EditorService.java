package com.plaart_back_app.plaart.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.plaart_back_app.plaart.dto.request.RequestEditor;
import com.plaart_back_app.plaart.dto.request.UpdateEditorInput;
import com.plaart_back_app.plaart.dto.response.EditorResponse;
import com.plaart_back_app.plaart.model.Dimension;
import com.plaart_back_app.plaart.model.Editor;
import com.plaart_back_app.plaart.model.EditorMetaData;
import com.plaart_back_app.plaart.model.EditorScreenInfo;
import com.plaart_back_app.plaart.model.EditorStats;
import com.plaart_back_app.plaart.model.enums.VisualMode;
import com.plaart_back_app.plaart.repository.EditorRepository;
import com.plaart_back_app.plaart.validator.EditorValidator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class EditorService {

    @Autowired
    private EditorRepository editorRepository;

    @Autowired
    private EditorValidator editorValidator;

    public EditorResponse createEditor(RequestEditor input) {
        log.debug("Creando nuevo editor para usuario: {} y proyecto: {}", input.getUserId(), input.getProjectId());

        try {
            // Validar entrada
            editorValidator.validateRequestEditor(input);

            // Verificar si ya existe un editor para este proyecto y usuario
            Optional<Editor> existingEditor = editorRepository.findByProjectIdAndUserId(input.getProjectId(),
                    input.getUserId());
            if (existingEditor.isPresent()) {
                log.warn("Ya existe un editor para el proyecto {} y usuario {}", input.getProjectId(),
                        input.getUserId());

                Editor editor = existingEditor.get();
                EditorStats stats = EditorStats.fromEditor(editor);

                return EditorResponse.success(editor, "CREATE_EDITOR", "Editor ya existía, se devolvió el existente")
                        .withStats(stats)
                        .withWarnings(List.of("Ya existía un editor para este proyecto y usuario"));
            }

            Editor editor = Editor.builder()
                    .objectLayers(new ArrayList<>()) // Inicializar lista vacía en lugar de null
                    .objectLayerSelected(null)
                    .userId(input.getUserId())
                    .projectId(input.getProjectId())
                    .activeDrawLine(null)
                    .editorDimension(Dimension.builder()
                            .width(800.0)
                            .height(600.0)
                            .build())
                    .screenInfo(EditorScreenInfo.builder()
                            .zoom(50)
                            .visualMode(VisualMode.NORMAL)
                            .status(true)
                            .build())
                    .editorMetadata(EditorMetaData.builder()
                            .createdAt(LocalDateTime.now())
                            .updatedAt(LocalDateTime.now())
                            .build())
                    .build();

            Editor savedEditor = editorRepository.save(editor);
            EditorStats stats = EditorStats.fromEditor(savedEditor);

            log.info("Editor creado exitosamente con ID: {} para proyecto: {}", savedEditor.getId(),
                    input.getProjectId());

            return EditorResponse.success(savedEditor, "CREATE_EDITOR", "Editor creado exitosamente")
                    .withStats(stats)
                    .withUnsavedChanges(false);

        } catch (Exception e) {
            log.error("Error al crear editor para proyecto {}: {}", input.getProjectId(), e.getMessage(), e);
            return EditorResponse.error(e.getMessage(), "CREATE_EDITOR_FAILED", "CREATE_EDITOR");
        }
    }

    public EditorResponse getEditorByProjectIdAndUserId(RequestEditor input) {
        log.debug("Obteniendo editor por ID del proyecto: {} para usuario: {}", input.getProjectId(),
                input.getUserId());

        try {
            // Validar entrada
            editorValidator.validateRequestEditor(input);

            Optional<Editor> editorOpt = editorRepository.findByProjectIdAndUserId(input.getProjectId(),
                    input.getUserId());

            if (editorOpt.isPresent()) {
                Editor editor = editorOpt.get();
                EditorStats stats = EditorStats.fromEditor(editor);
                List<String> warnings = generateWarnings(editor);

                return EditorResponse.success(editor, "GET_EDITOR", "Editor encontrado exitosamente")
                        .withStats(stats)
                        .withWarnings(warnings)
                        .withUnsavedChanges(hasRecentChanges(editor));
            } else {
                log.warn("Editor no encontrado para proyecto {} y usuario {}", input.getProjectId(), input.getUserId());
                return EditorResponse.notFound(input.getProjectId(), input.getUserId());
            }

        } catch (Exception e) {
            log.error("Error al obtener editor para proyecto {}: {}", input.getProjectId(), e.getMessage(), e);
            return EditorResponse.error(e.getMessage(), "GET_EDITOR_FAILED", "GET_EDITOR");
        }
    }

    public EditorResponse updateEditor(UpdateEditorInput input) {
        log.debug("Actualizando editor para usuario: {}, proyecto: {}", input.getUserId(), input.getProjectId());

        try {
            // Validar entrada
            editorValidator.validateUpdateEditorInput(input);

            Optional<Editor> existingEditorOpt = editorRepository.findByProjectIdAndUserId(input.getProjectId(),
                    input.getUserId());

            if (existingEditorOpt.isPresent()) {
                Editor editor = existingEditorOpt.get();
                List<String> changeLog = new ArrayList<>();

                // Actualizar campos si no son nulos
                if (input.getObjectLayers() != null) {
                    int oldLayerCount = editor.getObjectLayers() != null ? editor.getObjectLayers().size() : 0;
                    editor.setObjectLayers(input.getObjectLayers());
                    changeLog.add(String.format("Capas actualizadas: %d -> %d", oldLayerCount,
                            input.getObjectLayers().size()));
                    log.debug("Actualizadas {} capas de objetos", input.getObjectLayers().size());
                }

                if (input.getObjectLayerSelected() != null) {
                    editor.setObjectLayerSelected(input.getObjectLayerSelected());
                    changeLog.add("Capa seleccionada actualizada: ID " + input.getObjectLayerSelected().getId());
                    log.debug("Actualizada capa seleccionada con ID: {}", input.getObjectLayerSelected().getId());
                }

                if (input.getActiveDrawLine() != null) {
                    editor.setActiveDrawLine(input.getActiveDrawLine());
                    changeLog.add("Línea de dibujo activa actualizada: " + input.getActiveDrawLine().getTool());
                    log.debug("Actualizada línea de dibujo activa con herramienta: {}",
                            input.getActiveDrawLine().getTool());
                }

                if (input.getScreenInfo() != null) {
                    editor.setScreenInfo(input.getScreenInfo());
                    changeLog.add(String.format("Información de pantalla actualizada: Zoom %d%%, Modo %s",
                            input.getScreenInfo().getZoom(), input.getScreenInfo().getVisualMode()));
                    log.debug("Actualizada información de pantalla - Zoom: {}%, Modo: {}",
                            input.getScreenInfo().getZoom(), input.getScreenInfo().getVisualMode());
                }

                if (input.getEditorDimension() != null) {
                    editor.setEditorDimension(input.getEditorDimension());
                    changeLog.add(String.format("Dimensiones actualizadas: %.0fx%.0f",
                            input.getEditorDimension().getWidth(), input.getEditorDimension().getHeight()));
                    log.debug("Actualizadas dimensiones del editor: {}x{}",
                            input.getEditorDimension().getWidth(), input.getEditorDimension().getHeight());
                }

                // Actualizar metadata siempre
                if (editor.getEditorMetadata() != null) {
                    editor.getEditorMetadata().setUpdatedAt(LocalDateTime.now());
                } else {
                    editor.setEditorMetadata(EditorMetaData.builder()
                            .createdAt(LocalDateTime.now())
                            .updatedAt(LocalDateTime.now())
                            .build());
                }

                // Si viene nueva metadata en el input, actualizarla también
                if (input.getEditorMetadata() != null) {
                    input.getEditorMetadata().setUpdatedAt(LocalDateTime.now());
                    editor.setEditorMetadata(input.getEditorMetadata());
                }

                Editor savedEditor = editorRepository.save(editor);
                EditorStats stats = EditorStats.fromEditor(savedEditor);
                List<String> warnings = generateWarnings(savedEditor);

                String message = String.format("Editor actualizado exitosamente. Cambios: %s",
                        String.join(", ", changeLog));

                return EditorResponse.success(savedEditor, "UPDATE_EDITOR", message)
                        .withStats(stats)
                        .withWarnings(warnings)
                        .withUnsavedChanges(true);

            } else {
                log.warn("No se encontró editor para proyecto {} y usuario {}", input.getProjectId(),
                        input.getUserId());
                return EditorResponse.error(
                        "No se encontró un editor para actualizar",
                        "EDITOR_NOT_FOUND",
                        "UPDATE_EDITOR");
            }

        } catch (Exception e) {
            log.error("Error al actualizar editor para proyecto {}: {}", input.getProjectId(), e.getMessage(), e);
            return EditorResponse.error(e.getMessage(), "UPDATE_EDITOR_FAILED", "UPDATE_EDITOR");
        }
    }

    public Boolean existsByProjectId(String projectId) {
        log.debug("Verificando existencia de editor para proyecto: {}", projectId);
        try {
            return editorRepository.existsByProjectId(projectId);
        } catch (Exception e) {
            log.error("Error al verificar existencia de editor para proyecto {}: {}", projectId, e.getMessage(), e);
            return false;
        }
    }

    /**
     * Genera warnings basados en el estado del editor
     */
    private List<String> generateWarnings(Editor editor) {
        List<String> warnings = new ArrayList<>();

        if (editor.getObjectLayers() != null) {
            // Warning por muchas capas
            if (editor.getObjectLayers().size() > 50) {
                warnings.add("El editor tiene muchas capas (" + editor.getObjectLayers().size()
                        + "), esto puede afectar el rendimiento");
            }

            // Warning por imágenes grandes
            long totalImageSize = 0;
            int layersWithImages = 0;

            for (var layer : editor.getObjectLayers()) {
                if (layer.getHasImageContent() != null && layer.getHasImageContent() &&
                        layer.getImageContent() != null && layer.getImageContent().getImage() != null) {
                    layersWithImages++;
                    totalImageSize += estimateBase64Size(layer.getImageContent().getImage());
                }
            }

            if (totalImageSize > 50 * 1024 * 1024) { // 50MB
                warnings.add("El tamaño total de imágenes es muy grande (" + formatBytes(totalImageSize)
                        + "), considera optimizar las imágenes");
            }

            if (layersWithImages > 10) {
                warnings.add(
                        "Hay muchas capas con imágenes (" + layersWithImages + "), esto puede afectar el rendimiento");
            }
        }

        // Warning por zoom extremo
        if (editor.getScreenInfo() != null && editor.getScreenInfo().getZoom() != null) {
            if (editor.getScreenInfo().getZoom() < 20) {
                warnings.add("Nivel de zoom muy bajo (" + editor.getScreenInfo().getZoom()
                        + "%), puede ser difícil trabajar");
            } else if (editor.getScreenInfo().getZoom() > 300) {
                warnings.add("Nivel de zoom muy alto (" + editor.getScreenInfo().getZoom()
                        + "%), puede afectar el rendimiento");
            }
        }

        return warnings;
    }

    /**
     * Verifica si el editor tiene cambios recientes (últimos 5 minutos)
     */
    private boolean hasRecentChanges(Editor editor) {
        if (editor.getEditorMetadata() == null || editor.getEditorMetadata().getUpdatedAt() == null) {
            return false;
        }

        LocalDateTime fiveMinutesAgo = LocalDateTime.now().minusMinutes(5);
        return editor.getEditorMetadata().getUpdatedAt().isAfter(fiveMinutesAgo);
    }

    private long estimateBase64Size(String base64) {
        if (base64 == null || base64.isEmpty()) {
            return 0;
        }
        return (long) (base64.length() * 0.75);
    }

    private String formatBytes(long bytes) {
        if (bytes < 1024)
            return bytes + " B";
        if (bytes < 1024 * 1024)
            return String.format("%.1f KB", bytes / 1024.0);
        return String.format("%.1f MB", bytes / (1024.0 * 1024.0));
    }
}
