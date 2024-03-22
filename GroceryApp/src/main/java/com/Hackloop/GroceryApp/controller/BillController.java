package com.Hackloop.GroceryApp.controller;

import com.Hackloop.GroceryApp.dto.BillItemDTO;
import com.Hackloop.GroceryApp.dto.BillRequestDTO;
import com.Hackloop.GroceryApp.model.Bill;
import com.Hackloop.GroceryApp.service.BillService;
import com.Hackloop.GroceryApp.mapper.UrlMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping(UrlMapping.CREATE_BILL)
    public ResponseEntity<Bill> createBill(@RequestBody BillRequestDTO billRequestDTO) {
        Bill bill = billService.createBill(billRequestDTO.getName(), billRequestDTO.getItems());
        return ResponseEntity.ok(bill);
    }

    @DeleteMapping(UrlMapping.DELETE_BILL)
    public ResponseEntity<String> deleteBillById(@PathVariable Long id) {
        billService.deleteBillById(id);
        return ResponseEntity.ok("Bill deleted successfully");
    }
    @GetMapping(UrlMapping.GET_ALL_BILLS)
    public ResponseEntity<List<Bill>> getAllBills() {
        List<Bill> bills = billService.getAllBills();
        return ResponseEntity.ok(bills);
    }
}
