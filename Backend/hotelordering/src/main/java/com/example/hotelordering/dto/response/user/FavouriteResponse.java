package com.example.hotelordering.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FavouriteResponse {

    private Long id;
    private String name;
    private String category;
    private Double price;
}