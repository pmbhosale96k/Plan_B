package com.example.hotelordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.hotelordering.entity.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
}