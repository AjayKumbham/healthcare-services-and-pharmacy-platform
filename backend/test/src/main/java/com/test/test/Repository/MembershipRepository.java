package com.test.test.Repository;


import com.test.test.Entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {

    
    Optional<Membership> findById(Long id);

    List<Membership> findAll();

} 
