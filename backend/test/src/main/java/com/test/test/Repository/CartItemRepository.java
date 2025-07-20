package com.test.test.Repository;

import com.test.test.Entity.CartItem;
import com.test.test.Entity.PrimaryUser;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {



    @Query("SELECT c FROM CartItem c WHERE c.membershipId = :membershipId")
    List<CartItem> findByMembershipId(String membershipId);

    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.membershipId = :membershipId AND c.medication.mId = :medId AND c.pharmacy.phId = :pharmId")
    void deleteByUserIdAndMedicationIdAndPharmacyId(String membershipId, Integer medId, Integer pharmId);

    @Query("SELECT c FROM CartItem c WHERE c.membershipId = :membershipId")
    List<CartItem> findUserCart(String membershipId);

    @Query("SELECT c FROM CartItem c WHERE c.pharmacy.phId = :phId AND c.medication.mId = :mId")
    CartItem findCartItemByMedicationAndPharmacy(Integer phId, Integer mId);



}

