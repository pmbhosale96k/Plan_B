package com.example.hotelordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hotelordering.entity.MenuItem;
import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {


}
