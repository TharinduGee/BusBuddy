package com.example.BusBuddy.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.Set;

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

//    @Lob
//    @Column(name = "image", columnDefinition = "BYTEA")
//    @Basic(fetch = FetchType.LAZY)
//    private byte[] imageData;

    @Enumerated(EnumType.STRING)
    private BusType type;

    @Column(
            name = "numberPlate"
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
            foreignKey = @ForeignKey(name = "fk_bId"  )
    )
    private Business business;

    @OneToMany(
            mappedBy = "bus" ,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Review> reviews;

    @OneToMany(mappedBy = "bus")
    private Set<Trip> trips;

    @OneToOne(
            mappedBy = "bus",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Document document;

}
