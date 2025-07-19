package com.plaart_back_app.plaart.controller.user;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.plaart_back_app.plaart.dto.request.UpdateUserRequest;
import com.plaart_back_app.plaart.dto.response.UserProfileResponse;
import com.plaart_back_app.plaart.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Permite solicitudes desde cualquier origen
class AdminController {

    private final UserService userService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserProfileResponse>> getAllUsers() {
        List<UserProfileResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserProfileResponse> getUserById(@PathVariable String userId) {
        UserProfileResponse user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserProfileResponse> updateUser(
            @PathVariable String userId,
            @Valid @RequestBody UpdateUserRequest request) {
        UserProfileResponse updatedUser = userService.updateUserById(userId, request);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        userService.deleteUserById(userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{userId}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserProfileResponse> updateUserRole(
            @PathVariable String userId,
            @RequestParam String role) {
        UserProfileResponse updatedUser = userService.updateUserRole(userId, role);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/users/{userId}/enable")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserProfileResponse> enableUser(@PathVariable String userId) {
        UserProfileResponse updatedUser = userService.enableUser(userId);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/users/{userId}/disable")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserProfileResponse> disableUser(@PathVariable String userId) {
        UserProfileResponse updatedUser = userService.disableUser(userId);
        return ResponseEntity.ok(updatedUser);
    }
}
