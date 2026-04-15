package com.example.hotelordering.controller.user;

import com.example.hotelordering.dto.request.user.OrderRequest;
import com.example.hotelordering.service.user.OrderService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public String placeOrder(@RequestBody OrderRequest request) {

        String userId = (String) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return orderService.placeOrder(userId, request);
    }
}