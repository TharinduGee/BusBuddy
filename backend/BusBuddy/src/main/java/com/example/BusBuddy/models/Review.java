package com.example.BusBuddy.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "review")
@Table
public class Review {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "review_sequence"
    )
    @SequenceGenerator(
            name = "review_sequence",
            sequenceName = "review_sequence",
            allocationSize = 1
    )
    @Column(
            name = "reviewId",
            updatable = false
    )
    private Long reviewId;

    @Column(
            name = "timestamp",
            nullable = false
    )
    private Date timestamp;

    @Column(
            name = "comment",
            nullable = false
    )
    private String comment;

    @Column(name = "rating")
    @Min(value = 0, message = "Value must be greater than or equal to 1")
    @Max(value = 5, message = "Value must be less than or equal to 100")
    private double rating;

    @ManyToOne
    @JoinColumn(
            name = "b_Id",
            foreignKey = @ForeignKey(name = "fk_bId")
    )
    private Business business;

    @ManyToOne
    @JoinColumn(
            name = "bus_reviewId",
            foreignKey = @ForeignKey(name = "fk_bus_review")
    )
    private Bus bus;

    @ManyToOne
    @JoinColumn(
            name = "employee_reviewId",
            foreignKey = @ForeignKey(name = "fk_employee_review")
    )
    private Employee employee;


}
