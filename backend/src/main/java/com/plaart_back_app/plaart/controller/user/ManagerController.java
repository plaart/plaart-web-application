package com.plaart_back_app.plaart.controller.user;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.plaart_back_app.plaart.dto.response.UserProfileResponse;
import com.plaart_back_app.plaart.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/manager")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Permite solicitudes desde cualquier origen
class ManagerController {

    private final UserService userService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('MANAGER', 'ADMIN')")
    public ResponseEntity<List<UserProfileResponse>> getAllUsers() {
        List<UserProfileResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasRole('MANAGER', 'ADMIN')")
    public ResponseEntity<UserProfileResponse> getUserById(@PathVariable String userId) {
        UserProfileResponse user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }
}
