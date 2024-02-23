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
@Entity(name = "route")
@Table
public class Route {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "route_sequence"
    )
    @SequenceGenerator(
            name = "route_sequence",
            sequenceName = "route_sequence",
            allocationSize = 1
    )
    @Column(
            name = "routeId",
            updatable = false
    )
    private Long routeId;

    @Column(
            name = "startDestination" ,
            nullable = false
    )
    private String startDestination ;

    @Column(
            name = "endDestination",
            nullable = false
    )
    private String endDestination ;

    @Column(name = "distance")
    private double distance;

    @Column(name = "noOfSections")
    private Integer noOfSections;

    @Column(
            name = "permitExpDate",
            nullable = false
    )
    private Date permitExpDate;

    @ManyToOne
    @JoinColumn(
            name = "bId",
            foreignKey = @ForeignKey(name = "fk_bId")
    )
    private Business business;

    @OneToMany(
            mappedBy = "route",
            fetch = FetchType.LAZY
    )
    private Set<Trip> trips;

    @OneToOne(
            mappedBy = "route"
    )
    private Document document;

}
