package com.example.hotelordering.controller.user;

import com.example.hotelordering.entity.MenuItem;
import com.example.hotelordering.entity.User;
import com.example.hotelordering.repository.UserRepository;
import com.example.hotelordering.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/menu")
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        List<MenuItem> items = userService.getAllMenuItems();
        return ResponseEntity.ok(items);
    }
}