package com.test.test.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "health_information")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HealthInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String membershipId;
    private String healthConditions;
    private String allergies;
    private String currentMedications;
    private String name;
}
