package com.example.hotelordering.dto.response.admin;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDTO {

    private Long orderId;
    private Long userId;
    private Double totalAmount;

    private List<OrderItemDTO> items;
}