package com.example.BusBuddy.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "ledger")
@Table
public class Ledger{

    @Id
    @GeneratedValue(
            generator = "ledger_sequence",
            strategy = GenerationType.SEQUENCE
    )
    @SequenceGenerator(
            name = "ledger_sequence",
            sequenceName = "ledger_sequence",
            allocationSize = 1
    )
    @Column(
            name = "transactionId",
            updatable = false
    )
    private Long transactionId;

    @Column(
            name = "transactionName",
            updatable = false
    )
    private String transactionName;

    @Column(
            name = "timestamp",
            nullable = false
    )
    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @Column(name = "amount")
    private double amount;


    @OneToOne(mappedBy = "ledger" , fetch = FetchType.LAZY)
    private Document document;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "bId",
            foreignKey = @ForeignKey(name = "fk_bId")
    )
    private Business business;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(
            name = "empId",
            foreignKey = @ForeignKey(name = "fk_ref_empId")
    )
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(
            name = "busId",
            foreignKey = @ForeignKey(name = "fk_ref_busId")
    )
    private Bus bus;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(
            name = "tripId",
            foreignKey = @ForeignKey(name = "fk_ref_tripId")
    )
    private Trip trip;


}
