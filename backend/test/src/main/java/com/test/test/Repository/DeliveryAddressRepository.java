package com.test.test.Repository;

import com.test.test.Entity.ContactInformation;
import com.test.test.Entity.DeliveryAddressInformation;
import com.test.test.Entity.PaymentInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryAddressRepository extends JpaRepository<DeliveryAddressInformation, Long> {
    // You can add custom queries here if needed
    boolean existsByMembershipId(String membershipId);
    DeliveryAddressInformation findByMembershipId(String membershipId);
    List<DeliveryAddressInformation> findAllByMembershipId(String membershipId);
}

