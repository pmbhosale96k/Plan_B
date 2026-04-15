package com.example.hotelordering.repository;

import com.example.hotelordering.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}