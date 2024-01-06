package com.example.BusBuddy.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "employee")
@Table(
        name = "employee"
)
public class Employee {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "employee_sequence"
    )
    @SequenceGenerator(
            name = "employee_sequence",
            sequenceName = "employee_sequence",
            allocationSize = 1
    )
    @Column(
            name = "empId",
            updatable = false
    )
    private Long empId ;

    @Column(
            name = "name",
            nullable = false
    )
    private String name;

    @Column(
            name = "joinedDate"
    )
    private Date joinedDate;

    @Column(
            name = "bDay",
            nullable = false
    )
    private Date bDay;

    @Column(
            name = "age"
    )
    private Integer age;

    @Column(
            name = "salary"
    )
    private Float Salary;

    @OneToOne(mappedBy = "employee")
    private User user;

    @Transient
    public Integer getAge() {
        if (bDay == null) {
            return null; // Handle the case where birthday is not set
        }

        LocalDate birthDate = bDay.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate currentDate = LocalDate.now();

        return Period.between(birthDate, currentDate).getYears();
    }

    // Update age before persisting or updating
    @PrePersist
    @PreUpdate
    private void updateAge() {
        this.age = getAge();
    }
}
