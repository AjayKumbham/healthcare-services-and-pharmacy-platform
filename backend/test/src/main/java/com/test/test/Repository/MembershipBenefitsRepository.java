package com.test.test.Repository;


import com.test.test.Entity.MembershipBenefits;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MembershipBenefitsRepository extends JpaRepository<MembershipBenefits, Long> {

    List<MembershipBenefits> findAll();

    @Query("SELECT mb.benefit FROM MembershipBenefits mb WHERE mb.membership.id = :membershipId")
    List<String> findBenefitsFromId(Long membershipId);

    
}