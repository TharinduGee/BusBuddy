package com.example.BusBuddy.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.FetchMode;
import org.hibernate.annotations.Fetch;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "document")
@Table
public class Document {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "document_sequence"
    )
    @SequenceGenerator(
            name = "document_sequence",
            sequenceName = "document_sequence",
            allocationSize = 1
    )
    @Column(name = "docId")
    private Long docId;

    @Column(
            name = "docName",
            nullable = false
    )
    private String docName;

    @Column(
            name = "uploadDate",
            nullable = false
    )
    private LocalDate uploadDate ;

    @Enumerated(EnumType.STRING)
    private DocCategory category;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(
            name = "url",
            nullable = false
    )
    private byte[] data;

    @ManyToOne
    @JoinColumn(
            name = "bId",
            foreignKey = @ForeignKey(name = "fk_bId")
    )
    private Business business;

    @OneToOne
    @JoinColumn(
            name = "empId",
            foreignKey = @ForeignKey(name = "fk_empId"),
            nullable = true
    )
    private Employee employee;

    @OneToOne
    @JoinColumn(
            name = "busId",
            foreignKey = @ForeignKey(name = "fk_busId"),
            nullable = true
    )
    private Bus bus;

    @OneToOne
    @JoinColumn(
            name = "routeId",
            foreignKey = @ForeignKey(name = "fk_routeId"),
            nullable = true
    )
    private Route route;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name ="tripId",
            foreignKey = @ForeignKey(name = "fk_tripId"),
            nullable = true
    )
    private Trip trip;

    @OneToOne
    @JoinColumn(
            name = "ledgerId",
            foreignKey = @ForeignKey(name = "fk_ledgerId"),
            nullable = true
    )
    private Ledger ledger;


}
