package com.example.BusBuddy.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;

import java.security.DomainLoadStoreParameter;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;
import java.util.Set;

@Data
@Builder
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
            name = "bDay"
    )
    private Date bDay;

    @Column(
            name = "age"
    )
    private Integer age;

    @Column(
            name = "salary",
            nullable = false
    )
    private Float salary;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "designation",
            nullable = false
    )
    private EmployeeType designation;

    @OneToOne(mappedBy = "employee")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "bId",
            foreignKey = @ForeignKey(name = "fk_bId")
    )
    private Business business;

    @OneToOne(
            mappedBy = "employee"
    )
    private Document document;


    @Transient
    public Integer getAge() {
        if (bDay == null) {
            return null;
        }

        LocalDate birthDate = bDay.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate currentDate = LocalDate.now();

        return Period.between(birthDate, currentDate).getYears();
    }

    @PrePersist
    @PreUpdate
    private void updateAge() {
        this.age = getAge();
    }
}
