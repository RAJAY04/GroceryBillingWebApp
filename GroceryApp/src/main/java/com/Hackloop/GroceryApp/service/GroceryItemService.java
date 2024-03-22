package com.Hackloop.GroceryApp.service;

import com.Hackloop.GroceryApp.dto.BillItemDTO;
import com.Hackloop.GroceryApp.dto.GroceryItemDTO;
import com.Hackloop.GroceryApp.dto.InventoryChangeDTO;
import com.Hackloop.GroceryApp.exception.InsufficientQuantityException;
import com.Hackloop.GroceryApp.exception.ItemNotFoundException;
import com.Hackloop.GroceryApp.model.GroceryItem;
import com.Hackloop.GroceryApp.model.Orders;
import com.Hackloop.GroceryApp.repository.GroceryItemRepository;
import com.Hackloop.GroceryApp.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class GroceryItemService {

    @Autowired
    private GroceryItemRepository groceryItemRepository;

    @Autowired
    private OrderRepository orderRepository;

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

    public GroceryItem manageInventory(Long itemId, InventoryChangeDTO inventoryChangeDTO) {
        Integer changeAmount = inventoryChangeDTO.getChangeAmount();

        if (changeAmount == null || changeAmount < 0) {
            throw new IllegalArgumentException("Invalid changeAmount: " + changeAmount);
        }

        Optional<GroceryItem> optionalItem = groceryItemRepository.findById(itemId);

        if (optionalItem.isPresent()) {
            GroceryItem item = optionalItem.get();
            int updatedQuantity = Math.max(0, item.getQuantity() + changeAmount);
            item.setQuantity(updatedQuantity);
            return groceryItemRepository.save(item); // Return the updated GroceryItem
        } else {
            throw new ItemNotFoundException("Item not found with id: " + itemId);
        }
    }

    public double calculateTotal(List<Long> itemIds) {
        double total = 0.0;

        for (Long itemId : itemIds) {
            Optional<GroceryItem> optionalItem = groceryItemRepository.findById(itemId);

            if (optionalItem.isPresent()) {
                GroceryItem item = optionalItem.get();
                // Multiply the item price by the item quantity and add it to the total
                total += item.getPrice().doubleValue() * item.getQuantity();
            } else {
                throw new ItemNotFoundException("Item not found with id: " + itemId);
            }
        }

        return total;
    }

    private List<GroceryItem> convertDTOsToEntities(List<GroceryItemDTO> itemsDTO) {
        List<GroceryItem> items = new ArrayList<>();

        for (GroceryItemDTO itemDTO : itemsDTO) {
            GroceryItem entity = convertDTOToEntity(itemDTO);
            items.add(entity);
        }

        return items;
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
    public double billItems(List<GroceryItemDTO> billItems) {
        // Convert GroceryItemDTO list to BillItemDTO list
        List<BillItemDTO> billItemDTOs = convertToBillItems(billItems);

        BigDecimal total = BigDecimal.ZERO;

        for (BillItemDTO billItemDTO : billItemDTOs) {
            Optional<GroceryItem> optionalItem = groceryItemRepository.findById(billItemDTO.getItemId());
            if (optionalItem.isPresent()) {
                GroceryItem item = optionalItem.get();
                if (item.getQuantity() >= billItemDTO.getQuantity()) {
                    BigDecimal itemTotal = item.getPrice().multiply(BigDecimal.valueOf(billItemDTO.getQuantity()));
                    total = total.add(itemTotal);

                    // Deduct the quantity from inventory
                    item.setQuantity(item.getQuantity() - billItemDTO.getQuantity());
                    groceryItemRepository.save(item);
                } else {
                    throw new InsufficientQuantityException("Insufficient quantity available for item: " + item.getName());
                }
            } else {
                throw new ItemNotFoundException("Item not found with id: " + billItemDTO.getItemId());
            }
        }

        // Return the total price as a double
        return total.doubleValue();
    }



    private List<BillItemDTO> convertToBillItems(List<GroceryItemDTO> groceryItems) {
        List<BillItemDTO> billItems = new ArrayList<>();
        for (GroceryItemDTO groceryItem : groceryItems) {
            BillItemDTO billItem = new BillItemDTO();
            billItem.setItemId(groceryItem.getItemId());
            billItem.setName(groceryItem.getName());
            billItem.setQuantity(groceryItem.getQuantity());
            billItem.setPrice(groceryItem.getPrice());
            billItems.add(billItem);
        }
        return billItems;
    }


}
