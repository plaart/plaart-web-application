package com.plaart_back_app.plaart.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Permission {

    // Definición de permisos para el rol ADMIN
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_DELETE("admin:delete"),
    ADMIN_CREATE("admin:create"),

    // Definición de permisos para el rol Gerente
    MANAGER_READ("manager:read"),
    MANAGER_UPDATE("manager:update"),
    MANAGER_DELETE("manager:delete"),
    MANAGER_CREATE("manager:create"),
    
    // Definición de permisos para el rol Usuario
    USER_READ("user:read"),
    USER_UPDATE("user:update"),
    USER_DELETE("user:delete"),
    USER_CREATE("user:create");

    private final String permission;

    @Override
    public String toString() {
        return permission;
    }
    
}
