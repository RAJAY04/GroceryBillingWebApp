package com.Hackloop.GroceryApp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillRequestDTO {
    private String name;
    private List<BillItemDTO> items;
}
