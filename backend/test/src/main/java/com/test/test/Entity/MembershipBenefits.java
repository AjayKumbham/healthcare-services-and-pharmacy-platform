package com.test.test.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "membership_benefits")
public class MembershipBenefits {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "membership_id", referencedColumnName = "id")
    Membership membership;

    @Column(name = "benefit")
    String benefit;

    public String getBenefit() {
        return benefit;
    }

    public void setBenefit(String benefit) {
        this.benefit = benefit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Membership getMembership() {
        return membership;
    }

    public void setMembership(Membership membership) {
        this.membership = membership;
    }
    
}
