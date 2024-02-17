package com.Hackloop.GroceryApp.controller;

import com.Hackloop.GroceryApp.dto.GenerateTotalRequestDTO;
import com.Hackloop.GroceryApp.dto.GroceryItemDTO;
import com.Hackloop.GroceryApp.dto.InventoryChangeDTO;
import com.Hackloop.GroceryApp.mapper.UrlMapping;
import com.Hackloop.GroceryApp.model.GroceryItem;
import com.Hackloop.GroceryApp.service.GroceryItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class AdminGroceryItemController {

    @Autowired
    private GroceryItemService groceryItemService;

    @PostMapping(value = UrlMapping.ADD_GROCERY_ITEMS)
    public ResponseEntity<GroceryItem> addGroceryItem(@RequestBody GroceryItemDTO itemDTO) {
        log.info("Add Grocery Items::{}", itemDTO);
        return ResponseEntity.ok(groceryItemService.addGroceryItem(itemDTO));
    }

    @GetMapping(value = UrlMapping.ADMIN_GET_GROCERY_ITEMS)
    public ResponseEntity<List<GroceryItem>> getGroceryItems() {
        return ResponseEntity.ok(groceryItemService.getAllGroceryItems());
    }

    @DeleteMapping(value = UrlMapping.REMOVE_GROCERY_ITEMS)
    public ResponseEntity<String> removeGroceryItem(@PathVariable Long itemId) {
        log.info("Remove Grocery Items based upon the item id::{}", itemId);
        groceryItemService.removeGroceryItem(itemId);
        return ResponseEntity.ok("Grocery item removed successfully.");
    }

    @PutMapping(value = UrlMapping.UPDATE_GROCERY_ITEMS)
    public ResponseEntity<GroceryItem> updateGroceryItem(@PathVariable Long itemId, @RequestBody GroceryItemDTO itemDTO) {
        log.info("Update Grocery Items::{}", itemDTO);
        return ResponseEntity.ok(groceryItemService.updateGroceryItem(itemId, itemDTO));
    }

    @PostMapping(value = UrlMapping.MANAGE_GROCERY_ITEMS)
    public ResponseEntity<GroceryItem> manageInventory(@PathVariable Long itemId, @RequestBody InventoryChangeDTO inventoryChangeDTO) {
        log.info("Manage Inventory Items::{}", inventoryChangeDTO);
        return ResponseEntity.ok(groceryItemService.manageInventory(itemId, inventoryChangeDTO));
    }


    @PostMapping(value = UrlMapping.GENERATE_TOTAL)
    public ResponseEntity<Double> generateTotal(@RequestBody GenerateTotalRequestDTO generateTotalRequestDTO) {
        // Logic to calculate the total based on the provided item IDs
        double total = groceryItemService.calculateTotal(generateTotalRequestDTO.getItemIds());

        // You can then return the total as a response
        return ResponseEntity.ok(total);
    }

    @DeleteMapping(value = UrlMapping.REMOVE_ALL_GROCERY_ITEMS)
    public ResponseEntity<String> removeAllGroceryItems() {
        log.info("Remove All Grocery Items");
        groceryItemService.removeAllGroceryItems();
        return ResponseEntity.ok("All grocery items removed successfully.");
    }
}
