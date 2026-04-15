package com.example.hotelordering.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelordering.dto.response.admin.TopItemDTO;
import com.example.hotelordering.service.admin.AdminAnalyticsService;
import com.example.hotelordering.service.admin.AdminService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/admin")
public class AdminAnalyticsController {

    @Autowired
    private AdminAnalyticsService adminService;

    @GetMapping("/revenue/today")
    public ResponseEntity<Double> getTodayRevenue() {
        return ResponseEntity.ok(adminService.getTodayRevenue());
    }

    @GetMapping("/best-sellers")
    public List<TopItemDTO> getBestSellers() {
        return adminService.getTopSellingItems();
    }
    
}
