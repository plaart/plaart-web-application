package com.plaart_back_app.plaart.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plaart_back_app.plaart.dto.request.UpdateUserRequest;
import com.plaart_back_app.plaart.dto.response.UserProfileResponse;
import com.plaart_back_app.plaart.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("${api.prefix}/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Permite solicitudes desde cualquier origen
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    @PreAuthorize("hasAnyRole('USER', 'MANAGER', 'ADMIN')")
    public ResponseEntity<UserProfileResponse> getUserProfile(Authentication authentication) {
        UserProfileResponse userProfileResponse = userService.getUserProfile(authentication.getName());
        return ResponseEntity.ok(userProfileResponse);
    }

    @PutMapping("/profile")
    @PreAuthorize("hasAnyRole('USER', 'MANAGER', 'ADMIN')")
    public ResponseEntity<UserProfileResponse> updateUserProfile(@Valid @RequestBody UpdateUserRequest request,
            Authentication authentication) {

        UserProfileResponse updatedProfile = userService.updateUserProfile(authentication.getName(), request);
        return ResponseEntity.ok(updatedProfile);
    }

    @DeleteMapping("/profile")
    @PreAuthorize("hasAnyRole('USER', 'MANAGER', 'ADMIN')")
    public ResponseEntity<Void> deleteUserProfile(Authentication authentication) {
        userService.deleteUser(authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
