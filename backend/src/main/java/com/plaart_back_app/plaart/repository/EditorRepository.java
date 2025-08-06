package com.plaart_back_app.plaart.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.plaart_back_app.plaart.model.Editor;

@Repository
public interface EditorRepository extends MongoRepository<Editor, String> {
    Optional<Editor> findByProjectIdAndUserId(String projectId, String userId);

    boolean existsByProjectId(String projectId);
}
