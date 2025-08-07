package com.plaart_back_app.plaart.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EditorMetaData {
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
