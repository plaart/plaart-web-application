package com.plaart_back_app.plaart.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.plaart_back_app.plaart.dto.request.ProjectRequest;
import com.plaart_back_app.plaart.model.Project;
import com.plaart_back_app.plaart.repository.ProjectRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getAllProjectsByUser(String userId) {
        log.debug("Obteniendo proyectos para usuario: {}", userId);
        return projectRepository.findByUserIdOrderByUpdatedAtDesc(userId);
    }

    public Optional<Project> getProjectById(String id, String userId) {
        log.debug("Obteniendo proyectos por ID: {} para usuario: {}", id, userId);
        return projectRepository.findByIdAndUserId(id, userId);
    }

    public Project createProject(ProjectRequest input, String userId) {
        log.debug("Creando nuevo proyecto para usuario: {}", userId);

        Project project = Project.builder()
                .name(input.getName())
                .description(input.getDescription())
                .userId(userId)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        return projectRepository.save(project);
    }

    public Optional<Project> updateProject(String id, ProjectRequest input, String userId) {
        log.debug("Actualizando proyecto ID: {} para usuario: {}", id, userId);
        Optional<Project> existingProject = projectRepository.findByIdAndUserId(id, userId);

        if (existingProject.isPresent()) {
            Project project = existingProject.get();

            if (input.getName() != null) {
                project.setName(input.getName());
            }
            if (input.getDescription() != null) {
                project.setDescription(input.getDescription());
            }
            project.setUpdatedAt(LocalDateTime.now());
            return Optional.of(projectRepository.save(project));
        }
        return Optional.empty();
    }

    public boolean deleteProject(String id, String userId) {
        log.debug("Eliminando proyecto ID: {} para usuario: {}", id, userId);

        Optional<Project> project = projectRepository.findByIdAndUserId(id, userId);

        if (project.isPresent()) {
            projectRepository.deleteByIdAndUserId(id, userId);
            return true;
        }
        return false;
    }

    public List<Project> searchProjects(String userId, String searchTerm) {
        log.debug("Buscando proyectos para usuario: {} con término: {}", userId, searchTerm);
        return projectRepository.findByUserIdAndNameContainingIgnoreCase(userId, searchTerm);
    }

    public long getProjectCountByUser(String userId) {
        log.debug("Obteniendo conteo de proyectos para usuario: {}", userId);
        return projectRepository.countByUserId(userId);
    }
}
