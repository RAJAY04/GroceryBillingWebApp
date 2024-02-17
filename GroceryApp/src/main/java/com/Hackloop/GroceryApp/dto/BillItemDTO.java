package com.Hackloop.GroceryApp.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class BillItemDTO {
    private Long itemId;
    private String name;
    private int quantity;
    private BigDecimal price;
}
