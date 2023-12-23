package com.example.BusBuddy.models;


import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "business")
@ToString
@Table(
        name = "business",
        uniqueConstraints = {
                @UniqueConstraint(name = "business_email_unique" , columnNames = "email"),
                @UniqueConstraint(name = "business_registrationNo_unique" , columnNames = "registrationNo"),
        }
)
public class Business {

    @Id
    @SequenceGenerator(
            name = "business_sequence",
            sequenceName = "business_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE ,
            generator = "user_sequence"
    )
    @Column(
                    name = "bId",
                    updatable = false
    )
    Long bId;

    @Column(
            name = "bName",
            columnDefinition = "TEXT default 'Your Bus Business'"
    )
    String bName;

    @Column(
            name = "registrationNo",
            columnDefinition = "TEXT default 'REG00001'"
    )
    String registrationNo;

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




}
