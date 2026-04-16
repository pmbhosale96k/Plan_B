package com.example.hotelordering.service.user;

import com.example.hotelordering.dto.response.user.FavouriteResponse;
import com.example.hotelordering.entity.Favourite;
import com.example.hotelordering.entity.MenuItem;
import com.example.hotelordering.entity.User;
import com.example.hotelordering.repository.FavouriteRepository;
import com.example.hotelordering.repository.MenuItemRepository;
import com.example.hotelordering.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavouriteService {

    private final FavouriteRepository favouriteRepository;
    private final UserRepository userRepository;
    private final MenuItemRepository menuItemRepository;

    public String addFavourite(String userId, Long menuItemId) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        if (favouriteRepository.findByUserAndMenuItem(user, menuItem).isPresent()) {
            return "Already added to favourites";
        }

        Favourite favourite = Favourite.builder()
                .user(user)
                .menuItem(menuItem)
                .build();

        favouriteRepository.save(favourite);

        return "Added to favourites";
    }

    public List<FavouriteResponse> getUserFavourites(String userId) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Favourite> favourites = favouriteRepository.findByUser(user);

        return favourites.stream().map(fav ->
                new FavouriteResponse(
                        fav.getMenuItem().getId(),
                        fav.getMenuItem().getName(),
                        fav.getMenuItem().getCategory(),
                        fav.getMenuItem().getPrice()
                )
        ).toList();
    }

    @Transactional   
    public void removeFavourite(String userId, Long menuItemId) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        favouriteRepository.deleteByUserAndMenuItem(user, menuItem);
    }
}