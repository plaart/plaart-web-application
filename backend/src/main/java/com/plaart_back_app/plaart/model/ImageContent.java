package com.plaart_back_app.plaart.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageContent {
    private String image;
    private String src;
    private boolean loading;
}
