package com.Hackloop.GroceryApp.controller;

import com.Hackloop.GroceryApp.mapper.UrlMapping;
import com.Hackloop.GroceryApp.model.GroceryItem;
import com.Hackloop.GroceryApp.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InventoryController {

    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping(UrlMapping.CHECK_INVENTORY)
    public List<GroceryItem> checkInventory() {
        return inventoryService.checkInventoryLevels();
    }
}