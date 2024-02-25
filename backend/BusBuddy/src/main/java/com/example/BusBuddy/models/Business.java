package com.example.BusBuddy.models;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "business")
@Table(
        name = "business",
        uniqueConstraints = {
                @UniqueConstraint(name = "business_email_unique" , columnNames = "email"),
        }
)
public class Business {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE ,
            generator = "business_sequence"
    )
    @SequenceGenerator(
            name = "business_sequence",
            sequenceName = "business_sequence",
            allocationSize = 1
    )
    @Column(
                    name = "bId",
                    updatable = false
    )
    private Long bId;

    @Column(
            name = "bName",
            columnDefinition = "TEXT default 'Your Bus Business'",
            nullable = false
    )
    String bName = "Your Bus Business";

    @Column(
            name = "registrationNo",
            columnDefinition = "TEXT default 'REG00001'",
            nullable = false
    )
    String registrationNo = "REG00001";

    @Column(
            name = "email",
            columnDefinition = "TEXT"
    )
    private String email;

    @Column(
            name = "address",
            columnDefinition = "TEXT"
    )
    private String address;

    @OneToMany(
            mappedBy = "business",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Set<User> users;

    @OneToMany(
            mappedBy = "business",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Bus> buses;

    @OneToMany(
            mappedBy = "business",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Employee> employees;

    @OneToMany(
            mappedBy = "business",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Route> routes;

    @OneToMany(
            mappedBy = "business",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Document> document;

    @OneToMany(
            mappedBy =  "business",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Advertisement> advertisements;

    @OneToMany(
            mappedBy = "business",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Review> reviews;

    @OneToMany(
            mappedBy = "business",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Ledger> ledgers;

    @OneToMany(
            mappedBy = "business",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Trip>  trips;


}
