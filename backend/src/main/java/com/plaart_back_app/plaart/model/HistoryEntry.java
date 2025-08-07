package com.plaart_back_app.plaart.model;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HistoryEntry {
    private Long historyLogId;
    private LocalDateTime timestamp;
    private Editor editorState;
    private List<String> logActions;
}
