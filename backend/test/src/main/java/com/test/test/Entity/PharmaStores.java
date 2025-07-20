package com.test.test.Entity;

import jakarta.persistence.*;

@Entity
public class PharmaStores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer phId;


    @Column(nullable = false)
    private Integer userId;

    @Column(nullable = true)
    private String address;

    @Column(nullable = true)
    private Integer hd; // 1 for home delivery, 0 for no home delivery

    @Column(nullable = true)
    private String contact;

    @Column(nullable = true)
    private Integer sd; // Supply days

    @Column(nullable = true)
    private String storeName;

    // Default constructor
    public PharmaStores() {}

    // Constructor excluding phId as it's auto-generated
    public PharmaStores(Integer userId, String address, Integer hd, String contact, Integer sd,String storeName) {
        this.userId = userId;
        this.address = address;
        this.hd = hd;
        this.contact = contact;
        this.sd = sd;
        this.storeName = storeName;
    }

    // Getters and Setters

    public Integer getPhId() {
        return phId;
    }

    public void setPhId(Integer phId) {
        this.phId = phId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getHd() {
        return hd;
    }

    public void setHd(Integer hd) {
        this.hd = hd;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Integer getSd() {
        return sd;
    }

    public void setSd(Integer sd) {
        this.sd = sd;
    }

    public String getStoreName() {return storeName;}
    public void setStoreName(String storeName) {}
}
