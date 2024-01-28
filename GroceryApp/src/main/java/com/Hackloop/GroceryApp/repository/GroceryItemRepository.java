package com.Hackloop.GroceryApp.repository;

import com.Hackloop.GroceryApp.model.GroceryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroceryItemRepository extends JpaRepository<GroceryItem,Long> {
    List<GroceryItem> findAllByQuantityGreaterThan(int quantity);

    @Query("SELECT g FROM GroceryItem g WHERE g.quantity > :quantity")
    List<GroceryItem> findAllByQuantityGreaterThanCustomQuery(@Param("quantity") int quantity);
}
