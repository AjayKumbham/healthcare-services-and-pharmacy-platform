package com.test.test.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.test.test.Entity.UserOrders;

@Repository
public interface UserOrdersRepository extends JpaRepository<UserOrders, Long> {

    @Query("SELECT o FROM UserOrders o WHERE o.membershipId = :membershipId")
    List<UserOrders> findUserOrders(String membershipId);

    @Query("SELECT o FROM UserOrders o WHERE o.orderId = :orderId")
    Optional<UserOrders> findById(Long orderId);

    @Modifying
    @Transactional
    @Query("UPDATE UserOrders o SET o.status = 'Cancelled' WHERE o.orderId = :orderId")
    void cancelOrder(Long orderId);
}
