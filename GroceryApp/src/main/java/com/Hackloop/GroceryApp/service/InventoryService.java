package com.Hackloop.GroceryApp.service;
import com.Hackloop.GroceryApp.model.GroceryItem;
import com.Hackloop.GroceryApp.repository.GroceryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    private final GroceryItemRepository groceryItemRepository;

    @Autowired
    public InventoryService(GroceryItemRepository groceryItemRepository) {
        this.groceryItemRepository = groceryItemRepository;
    }

    public List<GroceryItem> checkInventoryLevels() {
        return groceryItemRepository.findAll().stream()
                .filter(item -> item.getQuantity() < 10) // Assuming 10 is the threshold
                .collect(Collectors.toList());
    }
}
