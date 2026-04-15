package com.example.hotelordering.controller.auth;

import com.example.hotelordering.dto.request.user.LoginRequest;
import com.example.hotelordering.dto.request.user.RegisterRequest;
import com.example.hotelordering.dto.response.user.AuthResponse;
import com.example.hotelordering.service.auth.UserAuthService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/user")
@RequiredArgsConstructor
public class UserAuthController {

    private final UserAuthService userAuthService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return userAuthService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return userAuthService.login(request);
    }

    @PostMapping("/refresh")
    public AuthResponse refresh(@RequestParam String refreshToken) {
        return userAuthService.refreshToken(refreshToken);
    }
}