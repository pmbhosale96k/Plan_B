package com.example.hotelordering.dto.request.user;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {

    private List<Item> items;

    @Data
    public static class Item {
        private Long menuItemId;
        private Integer quantity;
    }
}