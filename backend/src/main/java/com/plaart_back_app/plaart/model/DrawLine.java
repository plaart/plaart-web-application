package com.plaart_back_app.plaart.model;

import java.util.List;

import com.plaart_back_app.plaart.model.enums.Tool;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrawLine {
    private Tool tool;
    private List<Integer> lines;
    private Brush brush;
}
