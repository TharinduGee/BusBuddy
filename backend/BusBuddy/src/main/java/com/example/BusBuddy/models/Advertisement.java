package com.example.BusBuddy.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "advertisement")
@Table
public class Advertisement {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "advertisement_sequence"
    )
    @SequenceGenerator(
            name = "advertisement_sequence",
            sequenceName = "advertisement_sequence",
            allocationSize = 1
    )
    private Long advertisementId;

    @Column(
            name = "startDate",
            nullable = false
    )
    private Date startDate;

    @Column(
            name = "endDate",
            nullable = false
    )
    private Date endDate;

    @Lob
    @Column(name = "image", columnDefinition = "BYTEA")
    private byte[] imageData;

    @ManyToOne
    @JoinColumn(
            name = "bId",
            foreignKey = @ForeignKey(name = "fk_bId")
    )
    private Business business;

}
