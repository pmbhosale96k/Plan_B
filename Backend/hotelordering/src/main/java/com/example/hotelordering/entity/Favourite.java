package com.example.hotelordering.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "favourites")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Favourite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private MenuItem menuItem;
}