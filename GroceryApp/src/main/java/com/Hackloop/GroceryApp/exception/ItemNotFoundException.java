package com.Hackloop.GroceryApp.exception;

public class ItemNotFoundException extends RuntimeException{
    public ItemNotFoundException(String message) {
        super(message);
    }
}
