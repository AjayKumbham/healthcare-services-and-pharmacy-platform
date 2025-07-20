package com.test.test.Repository;


import com.test.test.Entity.PharmaStores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PharmaStoresRepository extends JpaRepository<PharmaStores, Integer> {

    Optional<PharmaStores> findByUserId(Integer userId);

    Optional<PharmaStores> findByPhId(Integer phId);

}

