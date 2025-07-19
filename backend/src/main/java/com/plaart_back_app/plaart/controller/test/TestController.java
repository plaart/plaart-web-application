package com.plaart_back_app.plaart.controller.test;

import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/test")
@CrossOrigin(origins = "*")
public class TestController {

    @GetMapping("/public")
    public Map<String, String> publicEndpoint() {
        return Map.of(
                "message", "Este es un endpoint público",
                "status", "success");
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public Map<String, String> userEndpoint() {
        return Map.of(
                "message", "Este endpoint requiere rol USER",
                "status", "success",
                "role", "USER");
    }

    @GetMapping("/manager")
    @PreAuthorize("hasRole('MANAGER')")
    public Map<String, String> managerEndpoint() {
        return Map.of(
                "message", "Este endpoint requiere rol MANAGER",
                "status", "success",
                "role", "MANAGER");
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, String> adminEndpoint() {
        return Map.of(
                "message", "Este endpoint requiere rol ADMIN",
                "status", "success",
                "role", "ADMIN");
    }

    @GetMapping("/manager-or-admin")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public Map<String, String> managerOrAdminEndpoint() {
        return Map.of(
                "message", "Este endpoint requiere rol MANAGER o ADMIN",
                "status", "success",
                "allowedRoles", "MANAGER, ADMIN");
    }
}
