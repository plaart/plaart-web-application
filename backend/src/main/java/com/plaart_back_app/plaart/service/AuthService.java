package com.plaart_back_app.plaart.service;

import java.time.LocalDateTime;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.plaart_back_app.plaart.dto.request.AuthRequest;
import com.plaart_back_app.plaart.dto.request.RegisterRequest;
import com.plaart_back_app.plaart.dto.response.AuthResponse;
import com.plaart_back_app.plaart.model.User;
import com.plaart_back_app.plaart.model.enums.Role;
import com.plaart_back_app.plaart.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        // Verificar si el usuario ya existe
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Usuario ya existe con ese email");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Usuario ya existe ");
        }

        // Crear un nuevo usuario
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .enabled(true)
                .emailVerified(false)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(savedUser);
        var refreshToken = jwtService.generateRefreshToken(savedUser);

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .email(savedUser.getEmail())
                .username(savedUser.getUsername())
                .role(savedUser.getRole().name())
                .build();
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualizar el último login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .email(user.getEmail())
                .username(user.getUsername())
                .role(user.getRole().name())
                .build();
    }

    public AuthResponse refreshToken(String refreshToken) {
        final String username = jwtService.extractUsername(refreshToken);

        if (username != null) {
            var user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                return AuthResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .email(user.getEmail())
                        .username(user.getUsername())
                        .role(user.getRole().name())
                        .build();
            }
        }
        throw new RuntimeException("Token de actualización inválido");
    }
}
