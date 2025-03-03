package com.food.repository;

import com.food.entity.DeliveryBoy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryBoyRepository extends JpaRepository<DeliveryBoy, Integer> {
    DeliveryBoy findByEmailId(String emailId);
}
