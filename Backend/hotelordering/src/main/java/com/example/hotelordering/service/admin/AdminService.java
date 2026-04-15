package com.example.hotelordering.service.admin;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.hotelordering.entity.MenuItem;
import com.example.hotelordering.repository.MenuItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final MenuItemRepository menuItemRepository;

    public MenuItem addMenuItem(MenuItem item) {
        return menuItemRepository.save(item);
    }

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public MenuItem updateMenuItem(Long id, MenuItem item) {
        MenuItem existingItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("item not found with id: " + id));

        existingItem.setName(item.getName());
        existingItem.setCategory(item.getCategory());
        existingItem.setPrice(item.getPrice());
        existingItem.setStockQuantity(item.getStockQuantity());

        return menuItemRepository.save(existingItem);
    }

    public String deleteMenuItem(Long id) {
        menuItemRepository.deleteById(id);
        return "Menu item deleted successfully";
    }

    
    
}