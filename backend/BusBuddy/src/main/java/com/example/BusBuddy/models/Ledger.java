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
            name = "ledgerId",
            updatable = false
    )
    private Long ledgerId;

    @Column(
            name = "timestamp",
            nullable = false
    )
    private Date timestamp;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @Column(name = "debit")
    private double debit;

    @Column(name = "credit")
    private double credit;

    @Column(name = "runningBalance")
    private double runningBalance ;

    @OneToOne(mappedBy = "ledger")
    private Document document;

    @ManyToOne
    @JoinColumn(
            name = "bId",
            foreignKey = @ForeignKey(name = "fk_bId")
    )
    private Business business;



}