package com.test.test.Repository;

import com.test.test.Entity.DeliveryAddressInformation;
import com.test.test.Entity.PaymentInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentInformationRepository extends JpaRepository<PaymentInformation, Long> {
    // This will work with Long as the primary key (id)
    boolean existsByMembershipId(String membershipId);
    List<PaymentInformation> findAllByMembershipId(String membershipId);
    PaymentInformation findByMembershipId(String membershipId);
}
