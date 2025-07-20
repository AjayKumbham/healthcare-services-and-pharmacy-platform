package com.test.test.Repository;


import com.test.test.Entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    

    List<Prescription> findByMembershipId(String membershipId);

    Optional<Prescription> findById(Long id);
}
