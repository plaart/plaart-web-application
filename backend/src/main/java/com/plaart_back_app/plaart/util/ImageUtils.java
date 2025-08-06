package com.plaart_back_app.plaart.util;

import com.plaart_back_app.plaart.model.ImageContent;
import lombok.extern.slf4j.Slf4j;

import java.util.regex.Pattern;

@Slf4j
public class ImageUtils {

    private static final Pattern DATA_URL_PATTERN = Pattern
            .compile("^data:image/(png|jpeg|jpg|gif|webp|svg\\+xml);base64,");
    private static final Pattern HTTP_URL_PATTERN = Pattern.compile("^https?://");

    /**
     * Valida si una URL de imagen es válida
     */
    public static boolean isValidImageUrl(String url) {
        if (url == null || url.trim().isEmpty()) {
            return false;
        }

        String trimmedUrl = url.trim();
        return isDataUrl(trimmedUrl) || isHttpUrl(trimmedUrl);
    }

    /**
     * Verifica si es una Data URL válida
     */
    public static boolean isDataUrl(String url) {
        return url != null && DATA_URL_PATTERN.matcher(url.toLowerCase()).find();
    }

    /**
     * Verifica si es una URL HTTP/HTTPS válida
     */
    public static boolean isHttpUrl(String url) {
        return url != null && HTTP_URL_PATTERN.matcher(url.toLowerCase()).find();
    }

    /**
     * Extrae el tipo MIME de una Data URL
     */
    public static String extractMimeTypeFromDataUrl(String dataUrl) {
        if (!isDataUrl(dataUrl)) {
            return null;
        }

        try {
            String header = dataUrl.substring(5, dataUrl.indexOf(';')); // Remove "data:" and get until ";"
            return header;
        } catch (Exception e) {
            log.warn("Error extracting MIME type from data URL: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Obtiene el tamaño aproximado de una imagen en base64 (en bytes)
     */
    public static long getBase64ImageSize(String base64Data) {
        if (base64Data == null || base64Data.isEmpty()) {
            return 0;
        }

        try {
            // Si es una data URL, extraer solo la parte base64
            if (isDataUrl(base64Data)) {
                int commaIndex = base64Data.indexOf(',');
                if (commaIndex > 0 && commaIndex < base64Data.length() - 1) {
                    base64Data = base64Data.substring(commaIndex + 1);
                }
            }

            // Calcular tamaño aproximado
            return (long) (base64Data.length() * 0.75);
        } catch (Exception e) {
            log.warn("Error calculating base64 image size: {}", e.getMessage());
            return 0;
        }
    }

    /**
     * Valida que el contenido de imagen sea consistente
     */
    public static boolean isImageContentValid(ImageContent imageContent) {
        if (imageContent == null) {
            return false;
        }

        // Debe tener al menos src o image
        boolean hasSrc = imageContent.getSrc() != null && !imageContent.getSrc().trim().isEmpty();
        boolean hasImage = imageContent.getImage() != null && !imageContent.getImage().trim().isEmpty();

        if (!hasSrc && !hasImage) {
            return false;
        }

        // Validar src si está presente
        if (hasSrc && !isValidImageUrl(imageContent.getSrc())) {
            return false;
        }

        // Validar image si está presente (asumimos que es base64)
        if (hasImage && !isDataUrl(imageContent.getImage())) {
            // Si no es data URL, podría ser base64 puro, pero por seguridad lo consideramos
            // inválido
            return false;
        }

        return true;
    }

    /**
     * Crea un ImageContent para una URL externa
     */
    public static ImageContent createFromUrl(String url) {
        return ImageContent.builder()
                .src(url)
                .image(null)
                .loading(false)
                .build();
    }

    /**
     * Crea un ImageContent para datos base64
     */
    public static ImageContent createFromBase64(String base64Data) {
        return ImageContent.builder()
                .src(null)
                .image(base64Data)
                .loading(false)
                .build();
    }

    /**
     * Crea un ImageContent en estado de carga
     */
    public static ImageContent createLoading(String temporaryUrl) {
        return ImageContent.builder()
                .src(temporaryUrl)
                .image(null)
                .loading(true)
                .build();
    }
}
