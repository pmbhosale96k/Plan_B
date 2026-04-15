package com.example.hotelordering.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "refresh_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ FK column (this will fill user_pk)
    @ManyToOne
    @JoinColumn(name = "user_pk", nullable = false)
    private User user;

    // ✅ 4-digit userId (NOT mapped to FK)
    @Transient
    private String userId;

    @Column(nullable = false, unique = true, length = 500)
    private String token;

    private LocalDateTime expiryDate;

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}