package com.plaart_back_app.plaart.controller.project;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.plaart_back_app.plaart.dto.request.ProjectRequest;
import com.plaart_back_app.plaart.dto.response.ProjectResponse;
import com.plaart_back_app.plaart.model.Project;
import com.plaart_back_app.plaart.service.ProjectService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("${api.prefix}/projects")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<ProjectResponse> getAllProjects(@RequestParam String userId) {
        try {
            log.info("Obteniendo todos los proyectos para usuario: {}", userId);
            List<Project> projects = projectService.getAllProjectsByUser(userId);

            ProjectResponse response = ProjectResponse.builder()
                    .success(true)
                    .message("Proyectos obtenidos exitosamente")
                    .projects(projects)
                    .count(projects.size())
                    .userId(userId)
                    .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error al obtener proyectos para usuario: {}", userId, e);
            ProjectResponse errorResponse = ProjectResponse.builder()
                    .success(false)
                    .message("Error al obtener los proyectos: " + e.getMessage())
                    .projects(List.of())
                    .count(0)
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getProjectById(
            @PathVariable String id,
            @RequestParam String userId) {
        try {
            log.info("Obteniendo proyecto con ID: {} para usuario: {}", id, userId);
            Optional<Project> project = projectService.getProjectById(id, userId);

            if (project.isPresent()) {
                ProjectResponse response = ProjectResponse.builder()
                        .success(true)
                        .message("Proyecto encontrado exitosamente")
                        .project(project.get())
                        .userId(userId)
                        .build();
                return ResponseEntity.ok(response);
            } else {
                ProjectResponse response = ProjectResponse.builder()
                        .success(false)
                        .message("Proyecto no encontrado")
                        .build();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

        } catch (Exception e) {
            log.error("Error al obtener proyecto ID: {} para usuario: {}", id, userId, e);
            ProjectResponse errorResponse = ProjectResponse.builder()
                    .success(false)
                    .message("Error al obtener el proyecto: " + e.getMessage())
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(
            @Valid @RequestBody ProjectRequest request,
            @RequestParam String userId) {
        try {
            log.info("Creando nuevo proyecto para usuario: {}", userId);

            // Validación adicional
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                ProjectResponse response = ProjectResponse.builder()
                        .success(false)
                        .message("El nombre del proyecto es requerido")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            Project createdProject = projectService.createProject(request, userId);

            ProjectResponse response = ProjectResponse.builder()
                    .success(true)
                    .message("Proyecto creado exitosamente")
                    .project(createdProject)
                    .userId(userId)
                    .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            log.error("Error al crear proyecto para usuario: {}", userId, e);
            ProjectResponse errorResponse = ProjectResponse.builder()
                    .success(false)
                    .message("Error al crear el proyecto: " + e.getMessage())
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable String id,
            @Valid @RequestBody ProjectRequest request,
            @RequestParam String userId) {
        try {
            log.info("Actualizando proyecto ID: {} para usuario: {}", id, userId);

            // Usar el servicio updateProject
            Optional<Project> updatedProject = projectService.updateProject(id, request, userId);

            if (updatedProject.isPresent()) {
                ProjectResponse response = ProjectResponse.builder()
                        .success(true)
                        .message("Proyecto actualizado exitosamente")
                        .project(updatedProject.get())
                        .userId(userId)
                        .build();
                return ResponseEntity.ok(response);
            } else {
                ProjectResponse response = ProjectResponse.builder()
                        .success(false)
                        .message("Proyecto no encontrado para actualizar")
                        .build();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

        } catch (Exception e) {
            log.error("Error al actualizar proyecto ID: {} para usuario: {}", id, userId, e);
            ProjectResponse errorResponse = ProjectResponse.builder()
                    .success(false)
                    .message("Error al actualizar el proyecto: " + e.getMessage())
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProjectResponse> deleteProject(
            @PathVariable String id,
            @RequestParam String userId) {
        try {
            log.info("Eliminando proyecto ID: {} para usuario: {}", id, userId);

            boolean deleted = projectService.deleteProject(id, userId);

            if (deleted) {
                ProjectResponse response = ProjectResponse.builder()
                        .success(true)
                        .message("Proyecto eliminado exitosamente")
                        .userId(userId)
                        .build();
                return ResponseEntity.ok(response);
            } else {
                ProjectResponse response = ProjectResponse.builder()
                        .success(false)
                        .message("Proyecto no encontrado para eliminar")
                        .build();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

        } catch (Exception e) {
            log.error("Error al eliminar proyecto ID: {} para usuario: {}", id, userId, e);
            ProjectResponse errorResponse = ProjectResponse.builder()
                    .success(false)
                    .message("Error al eliminar el proyecto: " + e.getMessage())
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ProjectResponse> searchProjects(
            @RequestParam String userId,
            @RequestParam String searchTerm) {
        try {
            log.info("Buscando proyectos para usuario: {} con término: {}", userId, searchTerm);
            List<Project> projects = projectService.searchProjects(userId, searchTerm);

            ProjectResponse response = ProjectResponse.builder()
                    .success(true)
                    .message("Búsqueda completada exitosamente")
                    .projects(projects)
                    .count(projects.size())
                    .userId(userId)
                    .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error al buscar proyectos para usuario: {} con término: {}", userId, searchTerm, e);
            ProjectResponse errorResponse = ProjectResponse.builder()
                    .success(false)
                    .message("Error en la búsqueda: " + e.getMessage())
                    .projects(List.of())
                    .count(0)
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/count")
    public ResponseEntity<ProjectResponse> getProjectCount(@RequestParam String userId) {
        try {
            log.info("Obteniendo conteo de proyectos para usuario: {}", userId);
            long count = projectService.getProjectCountByUser(userId);

            ProjectResponse response = ProjectResponse.builder()
                    .success(true)
                    .message("Conteo obtenido exitosamente")
                    .count((int) count)
                    .userId(userId)
                    .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error al obtener conteo para usuario: {}", userId, e);
            ProjectResponse errorResponse = ProjectResponse.builder()
                    .success(false)
                    .message("Error al obtener el conteo: " + e.getMessage())
                    .count(0)
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
