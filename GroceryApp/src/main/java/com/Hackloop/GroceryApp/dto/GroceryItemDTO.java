package com.Hackloop.GroceryApp.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class GroceryItemDTO {
    private Long itemId;
    private String name;
    private BigDecimal price;
    private int quantity;
}
