package com.example.hotelordering.service.auth;

import com.example.hotelordering.dto.request.user.LoginRequest;
import com.example.hotelordering.dto.request.user.RegisterRequest;
import com.example.hotelordering.dto.response.user.AuthResponse;
import com.example.hotelordering.entity.RefreshToken;
import com.example.hotelordering.entity.User;
import com.example.hotelordering.repository.RefreshTokenRepository;
import com.example.hotelordering.repository.UserRepository;
import com.example.hotelordering.config.JwtUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserAuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtil jwtUtil;

    @Transactional // ✅ Added
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        String userId = generateUserId();

        User user = User.builder()
                .userId(userId)
                .name(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);

        refreshTokenRepository.deleteByUser(user);

        String accessToken = jwtUtil.generateToken(userId);
        String refreshToken = jwtUtil.generateRefreshToken(userId);

        RefreshToken tokenEntity = RefreshToken.builder()
                .user(user)
                .token(refreshToken)
                .expiryDate(LocalDateTime.now().plusDays(7))
                .build();

        refreshTokenRepository.save(tokenEntity);

        return new AuthResponse(accessToken, refreshToken);
    }

    @Transactional // ✅ Added
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        refreshTokenRepository.deleteByUser(user);

        String accessToken = jwtUtil.generateToken(user.getUserId());
        String refreshToken = jwtUtil.generateRefreshToken(user.getUserId());

        RefreshToken tokenEntity = RefreshToken.builder()
                .user(user)
                .token(refreshToken)
                .expiryDate(LocalDateTime.now().plusDays(7))
                .build();

        refreshTokenRepository.save(tokenEntity);

        return new AuthResponse(accessToken, refreshToken);
    }

    public AuthResponse refreshToken(String refreshToken) {

        RefreshToken tokenEntity = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (tokenEntity.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Refresh token expired");
        }

        String userId = tokenEntity.getUser().getUserId();
        String newAccessToken = jwtUtil.generateToken(userId);

        return new AuthResponse(newAccessToken, refreshToken);
    }

    private String generateUserId() {
        String userId;
        Random random = new Random();
        do {
            int number = 1000 + random.nextInt(9000);
            userId = String.valueOf(number);
        } while (userRepository.findByUserId(userId).isPresent());
        return userId;
    }
}