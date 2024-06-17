package com.example.BusBuddy.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "passwordResetToken")
@Table(name = "passwordResetToken")
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(
            name = "token_sequence",
            sequenceName = "token_sequence",
            allocationSize = 1
    )
    @Column(name = "tokenId")
    private Long tokenId;

    @Column(name = "token",
            nullable = false
    )
    private String token;

    @Column(name = "expire_date_time"
        ,nullable = false
    )
    private LocalDateTime expirationDateTime;

    @OneToOne(mappedBy = "passwordResetToken")
    private User user;
}
