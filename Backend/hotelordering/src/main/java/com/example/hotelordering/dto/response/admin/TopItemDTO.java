package com.example.hotelordering.dto.response.admin;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TopItemDTO {

    private Long menuItemId;
    private String name;
    private Long totalCount;
}