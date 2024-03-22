package com.Hackloop.GroceryApp.mapper;

public class UrlMapping {
    public static final String BASE_API = "/api/v1";
    public static final String ADD_GROCERY_ITEMS = BASE_API + "/admin/addGrocery-items";
    public static final String ADMIN_GET_GROCERY_ITEMS = BASE_API + "/admin/getGrocery-items";
    public static final String REMOVE_GROCERY_ITEMS = BASE_API + "/admin/deleteGrocery-items/{itemId}";
    public static final String UPDATE_GROCERY_ITEMS = BASE_API + "/admin/updateGrocery-items/{itemId}";
    public static final String MANAGE_GROCERY_ITEMS = BASE_API + "/admin/manageGrocery-items/{itemId}";
    public static final String GENERATE_TOTAL = BASE_API + "/admin/generate-total";
    public static final String REMOVE_ALL_GROCERY_ITEMS = BASE_API + "/admin/remove-all-grocery-items";
    public static final String BILL_ITEMS = BASE_API + "/admin/bill-items";
    public static final String SIGN_IN = BASE_API + "/auth/signin";
    public static final String SIGN_UP = BASE_API + "/auth/signup";
    public static final String GET_ALL_TASKS = BASE_API + "/tasks";
    public static final String GET_ALL_COMPLETED_TASKS = BASE_API + "/tasks/completed";
    public static final String GET_ALL_INCOMPLETE_TASKS = BASE_API + "/tasks/incomplete";
    public static final String CREATE_TASK = BASE_API + "/tasks";
    public static final String UPDATE_TASK = BASE_API + "/tasks/{id}";
    public static final String DELETE_TASK = BASE_API + "/tasks/{id}";
    public static final String CHECK_INVENTORY = BASE_API + "/admin/check-inventory";
}