package com.test.test.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "membership")
public class Membership {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "plan_name")
    String planName;

    @Column(name = "plan_desc")
    String planDesc;

    @Column(name="price_per_month")
    double pricePerMonth;

    @Column(name = "plan_icon")
    String planIcon;

    @Column(name = "plan_discount")
    Integer planDiscount;

    public Integer getPlanDiscount() {
        return planDiscount;
    }

    public void setPlanDiscount(Integer planDiscount) {
        this.planDiscount = planDiscount;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlanDesc() {
        return planDesc;
    }

    public void setPlanDesc(String planDesc) {
        this.planDesc = planDesc;
    }

    public String getPlanIcon() {
        return planIcon;
    }

    public void setPlanIcon(String planIcon) {
        this.planIcon = planIcon;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public double getPricePerMonth() {
        return pricePerMonth;
    }
    public void setPricePerMonth(double pricePerMonth) {
        this.pricePerMonth = pricePerMonth;
    }


}
