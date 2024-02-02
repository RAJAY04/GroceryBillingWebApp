    package com.Hackloop.GroceryApp.dto;

    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.util.List;

    @Data
    @NoArgsConstructor
    public class GenerateTotalRequestDTO {
        private List<Long> itemIds;
    }
