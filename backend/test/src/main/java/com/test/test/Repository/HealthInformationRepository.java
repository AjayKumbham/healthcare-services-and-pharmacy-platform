package com.test.test.Repository;

import com.test.test.Entity.DeliveryAddressInformation;
import com.test.test.Entity.HealthInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthInformationRepository extends JpaRepository<com.test.test.Entity.HealthInformation, Long> {
    boolean existsByMembershipId(String membershipId);
    HealthInformation findByMembershipId(String membershipId);
    HealthInformation findByName(String name);
}
