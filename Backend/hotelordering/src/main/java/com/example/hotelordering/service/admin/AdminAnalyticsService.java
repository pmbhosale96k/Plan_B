package com.example.hotelordering.service.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelordering.dto.response.admin.TopItemDTO;
import com.example.hotelordering.repository.OrderItemRepository;
import com.example.hotelordering.repository.OrderRepository;

@Service
public class AdminAnalyticsService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    public Double getTodayRevenue() {

        return orderRepository.getTodayRevenue();
    }

    public List<TopItemDTO> getTopSellingItems() {

        List<Object[]> results = orderItemRepository.getTopSellingItems();

        List<TopItemDTO> topItems = new ArrayList<>();

        for (Object[] row : results) {

            //  menu_item_id , name , total_count 
            Long id = Long.parseLong(row[0].toString());
            String name = row[1].toString();
            Long count = Long.parseLong(row[2].toString());

            TopItemDTO dto = new TopItemDTO(id, name, count);

            topItems.add(dto);
        }

        return topItems;
    }
}
