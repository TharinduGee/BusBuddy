package com.example.BusBuddy.models;


import jakarta.persistence.*;
import lombok.*;

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
    String email;

    @Column(
            name = "address",
            columnDefinition = "TEXT"
    )
    String address;

    @OneToMany(mappedBy = "business")
    private Set<User> users;

    @OneToMany(mappedBy = "business")
    private Set<Bus> buses;

}
