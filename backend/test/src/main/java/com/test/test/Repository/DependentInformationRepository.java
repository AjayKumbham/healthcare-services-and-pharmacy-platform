package com.test.test.Repository;

import com.test.test.Entity.DeliveryAddressInformation;
import com.test.test.Entity.DependentInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DependentInformationRepository extends JpaRepository<DependentInformation, Long> {
    // Additional custom queries can go here if needed
    boolean existsByMembershipId(String membershipId);
    DependentInformation findByMembershipId(String membershipId);
    List<DependentInformation> findAllByMembershipId(String membershipId);
    DependentInformation findByName(String name);
}
