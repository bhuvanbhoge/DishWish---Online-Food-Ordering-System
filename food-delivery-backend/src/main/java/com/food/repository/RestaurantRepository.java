package com.food.repository;

import com.food.entity.Restaurants;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurants, Integer> {
}
