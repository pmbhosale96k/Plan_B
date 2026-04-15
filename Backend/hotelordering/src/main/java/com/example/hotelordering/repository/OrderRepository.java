package com.example.hotelordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.hotelordering.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = """
                SELECT ifNull(SUM(total_amount), 0)
                FROM orders
                WHERE DATE(created_at) = CURDATE()
            """, nativeQuery = true)
            
    Double getTodayRevenue();
}