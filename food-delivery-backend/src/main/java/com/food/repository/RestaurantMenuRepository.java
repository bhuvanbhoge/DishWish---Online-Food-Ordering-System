package com.food.repository;

import com.food.entity.RestaurantsMenuList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantMenuRepository extends JpaRepository<RestaurantsMenuList, Integer> {
}
