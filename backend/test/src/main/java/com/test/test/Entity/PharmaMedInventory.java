package com.test.test.Entity;

import jakarta.persistence.*;

@Entity
public class PharmaMedInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer phId;

    @ManyToOne
    @JoinColumn(name = "m_id", nullable = false)
    private DrugData drugData;

    private Integer quantity;

    private Double pricePerPill;

    // Default constructor
    public PharmaMedInventory() {
    }

    // Constructor with parameters
    public PharmaMedInventory(Integer phId, DrugData drugData, Integer quantity, Double pricePerPill) {
        this.phId = phId;
        this.drugData = drugData;
        this.quantity = quantity;
        this.pricePerPill = pricePerPill;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPhId() {
        return phId;
    }

    public void setPhId(Integer phId) {
        this.phId = phId;
    }

    public DrugData getDrugData() {
        return drugData;
    }

    public void setDrugData(DrugData drugData) {
        this.drugData = drugData;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPricePerPill() {
        return pricePerPill;
    }

    public void setPricePerPill(Double pricePerPill) {
        this.pricePerPill = pricePerPill;
    }
}
