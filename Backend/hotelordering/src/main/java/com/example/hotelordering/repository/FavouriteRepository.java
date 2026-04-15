package com.example.hotelordering.repository;

import com.example.hotelordering.entity.Favourite;
import com.example.hotelordering.entity.MenuItem;
import com.example.hotelordering.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavouriteRepository extends JpaRepository<Favourite, Long> {

    List<Favourite> findByUser(User user);

    Optional<Favourite> findByUserAndMenuItem(User user, MenuItem menuItem);

    void deleteByUserAndMenuItem(User user, MenuItem menuItem);
}