package com.Hackloop.GroceryApp.controller;

import com.Hackloop.GroceryApp.mapper.UrlMapping;
import com.Hackloop.GroceryApp.model.GroceryItem;
import com.Hackloop.GroceryApp.model.Orders;
import com.Hackloop.GroceryApp.service.GroceryItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class UserGroceryItemController {
    @Autowired
    private GroceryItemService groceryItemService;

    @GetMapping(value = UrlMapping.USER_GET_GROCERY_ITEMS)
    public ResponseEntity<List<GroceryItem>> getAvailableGroceryItems() {
        return ResponseEntity.ok(groceryItemService.getAvailableGroceryItems());
    }
    @PostMapping(value =UrlMapping.USER_BOOK_MULTIPLE_GROCERY_ITEMS)
    public ResponseEntity<Orders> bookGroceryItems(@RequestBody List<GroceryItem> orderItems) {
        log.info("Book Multiple Grocery Items");
        Orders order = groceryItemService.bookGroceryItems(orderItems);
        return ResponseEntity.ok(order);
    }
}
