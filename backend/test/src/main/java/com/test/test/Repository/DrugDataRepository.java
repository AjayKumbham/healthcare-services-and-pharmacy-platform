package com.test.test.Repository;

import com.test.test.Entity.DrugData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DrugDataRepository extends JpaRepository<DrugData, Integer> {
    Optional<DrugData> findByMedName(String medName);


    Optional<DrugData> findByMId(Integer mId);
}