package com.plaart_back_app.plaart.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
    private String firstName;
    private String lastName;

    @Size(min = 3, max = 20, message = "El username debe tener entre 3 y 20 caracteres")
    private String username;
    private String avatar;

    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;
}
