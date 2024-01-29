package com.Hackloop.GroceryApp.mapper;

public class UrlMapping {
    private static final String BASE_API = "/api/v1";
    public static final String ADD_GROCERY_ITEMS = BASE_API + "/admin/addGrocery-items";
    public static final String ADMIN_GET_GROCERY_ITEMS = BASE_API + "/admin/getGrocery-items";
    public static final String REMOVE_GROCERY_ITEMS = BASE_API + "/admin/deleteGrocery-items/{itemId}";
    public static final String UPDATE_GROCERY_ITEMS = BASE_API + "/admin/updateGrocery-items/{itemId}";
    public static final String MANAGE_GROCERY_ITEMS = BASE_API + "/admin/manageGrocery-items/{itemId}";

    public static final String USER_GET_GROCERY_ITEMS = BASE_API + "/user/getGrocery-items";
    public static final String USER_BOOK_MULTIPLE_GROCERY_ITEMS = BASE_API + "/user/place-order";
}