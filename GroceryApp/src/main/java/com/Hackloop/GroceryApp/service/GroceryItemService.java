package com.Hackloop.GroceryApp.service;

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
            return groceryItemRepository.save(item);
        } else {
            throw new ItemNotFoundException("Item not found with id: " + itemId);
        }
    }



    public List<GroceryItem> getAvailableGroceryItems() {
        return groceryItemRepository.findAllByQuantityGreaterThan(0);
    }

    public Orders bookGroceryItems(List<GroceryItemDTO> orderItemsDTO) {
        BigDecimal total = BigDecimal.ZERO;
        List<GroceryItem> orderItems = convertDTOsToEntities(orderItemsDTO);

        for (GroceryItem orderItem : orderItems) {
            Optional<GroceryItem> optionalItem = groceryItemRepository.findById(orderItem.getId());
            if (optionalItem.isPresent()) {
                GroceryItem item = optionalItem.get();
                if (item.getQuantity() >= orderItem.getQuantity()) {
                    BigDecimal itemTotal = item.getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity()));
                    total = total.add(itemTotal);

                    item.setQuantity(item.getQuantity() - orderItem.getQuantity());
                    groceryItemRepository.save(item);
                } else {
                    throw new InsufficientQuantityException("Insufficient quantity available for item: " + item.getName());
                }
            } else {
                throw new ItemNotFoundException("Item not found with id: " + orderItem.getId());
            }
        }

        Orders order = new Orders();
        order.setItems(orderItems);
        order.setOrderTime(LocalDateTime.now());
        order.setTotalPrice(total);
        orderRepository.save(order);

        return order;
    }

    public double calculateTotal(List<Long> itemIds) {
        double total = 0.0;

        for (Long itemId : itemIds) {
            Optional<GroceryItem> optionalItem = groceryItemRepository.findById(itemId);

            if (optionalItem.isPresent()) {
                GroceryItem item = optionalItem.get();
                total += item.getPrice().doubleValue(); // Assuming 'price' is a BigDecimal
            } else {
                // Handle the case where an item with the given ID is not found
                // You can throw an exception or handle it in a way that suits your requirements
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

}
