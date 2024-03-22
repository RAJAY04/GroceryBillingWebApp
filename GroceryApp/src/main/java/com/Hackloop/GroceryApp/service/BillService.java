package com.Hackloop.GroceryApp.service;
import com.Hackloop.GroceryApp.dto.BillItemDTO;
import com.Hackloop.GroceryApp.exception.InsufficientQuantityException;
import com.Hackloop.GroceryApp.exception.ItemNotFoundException;
import com.Hackloop.GroceryApp.model.Bill;
import com.Hackloop.GroceryApp.model.GroceryItem;
import com.Hackloop.GroceryApp.repository.BillRepository;
import com.Hackloop.GroceryApp.repository.GroceryItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class BillService {

//    @Autowired
//    private BillRepository billRepository;
//
//
//    public Bill createBill(String name, List<BillItemDTO> itemsDTO) {
//        Bill bill = new Bill();
//        bill.setName(name);
//
//        List<String> items = itemsDTO.stream()
//                .map(itemDTO -> itemDTO.getName() + " - " + itemDTO.getPrice() + " - " + itemDTO.getQuantity())
//                .collect(Collectors.toList());
//
//        bill.setItems(items);
//        bill.setTotal(itemsDTO.stream().map(itemDTO -> itemDTO.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity()))).reduce(BigDecimal.ZERO, BigDecimal::add));
//
//        return billRepository.save(bill);
//    }

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private GroceryItemRepository groceryItemRepository;
    @Transactional
    public Bill createBill(String name, List<BillItemDTO> itemsDTO) {
        // Initialize the total price
        BigDecimal total = BigDecimal.ZERO;

        // Iterate over each item in the bill
        for (BillItemDTO itemDTO : itemsDTO) {
            // Fetch the item from the inventory using its ID
            Optional<GroceryItem> optionalItem = groceryItemRepository.findById(itemDTO.getItemId());
            if (optionalItem.isPresent()) {
                GroceryItem item = optionalItem.get();
                // Check if there's sufficient quantity
                if (item.getQuantity() >= itemDTO.getQuantity()) {
                    // Calculate the item total
                    BigDecimal itemTotal = item.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity()));
                    total = total.add(itemTotal);

                    // Deduct the quantity from the inventory
                    item.setQuantity(item.getQuantity() - itemDTO.getQuantity());
                    groceryItemRepository.save(item);
                } else {
                    throw new InsufficientQuantityException("Insufficient quantity available for item: " + item.getName());
                }
            } else {
                throw new ItemNotFoundException("Item not found with id: " + itemDTO.getItemId());
            }
        }


        List<String> items = itemsDTO.stream()
        .map(itemDTO -> itemDTO.getName() + " - " + itemDTO.getPrice() + " - " + itemDTO.getQuantity())
        .collect(Collectors.toList());

        // Create the bill
        Bill bill = new Bill();
        bill.setName(name);
        bill.setTotal(total);
        bill.setItems(items);

        // Save the bill to the database
        return billRepository.save(bill);
    }



    public void deleteBillById(Long id) {
        Optional<Bill> billOptional = billRepository.findById(id);
        if (billOptional.isPresent()) {
            billRepository.deleteById(id);
        } else {
            throw new RuntimeException("Bill not found with id: " + id);
        }
    }
    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }
}
