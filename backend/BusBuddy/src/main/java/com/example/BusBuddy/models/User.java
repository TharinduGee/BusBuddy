package com.example.BusBuddy.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(name = "user_email_unique", columnNames = "email"),
                @UniqueConstraint(name = "user_password_unique", columnNames = "password")
        }
)
public class User implements UserDetails {

  @Id
  @GeneratedValue(
          strategy = GenerationType.SEQUENCE,
          generator =  "user_sequence"
  )
  @SequenceGenerator(
          name = "user_sequence",
          sequenceName = "user_sequence",
          allocationSize = 1
  )
  @Column(
          name = "id",
          updatable = false
  )
  private Long id;

  @Column(
          name = "first_name",
          nullable = false,
          columnDefinition = "TEXT"
  )
  String firstName;

  @Column(
          name = "last_name",
          nullable = false,
          columnDefinition = "TEXT"
  )
  String lastName;

  @Column(
          name = "email",
          columnDefinition = "TEXT",
          updatable = false
  )
  String email;

  @Column(
          name = "password",
          columnDefinition = "TEXT",
          updatable = false
  )
  String password;

  @Enumerated(EnumType.STRING)
  Role role;

  @Column(
          name = "mobile_no",
          columnDefinition = "TEXT",
          unique = true
  )
  String mobileNo;

  @Lob
  @Basic(fetch = FetchType.LAZY)
  @Column(name = "image")
  private byte[] image;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "bId"
          ,foreignKey = @ForeignKey(name = "fk_bId")
  )
  private Business business;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(
          name = "empId",
          foreignKey =  @ForeignKey(name = "fk_empId")
  )
  @OnDelete(action = OnDeleteAction.SET_NULL)
  private  Employee employee;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(
          name = "tokenId",
          foreignKey =  @ForeignKey(name = "fk_tokenId")
  )
  @OnDelete(action = OnDeleteAction.SET_NULL)
  private PasswordResetToken passwordResetToken;

  LocalDateTime createdAt;

  LocalDateTime updatedAt;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
      return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public String getUsername() {
    //username is combination of first and last name
      return getEmail();
  }

  @Override
  public boolean isAccountNonExpired() {
      return true;
  }

  @Override
  public boolean isAccountNonLocked() {
      return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
      return true;
  }

  @Override
  public boolean isEnabled() {
      return true;
  }

}
