package com.Hackloop.GroceryApp.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Bill")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private BigDecimal total;

    @ElementCollection
    @CollectionTable(name = "BillItems", joinColumns = @JoinColumn(name = "bill_id"))
    @Column(name = "item_details")
    @Cascade(org.hibernate.annotations.CascadeType.ALL) // Ensure cascade delete is enabled
    private List<String> items;
}
