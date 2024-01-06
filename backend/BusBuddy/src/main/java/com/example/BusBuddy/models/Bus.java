package com.example.BusBuddy.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.*;
import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "bus")
@Table
public class Bus {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "bus_sequence"
    )
    @SequenceGenerator(
            name = "bus_sequence",
            sequenceName = "bus_sequence",
            allocationSize = 1
    )
    @Column(
            name = "busId",
            updatable = false
    )
    private Long busId;

    @Lob
    @Column(name = "image", columnDefinition = "BYTEA")
    private byte[] imageData;

    @Column(
            name = "type",
            nullable = false
    )
    private BusType type;

    @Column(
            name = "numberPlate",
            nullable = false
    )
    private String numberPlate;

    @Column(
            name = "lastServiceDate"
    )
    private Date lastServiceDate;

    @Column(name = "regNo")
    private String regNo;

    @Column(name = "seats")
    private Integer seats;

    @ManyToOne
    @JoinColumn(
            name = "bId",
            foreignKey = @ForeignKey(name = "fk_bId")
    )
    private Business business;


}
