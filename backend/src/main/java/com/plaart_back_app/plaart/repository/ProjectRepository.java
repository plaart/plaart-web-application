package com.plaart_back_app.plaart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.plaart_back_app.plaart.model.Project;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    List<Project> findByUserId(String userId);

    List<Project> findByUserIdOrderByUpdatedAtDesc(String userId);

    @Query("{'userId': ?0, 'name': { $regex: ?1, $options: 'i'}}")
    List<Project> findByUserIdAndNameContainingIgnoreCase(String userId, String name);

    Optional<Project> findByIdAndUserId(String id, String userId);

    void deleteByIdAndUserId(String id, String userId);

    long countByUserId(String userId);
}
