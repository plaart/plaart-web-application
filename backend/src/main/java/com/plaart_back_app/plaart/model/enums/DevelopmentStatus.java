package com.plaart_back_app.plaart.model.enums;
/**
 *  Posibles estados de un desarrollo (Development) en el sistema Plaart.
 *  Se utiliza para controlar el ciclo de vida del desarrollo desde su creación *  hasta su posible archivo.
 */
public enum DevelopmentStatus {
    /*
     *  El desarrollo está en estado borrador.
     *  Significa que el usuario ha comenzado a trabajar en el desarrollo, pero aún no lo ha publicado.
     */
    DRAFT,
    /*
     *  El desarrollo esta siendo procesado.
     *  El sistema está generando una imagen, renderizado o aplicación
     *  inteligencia artificial sobre el desarrollo.
     */
    PROCESSING,
    /*
     *  El desarrollo ha sido procesado correctamente.
     *  El sistema está generando una imagen, renderizado o aplicación
     *  inteligencia artificial sobre el desarrollo.
     */
    COMPLETED,
    /*
     *  El desarrollo ha fallado.
     *  El sistema no pudo generar una imagen, renderizado o aplicación
     *  inteligencia artificial sobre el desarrollo.
     */
    FAILED,
    /*
     *  El desarrollo ha sido archivado.
     *  El sistema ha guardado el desarrollo, pero no está disponible para su uso.
     */
    ARCHIVED,
}
