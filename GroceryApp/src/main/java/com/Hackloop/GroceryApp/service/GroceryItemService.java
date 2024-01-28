package com.Hackloop.GroceryApp.service;

import com.Hackloop.GroceryApp.dto.InventoryChange;
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
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GroceryItemService {

    @Autowired
    private GroceryItemRepository groceryItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    public GroceryItem addGroceryItem(GroceryItem item) {
        return groceryItemRepository.save(item);
    }

    public List<GroceryItem> getAllGroceryItems() {
        return groceryItemRepository.findAll();
    }

    public void removeGroceryItem(Long itemId) {
        groceryItemRepository.deleteById(itemId);
    }

    public GroceryItem updateGroceryItem(Long itemId, GroceryItem item) {
        if (groceryItemRepository.existsById(itemId)) {
            item.setId(itemId);
            return groceryItemRepository.save(item);
        } else {
            throw new ItemNotFoundException("Item not found with id: " + itemId);
        }
    }

    public GroceryItem manageInventory(Long itemId, InventoryChange inventoryChange) {
        if (groceryItemRepository.existsById(itemId)) {
            GroceryItem item = groceryItemRepository.getOne(itemId);
            int updatedQuantity = Math.max(0, item.getQuantity() + inventoryChange.getChangeAmount());
            item.setQuantity(updatedQuantity);
            return groceryItemRepository.save(item);
        } else {
            throw new ItemNotFoundException("Item not found with id: " + itemId);
        }
    }

    public List<GroceryItem> getAvailableGroceryItems() {
        return groceryItemRepository.findAllByQuantityGreaterThan(0);
    }

    public Orders bookGroceryItems(List<GroceryItem> orderItems) {
        BigDecimal total = BigDecimal.ZERO;

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
}
