package com.example.hotelordering.service.user;

import com.example.hotelordering.dto.request.user.OrderRequest;
import com.example.hotelordering.entity.*;
import com.example.hotelordering.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UserRepository userRepository;
    private final MenuItemRepository menuItemRepository;
    private final OrderRepository orderRepository;

    @Transactional
    public String placeOrder(String userId, OrderRequest request) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0;

        // 🔥 create order first (without items)
        Order order = new Order();
        order.setUser(user);

        for (OrderRequest.Item item : request.getItems()) {

            MenuItem menuItem = menuItemRepository.findById(item.getMenuItemId())
                    .orElseThrow(() -> new RuntimeException("Item not found"));

            double price = menuItem.getPrice() * item.getQuantity();
            total += price;

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .menuItem(menuItem)
                    .quantity(item.getQuantity())
                    .price(price)
                    .build();

            orderItems.add(orderItem);
        }

        order.setTotalAmount(total);
        order.setOrderItems(orderItems);

        orderRepository.save(order); // 🔥 cascade saves orderItems

        return "Order placed successfully";
    }
}