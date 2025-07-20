package com.test.test.Repository;


import com.test.test.Entity.PharmaMedInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PharmaMedInventoryRepository extends JpaRepository<PharmaMedInventory, Long> {

    List<PharmaMedInventory> findByPhId(Integer phId);
}
