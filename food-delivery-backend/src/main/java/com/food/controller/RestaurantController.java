package com.food.controller;

import com.food.entity.Restaurants;
import com.food.entity.RestaurantsMenuList;
import com.food.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;


    // *************** Save Restaurants Controller ******************
    @PostMapping(value = "/saveRestaurant")
    @CrossOrigin("http://localhost:3000")
    public Restaurants saveRestaurant(@ModelAttribute Restaurants restaurants){
        return restaurantService.saveRestaurantService(restaurants);
    }


    // ************* Save Restaurant Menu Controller ***********************
    @PostMapping("/saveRestaurantMenu/{resId}")
    public RestaurantsMenuList saveRestaurantMenu(@ModelAttribute RestaurantsMenuList restaurantsMenuList, @PathVariable int resId){
        return restaurantService.restaurantMenuList(restaurantsMenuList, resId);
    }

}
