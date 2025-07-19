package com.plaart_back_app.plaart.controller.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plaart_back_app.plaart.dto.request.AuthRequest;
import com.plaart_back_app.plaart.dto.request.RegisterRequest;
import com.plaart_back_app.plaart.dto.response.AuthResponse;
import com.plaart_back_app.plaart.dto.response.RefreshTokenRequest;
import com.plaart_back_app.plaart.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("${api.prefix}/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*") // Permite solicitudes desde cualquier origen
public class AuthController {
    private final AuthService authService;

    // Aquí puedes agregar más endpoints relacionados con la autenticación, como
    // login, logout, etc.
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        try {

            AuthResponse authResponse = authService.register(registerRequest);
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        try {
            log.info("Login attempt for user: {}", authRequest.getUsername());
            AuthResponse authResponse = authService.authenticate(authRequest);

            if (authResponse == null) {
                log.error("AuthService.authenticate returned null for user: {}", authRequest.getUsername());
                return ResponseEntity.badRequest().build();
            }

            log.info("Login successful for user: {}", authRequest.getUsername());
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            log.error("Error in login for user '{}': {}", authRequest.getUsername(), e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        try {
            AuthResponse authResponse = authService.refreshToken(refreshTokenRequest.getRefreshToken());
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/me")
    public ResponseEntity<Object> getCurrentUser() {
        return ResponseEntity.ok().body("{\"message\": \"Token válido\", \"authenticated\": true}");
    }

}
