package com.plaart_back_app.plaart.validator;

import org.springframework.stereotype.Component;

import com.plaart_back_app.plaart.dto.request.RequestEditor;
import com.plaart_back_app.plaart.dto.request.UpdateEditorInput;
import com.plaart_back_app.plaart.exception.EditorException;
import com.plaart_back_app.plaart.util.ImageUtils;

@Component
public class EditorValidator {
    public void validateRequestEditor(RequestEditor input) {
        if (input == null) {
            throw new EditorException("El input no puede ser nulo");
        }

        if (input.getProjectId() == null || input.getProjectId().trim().isEmpty()) {
            throw new EditorException("El ID del proyecto es obligatorio");
        }

        if (input.getUserId() == null || input.getUserId().trim().isEmpty()) {
            throw new EditorException("El ID del usuario es obligatorio");
        }
    }

    public void validateUpdateEditorInput(UpdateEditorInput input) {
        if (input == null) {
            throw new EditorException("El input de actualización no puede ser nulo");
        }

        if (input.getProjectId() == null || input.getProjectId().trim().isEmpty()) {
            throw new EditorException("El ID del proyecto es obligatorio");
        }

        if (input.getUserId() == null || input.getUserId().trim().isEmpty()) {
            throw new EditorException("El ID del usuario es obligatorio");
        }

        // Validar dimensiones del editor si están presentes
        if (input.getEditorDimension() != null) {
            if (input.getEditorDimension().getWidth() != null && input.getEditorDimension().getWidth() <= 0) {
                throw new EditorException("El ancho del editor debe ser mayor que 0");
            }
            if (input.getEditorDimension().getHeight() != null && input.getEditorDimension().getHeight() <= 0) {
                throw new EditorException("La altura del editor debe ser mayor que 0");
            }
        }

        // Validar información de pantalla si está presente
        if (input.getScreenInfo() != null && input.getScreenInfo().getZoom() != null) {
            if (input.getScreenInfo().getZoom() < 10 || input.getScreenInfo().getZoom() > 500) {
                throw new EditorException("El zoom debe estar entre 10% y 500%");
            }
        }

        // Validar capas de objetos si están presentes
        if (input.getObjectLayers() != null) {
            for (int i = 0; i < input.getObjectLayers().size(); i++) {
                validateObjectLayer(input.getObjectLayers().get(i), i);
            }
        }

        // Validar capa seleccionada si está presente
        if (input.getObjectLayerSelected() != null) {
            validateObjectLayer(input.getObjectLayerSelected(), -1);
        }
    }

    private void validateObjectLayer(com.plaart_back_app.plaart.model.EditorObjectLayer layer, int index) {
        String layerDesc = index >= 0 ? "capa " + index : "capa seleccionada";

        // Validar consistencia de contenido de imagen
        if (layer.getHasImageContent() != null && layer.getHasImageContent()) {
            if (layer.getImageContent() == null) {
                throw new EditorException(
                        "La " + layerDesc + " indica tener contenido de imagen pero no se proporcionó ImageContent");
            }

            validateImageContent(layer.getImageContent(), layerDesc);
        } else if (layer.getHasImageContent() != null && !layer.getHasImageContent()
                && layer.getImageContent() != null) {
            throw new EditorException(
                    "La " + layerDesc + " indica no tener contenido de imagen pero se proporcionó ImageContent");
        }

        // Validar transformaciones si están presentes
        if (layer.getTransform() != null) {
            validateTransform(layer.getTransform(), layerDesc);
        }
    }

    private void validateImageContent(com.plaart_back_app.plaart.model.ImageContent imageContent, String layerDesc) {
        // Usar ImageUtils para validación
        if (!ImageUtils.isImageContentValid(imageContent)) {
            throw new EditorException("El contenido de imagen de la " + layerDesc + " no es válido");
        }

        // Validaciones adicionales de tamaño si es base64
        if (imageContent.getImage() != null && !imageContent.getImage().trim().isEmpty()) {
            long imageSize = ImageUtils.getBase64ImageSize(imageContent.getImage());
            // Límite de 10MB para imágenes base64
            if (imageSize > 10 * 1024 * 1024) {
                throw new EditorException("La imagen de la " + layerDesc + " es demasiado grande (máximo 10MB)");
            }
        }
    }

    private void validateTransform(com.plaart_back_app.plaart.model.Transform transform, String layerDesc) {
        // Validar que las dimensiones sean positivas si están definidas
        if (transform.getWidth() != null && transform.getWidth() <= 0) {
            throw new EditorException("El ancho de la " + layerDesc + " debe ser mayor que 0");
        }
        if (transform.getHeight() != null && transform.getHeight() <= 0) {
            throw new EditorException("La altura de la " + layerDesc + " debe ser mayor que 0");
        }
        if (transform.getRadius() != null && transform.getRadius() < 0) {
            throw new EditorException("El radio de la " + layerDesc + " no puede ser negativo");
        }

        // Validar escalas
        if (transform.getScaleX() != null && transform.getScaleX() <= 0) {
            throw new EditorException("La escala X de la " + layerDesc + " debe ser mayor que 0");
        }
        if (transform.getScaleY() != null && transform.getScaleY() <= 0) {
            throw new EditorException("La escala Y de la " + layerDesc + " debe ser mayor que 0");
        }
    }
}
