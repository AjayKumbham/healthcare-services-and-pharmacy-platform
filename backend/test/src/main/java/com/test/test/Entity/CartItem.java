package com.test.test.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_item")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String membershipId; // Assumes a User entity exists

    @ManyToOne
    @JoinColumn(name = "phId", nullable = false)
    private PharmaStores pharmacy;

    @ManyToOne
    @JoinColumn(name = "mId", nullable = false)
    private DrugData medication;

    @Column
    private int quantity;

    @Column(nullable = false)
    private double  unitPrice;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMembershipId() {
        return membershipId;
    }

    public void setMembershipId(String membershipId) {
        this.membershipId = membershipId;
    }



    public PharmaStores getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(PharmaStores pharmacy) {
        this.pharmacy = pharmacy;
    }

    public DrugData getMedication() {
        return medication;
    }

    public void setMedication(DrugData medication) {
        this.medication = medication;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }
}

