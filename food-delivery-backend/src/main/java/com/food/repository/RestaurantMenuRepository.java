package com.food.repository;

import com.food.entity.Restaurants;
import com.food.entity.RestaurantsMenuList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantMenuRepository extends JpaRepository<RestaurantsMenuList, Integer> {


    List<RestaurantsMenuList> findByRestaurants(Restaurants restaurants);
}
