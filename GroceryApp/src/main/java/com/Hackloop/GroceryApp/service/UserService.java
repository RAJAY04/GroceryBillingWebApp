package com.Hackloop.GroceryApp.service;

import com.Hackloop.GroceryApp.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    // Hardcoded user data (in a real application, this should be stored securely)
    private final User hardcodedUser = new User("exampleUser", "password123");

    public User authenticate(String username, String password) {
        if (username.equals(hardcodedUser.getUsername()) && password.equals(hardcodedUser.getPassword())) {
            return hardcodedUser;
        }
        return null; // Return null if authentication fails
    }
}
