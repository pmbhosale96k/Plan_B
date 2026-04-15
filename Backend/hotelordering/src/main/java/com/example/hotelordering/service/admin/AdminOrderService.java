package com.example.hotelordering.service.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelordering.dto.response.admin.OrderDTO;
import com.example.hotelordering.dto.response.admin.OrderItemDTO;
import com.example.hotelordering.repository.OrderRepository;

@Service
public class AdminOrderService {

    @Autowired
    private OrderRepository orderRepository;
    
    public List<OrderDTO> getAllOrders() {

    return orderRepository.findAll().stream().map(order -> {

        List<OrderItemDTO> items = order.getOrderItems().stream().map(oi ->
                OrderItemDTO.builder()
                        .menuItemId(oi.getMenuItem().getId())
                        .quantity(oi.getQuantity())
                        .price(oi.getPrice())
                        .build()
        ).toList();

        return OrderDTO.builder()
                .orderId(order.getOrderId())
                .userId(order.getUser().getId())
                .totalAmount(order.getTotalAmount())
                .items(items)
                .build();

    }).toList();
}

}
