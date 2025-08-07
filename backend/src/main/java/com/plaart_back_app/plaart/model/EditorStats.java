package com.plaart_back_app.plaart.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EditorStats {
    private Integer totalLayers;
    private Integer visibleLayers;
    private Integer layersWithImages;
    private Integer layersWithDrawing;

    // Estadísticas de contenido
    private Long totalImageSize;
    private Integer totalDrawingPoints;

    // Estadísticas de uso
    private Integer zoomLevel;
    private String visualMode;

    // Estadísticas de rendimiento
    private Boolean hasComplexLayers;
    private Double averageLayerComplexity;

    // Métodos de utilidad para crear stats desde un Editor
    public static EditorStats fromEditor(com.plaart_back_app.plaart.model.Editor editor) {
        if (editor == null) {
            return EditorStats.builder().build();
        }

        EditorStatsBuilder builder = EditorStats.builder();

        // Estadísticas básicas
        if (editor.getObjectLayers() != null) {
            builder.totalLayers(editor.getObjectLayers().size());

            int visibleCount = 0;
            int imagesCount = 0;
            int drawingCount = 0;
            long totalImageSize = 0;
            int totalPoints = 0;
            double totalComplexity = 0;

            for (var layer : editor.getObjectLayers()) {
                // Contar capas visibles
                if (layer.getState() != null &&
                        layer.getState().getIsVisible() != null &&
                        layer.getState().getIsVisible()) {
                    visibleCount++;
                }

                // Contar capas con imágenes
                if (layer.getHasImageContent() != null && layer.getHasImageContent()) {
                    imagesCount++;

                    // Calcular tamaño de imagen si existe
                    if (layer.getImageContent() != null && layer.getImageContent().getImage() != null) {
                        totalImageSize += estimateBase64Size(layer.getImageContent().getImage());
                    }
                }

                // Contar capas con dibujo
                if (layer.getDrawLine() != null &&
                        layer.getDrawLine().getLines() != null &&
                        !layer.getDrawLine().getLines().isEmpty()) {
                    drawingCount++;
                    totalPoints += layer.getDrawLine().getLines().size();
                }

                // Calcular complejidad de la capa
                totalComplexity += calculateLayerComplexity(layer);
            }

            builder.visibleLayers(visibleCount)
                    .layersWithImages(imagesCount)
                    .layersWithDrawing(drawingCount)
                    .totalImageSize(totalImageSize)
                    .totalDrawingPoints(totalPoints)
                    .averageLayerComplexity(
                            editor.getObjectLayers().size() > 0 ? totalComplexity / editor.getObjectLayers().size()
                                    : 0.0)
                    .hasComplexLayers(totalComplexity > editor.getObjectLayers().size() * 2.0);
        } else {
            builder.totalLayers(0)
                    .visibleLayers(0)
                    .layersWithImages(0)
                    .layersWithDrawing(0)
                    .totalImageSize(0L)
                    .totalDrawingPoints(0)
                    .averageLayerComplexity(0.0)
                    .hasComplexLayers(false);
        }

        // Información de pantalla
        if (editor.getScreenInfo() != null) {
            builder.zoomLevel(editor.getScreenInfo().getZoom())
                    .visualMode(editor.getScreenInfo().getVisualMode() != null
                            ? editor.getScreenInfo().getVisualMode().toString()
                            : "NORMAL");
        }

        return builder.build();
    }

    private static long estimateBase64Size(String base64) {
        if (base64 == null || base64.isEmpty()) {
            return 0;
        }
        // Estimación aproximada: cada 4 caracteres base64 = 3 bytes
        return (long) (base64.length() * 0.75);
    }

    private static double calculateLayerComplexity(com.plaart_back_app.plaart.model.EditorObjectLayer layer) {
        double complexity = 1.0; // Base complexity

        // Aumentar complejidad por imagen
        if (layer.getHasImageContent() != null && layer.getHasImageContent()) {
            complexity += 1.0;
        }

        // Aumentar complejidad por dibujo
        if (layer.getDrawLine() != null && layer.getDrawLine().getLines() != null) {
            // Más puntos = mayor complejidad
            complexity += Math.min(layer.getDrawLine().getLines().size() / 100.0, 2.0);
        }

        // Aumentar complejidad por transformaciones
        if (layer.getTransform() != null) {
            if (layer.getTransform().getRotation() != null && layer.getTransform().getRotation() != 0) {
                complexity += 0.5;
            }
            if (layer.getTransform().getScaleX() != null && !layer.getTransform().getScaleX().equals(1.0)) {
                complexity += 0.3;
            }
            if (layer.getTransform().getScaleY() != null && !layer.getTransform().getScaleY().equals(1.0)) {
                complexity += 0.3;
            }
        }

        return complexity;
    }
}
