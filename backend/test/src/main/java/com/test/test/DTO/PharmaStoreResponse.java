package com.test.test.DTO;

import com.test.test.Entity.PharmaStores;

public class PharmaStoreResponse {
    private Integer phId;  
    private String address;  
    private String contact;  
    private String username; // Added username field  
    private Integer sd; // Integer type for sd  
    private Integer hd; // Integer type for hd  
    private Integer userId; // Added userId field  

    public PharmaStoreResponse(PharmaStores pharmaStore, String username, Integer userId) {
        this.phId = pharmaStore.getPhId();  
        this.address = pharmaStore.getAddress();  
        this.contact = pharmaStore.getContact();  
        this.username = username; // Set username from UserDetails  
        this.sd = pharmaStore.getSd(); // Fetch sd from PharmaStores  
        this.hd = pharmaStore.getHd(); // Fetch hd from PharmaStores  
        this.userId = userId; // Set userId  
    }  

    // Getters and Setters  
    public Integer getPhId() {  
        return phId;  
    }  

    public void setPhId(Integer phId) {  
        this.phId = phId;  
    }  

    public String getAddress() {  
        return address;  
    }  

    public void setAddress(String address) {  
        this.address = address;  
    }  

    public String getContact() {  
        return contact;  
    }  

    public void setContact(String contact) {  
        this.contact = contact;  
    }  

    public String getUsername() {  
        return username;  
    }  

    public void setUsername(String username) {  
        this.username = username;  
    }  

    public Integer getSd() {  
        return sd; // Getter for sd  
    }  

    public void setSd(Integer sd) {  
        this.sd = sd; // Setter for sd  
    }  

    public Integer getHd() {  
        return hd; // Getter for hd  
    }  

    public void setHd(Integer hd) {  
        this.hd = hd; // Setter for hd  
    }  

    public Integer getUserId() {  
        return userId; // Getter for userId  
    }  

    public void setUserId(Integer userId) {  
        this.userId = userId; // Setter for userId  
    }  
}