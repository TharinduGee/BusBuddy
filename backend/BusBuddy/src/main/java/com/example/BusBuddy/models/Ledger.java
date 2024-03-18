package com.example.BusBuddy.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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



    @OneToOne(mappedBy = "ledger")
    private Document document;

    @ManyToOne
    @JoinColumn(
            name = "bId",
            foreignKey = @ForeignKey(name = "fk_bId")
    )
    private Business business;


}
