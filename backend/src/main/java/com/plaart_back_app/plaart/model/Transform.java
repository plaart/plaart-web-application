package com.plaart_back_app.plaart.model;

import java.util.List;

import lombok.Data;

@Data
public class Transform {
    private Double posX;
    private Double posY;
    private Double width;
    private Double height;
    private Double radius;
    private Double rotation;
    private Double scaleX;
    private Double scaleY;
    private List<Double> points;
}
