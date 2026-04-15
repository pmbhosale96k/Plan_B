package com.example.hotelordering.dto.response.admin;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemDTO {

    private Long menuItemId;
    private Integer quantity;
    private Double price;
}