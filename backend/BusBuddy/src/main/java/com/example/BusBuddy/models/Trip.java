package com.example.BusBuddy.models;

import ch.qos.logback.classic.net.SMTPAppender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "trip")
@Table
public class Trip {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "trip_sequence"
    )
    @SequenceGenerator(
            name = "trip_sequence",
            sequenceName = "trip_sequence",
            allocationSize = 1
    )
    private Long tripId;

    @Column(
            name = "date",
            nullable = false
    )
    private Date date;

    @Column(
            name = "startTime",
            nullable = false
    )
    private Time stratTime;

    @Column(
            name = "endTime",
            nullable = false
    )
    private Time endTime;

    @Column(name = "income")
    private double income;

    @Column(name = "expense")
    private double expense;

    @Column(name = "ticketApi")
    private String ticketApi;

    @ManyToOne
    @JoinColumn(
            name = "bus",
            foreignKey = @ForeignKey(name = "fk_bus")
    )
    private Bus bus;

    @ManyToOne
    @JoinColumn(
            name = "route",
            foreignKey = @ForeignKey(name = "fk_route")
    )
    private Route route;

    @ManyToOne
    @JoinColumn(
            name = "driver",
            foreignKey = @ForeignKey(name = "fk_employee_driver")
    )
    private Employee driver ;

    @ManyToOne
    @JoinColumn(
            name = "conductor",
            foreignKey = @ForeignKey(name = "fk_employee_conductor")
    )
    private Employee conductor ;

    @OneToOne(
            mappedBy = "trip"
    )
    private Document document;

    @ManyToOne
    @JoinColumn(
            name = "bId",
            foreignKey = @ForeignKey(name = "fk_bId")
    )
    private Business business;
}
