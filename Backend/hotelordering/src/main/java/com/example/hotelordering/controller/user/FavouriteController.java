package com.example.hotelordering.controller.user;

import com.example.hotelordering.dto.response.user.FavouriteResponse;
import com.example.hotelordering.entity.Favourite;
import com.example.hotelordering.service.user.FavouriteService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/favourite")
@RequiredArgsConstructor
public class FavouriteController {

    private final FavouriteService favouriteService;

    // ✅ ADD FAVOURITE
    @PostMapping("/{menuItemId}")
    public String addFavourite(@PathVariable Long menuItemId) {

        String userId = (String) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return favouriteService.addFavourite(userId, menuItemId);
    }

    // ✅ GET FAVOURITES
    @GetMapping
    public List<FavouriteResponse> getFavourites() {

        String userId = (String) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return favouriteService.getUserFavourites(userId);
    }

    @DeleteMapping("/{menuItemId}")
    public String removeFavourite(@PathVariable Long menuItemId) {

        String userId = (String) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        favouriteService.removeFavourite(userId, menuItemId);

        return "Removed from favourites successfully"; // ✅ simple response
    }
}