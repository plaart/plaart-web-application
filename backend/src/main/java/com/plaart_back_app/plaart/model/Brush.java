package com.plaart_back_app.plaart.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Brush {
    private String color;
    private String fill;
    private Integer size;
}
