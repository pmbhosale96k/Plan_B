package com.example.hotelordering.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.hotelordering.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query(value = """
                SELECT m.menu_item_id, m.name, COUNT(*) AS total_count
                FROM order_items oi
                JOIN menu_items m ON oi.menu_item_id = m.menu_item_id
                GROUP BY m.menu_item_id, m.name
                ORDER BY total_count DESC
                LIMIT 3
            """, nativeQuery = true)
    List<Object[]> getTopSellingItems();
}
