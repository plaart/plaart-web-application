package com.plaart_back_app.plaart.controller.editor;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.plaart_back_app.plaart.dto.request.RequestEditor;
import com.plaart_back_app.plaart.dto.request.UpdateEditorInput;
import com.plaart_back_app.plaart.dto.response.EditorResponse;
import com.plaart_back_app.plaart.service.EditorService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class EditorController {
    private final EditorService editorService;

    @MutationMapping
    public EditorResponse createEditor(@Argument RequestEditor input) {
        log.info("GraphQL mutation: createEditor para proyecto {} y usuario {}", input.getProjectId(),
                input.getUserId());
        long startTime = System.currentTimeMillis();

        try {
            EditorResponse response = editorService.createEditor(input);
            return response.withExecutionTime(System.currentTimeMillis() - startTime);
        } catch (Exception e) {
            log.error("Error creating editor: {}", e.getMessage(), e);
            return EditorResponse.error(
                    "Error al crear el editor: " + e.getMessage(),
                    "CREATE_EDITOR_ERROR",
                    "CREATE_EDITOR").withExecutionTime(System.currentTimeMillis() - startTime);
        }
    }

    @QueryMapping
    public EditorResponse getEditor(@Argument RequestEditor input) {
        log.info("GraphQL query: getEditor para proyecto {} y usuario {}", input.getProjectId(), input.getUserId());
        long startTime = System.currentTimeMillis();

        try {
            EditorResponse response = editorService.getEditorByProjectIdAndUserId(input);
            return response.withExecutionTime(System.currentTimeMillis() - startTime);
        } catch (Exception e) {
            log.error("Error getting editor: {}", e.getMessage(), e);
            return EditorResponse.error(
                    "Error al obtener el editor: " + e.getMessage(),
                    "GET_EDITOR_ERROR",
                    "GET_EDITOR").withExecutionTime(System.currentTimeMillis() - startTime);
        }
    }

    @MutationMapping
    public EditorResponse updateEditor(@Argument UpdateEditorInput input) {
        log.info("GraphQL mutation: updateEditor para proyecto {} y usuario {}", input.getProjectId(),
                input.getUserId());
        long startTime = System.currentTimeMillis();

        try {
            EditorResponse response = editorService.updateEditor(input);
            return response.withExecutionTime(System.currentTimeMillis() - startTime);
        } catch (Exception e) {
            log.error("Error updating editor: {}", e.getMessage(), e);
            return EditorResponse.error(
                    "Error al actualizar el editor: " + e.getMessage(),
                    "UPDATE_EDITOR_ERROR",
                    "UPDATE_EDITOR").withExecutionTime(System.currentTimeMillis() - startTime);
        }
    }

    @QueryMapping
    public Boolean editorExists(@Argument String projectId) {
        log.info("GraphQL query: editorExists para proyecto {}", projectId);

        try {
            return editorService.existsByProjectId(projectId);
        } catch (Exception e) {
            log.error("Error checking editor existence: {}", e.getMessage(), e);
            return false;
        }
    }
}
