package com.Hackloop.GroceryApp.dto;

import java.math.BigDecimal;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroceryItemDTO {
    private String name;
    private BigDecimal price;
    private int quantity;
}
