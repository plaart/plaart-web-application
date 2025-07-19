package com.plaart_back_app.plaart.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    
    @NotBlank(message = "Username is required")
    @JsonProperty("username")
    private String username;
    
    @NotBlank(message = "Password is required")
    @JsonProperty("password")
    private String password;
}
