package com.plaart_back_app.plaart.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.plaart_back_app.plaart.dto.request.UpdateUserRequest;
import com.plaart_back_app.plaart.dto.response.UserProfileResponse;
import com.plaart_back_app.plaart.model.User;
import com.plaart_back_app.plaart.model.enums.Role;
import com.plaart_back_app.plaart.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserProfileResponse getUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return convertToUserProfileResponse(user);
    }

    public UserProfileResponse updateUserProfile(String username, UpdateUserRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualizar campos
        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getUsername() != null) {
            // Verificar que el username no esté en uso por otro usuario
            if (userRepository.existsByUsername(request.getUsername()) &&
                    !user.getUsername().equals(request.getUsername())) {
                throw new RuntimeException("El username ya está en uso");
            }
            user.setUsername(request.getUsername());
        }
        if (request.getAvatar() != null) {
            user.setAvatar(request.getAvatar());
        }
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        user.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(user);
        return convertToUserProfileResponse(updatedUser);
    }

    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        userRepository.delete(user);
    }

    public List<UserProfileResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToUserProfileResponse)
                .collect(Collectors.toList());
    }

    public UserProfileResponse getUserById(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return convertToUserProfileResponse(user);
    }

    public UserProfileResponse updateUserById(String userId, UpdateUserRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualizar campos
        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getUsername() != null) {
            // Verificar que el username no esté en uso por otro usuario
            if (userRepository.existsByUsername(request.getUsername()) &&
                    !user.getUsername().equals(request.getUsername())) {
                throw new RuntimeException("El username ya está en uso");
            }
            user.setUsername(request.getUsername());
        }
        if (request.getAvatar() != null) {
            user.setAvatar(request.getAvatar());
        }
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        user.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(user);
        return convertToUserProfileResponse(updatedUser);
    }

    public void deleteUserById(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        userRepository.delete(user);
    }

    public UserProfileResponse updateUserRole(String userId, String roleString) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        try {
            Role role = Role.valueOf(roleString.toUpperCase());
            user.setRole(role);
            user.setUpdatedAt(LocalDateTime.now());
            User updatedUser = userRepository.save(user);
            return convertToUserProfileResponse(updatedUser);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Role inválido: " + roleString);
        }
    }

    public UserProfileResponse enableUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setEnabled(true);
        user.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(user);
        return convertToUserProfileResponse(updatedUser);
    }

    public UserProfileResponse disableUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setEnabled(false);
        user.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(user);
        return convertToUserProfileResponse(updatedUser);
    }

    private UserProfileResponse convertToUserProfileResponse(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatar(user.getAvatar())
                .role(user.getRole().name())
                .enabled(user.isEnabled())
                .emailVerified(user.isEmailVerified())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .lastLoginAt(user.getLastLogin())
                .build();
    }
}
