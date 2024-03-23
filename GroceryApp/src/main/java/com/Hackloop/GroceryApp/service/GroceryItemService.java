package com.Hackloop.GroceryApp.service;

import com.Hackloop.GroceryApp.dto.BillItemDTO;
import com.Hackloop.GroceryApp.dto.GroceryItemDTO;
import com.Hackloop.GroceryApp.exception.ItemNotFoundException;
import com.Hackloop.GroceryApp.model.GroceryItem;
import com.Hackloop.GroceryApp.repository.GroceryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GroceryItemService {

    @Autowired
    private GroceryItemRepository groceryItemRepository;



    public GroceryItem addGroceryItem(GroceryItemDTO itemDTO) {
        GroceryItem item = convertDTOToEntity(itemDTO);
        return groceryItemRepository.save(item);
    }

    public List<GroceryItem> getAllGroceryItems() {
        return groceryItemRepository.findAll();
    }

    public void removeGroceryItem(Long itemId) {
        groceryItemRepository.deleteById(itemId);

        // Check if the table is empty after deletion
        if (groceryItemRepository.count() == 0) {
            // Reset the auto-increment value to 1
            groceryItemRepository.resetAutoIncrement();
        }
    }

    public GroceryItem updateGroceryItem(Long itemId, GroceryItemDTO itemDTO) {
        Optional<GroceryItem> optionalItem = groceryItemRepository.findById(itemId);
        if (optionalItem.isPresent()) {
            GroceryItem existingItem = optionalItem.get();
            // Update properties of the existing item based on the DTO
            existingItem.setName(itemDTO.getName());
            existingItem.setPrice(itemDTO.getPrice());
            existingItem.setQuantity(itemDTO.getQuantity());
            // Save the updated item
            return groceryItemRepository.save(existingItem);
        } else {
            throw new ItemNotFoundException("Item not found with id: " + itemId);
        }
    }

    private GroceryItem convertDTOToEntity(GroceryItemDTO itemDTO) {
        GroceryItem entity = new GroceryItem();
        // Set properties of the entity based on the corresponding properties in the DTO
        entity.setName(itemDTO.getName());
        entity.setPrice(itemDTO.getPrice());
        entity.setQuantity(itemDTO.getQuantity());

        // You might need to handle other properties based on your actual DTO and Entity structure

        return entity;
    }

    public void removeAllGroceryItems() {
        groceryItemRepository.deleteAll();

        // Reset the auto-increment value to 1
        groceryItemRepository.resetAutoIncrement();
    }
    // In GroceryItemService.java


}
