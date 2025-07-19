package com.plaart_back_app.plaart.config;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.plaart_back_app.plaart.model.User;
import com.plaart_back_app.plaart.model.enums.Role;
import com.plaart_back_app.plaart.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Cargando datos iniciales...");
        createDefaultUsers();
    }

    private void createDefaultUsers() {
        try {
            if (userRepository.findByEmail("admin@example.com").isEmpty()) {
                User admin = User.builder()
                        .email("admin@example.com")
                        .username("admin")
                        .password(passwordEncoder.encode("admin123"))
                        .firstName("Admin")
                        .lastName("System")
                        .role(Role.ADMIN)
                        .enabled(true)
                        .emailVerified(true)
                        .accountNonExpired(true)
                        .accountNonLocked(true)
                        .credentialsNonExpired(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

                userRepository.save(admin);
                log.info("Usuario administrador creado: admin@example.com / admin123");
            } else {
                log.info("Usuario administrador ya existe, no se volvió a crear.");
            }
        } catch (Exception e) {
            log.error("Error creando usuario admin: {}", e.getMessage());
        }
    }

}

/**
 * // Crear usuario manager
 * try {
 * User manager = User.builder()
 * .email("manager@example.com")
 * .username("manager")
 * .password(passwordEncoder.encode("manager123"))
 * .firstName("Manager")
 * .lastName("User")
 * .role(Role.MANAGER)
 * .enabled(true)
 * .emailVerified(true)
 * .accountNonExpired(true)
 * .accountNonLocked(true)
 * .credentialsNonExpired(true)
 * .createdAt(LocalDateTime.now())
 * .updatedAt(LocalDateTime.now())
 * .build();
 * 
 * userRepository.save(manager);
 * log.info("Usuario manager creado: manager@example.com / manager123");
 * } catch (Exception e) {
 * log.error("Error creando usuario manager: {}", e.getMessage());
 * }
 * 
 * // Crear usuario regular
 * try {
 * User user = User.builder()
 * .email("user@example.com")
 * .username("user")
 * .password(passwordEncoder.encode("user123"))
 * .firstName("Regular")
 * .lastName("User")
 * .role(Role.USER)
 * .enabled(true)
 * .emailVerified(true)
 * .accountNonExpired(true)
 * .accountNonLocked(true)
 * .credentialsNonExpired(true)
 * .createdAt(LocalDateTime.now())
 * .updatedAt(LocalDateTime.now())
 * .build();
 * 
 * userRepository.save(user);
 * log.info("Usuario regular creado: user@example.com / user123");
 * } catch (Exception e) {
 * log.error("Error creando usuario regular: {}", e.getMessage());
 * }
 * 
 */
