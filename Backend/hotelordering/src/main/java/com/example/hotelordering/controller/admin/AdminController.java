package com.example.hotelordering.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.example.hotelordering.entity.MenuItem;
import com.example.hotelordering.service.admin.AdminService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api/admin/menu")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping
    public ResponseEntity<MenuItem> postMethodName(@RequestBody MenuItem item) {
        return ResponseEntity.ok(adminService.addMenuItem(item));
    }

    @GetMapping("/allProducts")
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        return ResponseEntity.ok(adminService.getAllMenuItems());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(
            @PathVariable Long id,
            @RequestBody MenuItem item) {

        return ResponseEntity.ok(adminService.updateMenuItem(id, item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMenuItem(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.deleteMenuItem(id));
    }

}
