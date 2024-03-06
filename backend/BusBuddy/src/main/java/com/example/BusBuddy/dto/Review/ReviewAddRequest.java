package com.example.BusBuddy.dto.Review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewAddRequest {
    @NotBlank(message = "There should be a comment.")
    private String comment;
    @Min(value = 0 ,message = "Rating should be from 0 to 5")
    @Max(value = 5 ,message = "Rating should be from 0 to 5")
    private double rating;
    private Long b_id;
    private Long busId;
    private Long empId;
}
