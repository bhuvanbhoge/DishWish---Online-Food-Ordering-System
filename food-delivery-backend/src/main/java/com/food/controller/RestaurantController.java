package com.food.controller;

import com.food.dto.RestaurantDTO;
import com.food.entity.Restaurants;
import com.food.entity.RestaurantsMenuList;
import com.food.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurant")
@CrossOrigin("*")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;


    // *************** Save Restaurants Controller ******************
    @PostMapping("/saveRestaurant")
    public Restaurants saveRestaurant(@ModelAttribute RestaurantDTO restaurantDTO){

        System.out.println("Data : "+restaurantDTO.getResName());
        return restaurantService.saveRestaurantService(restaurantDTO);
    }

    // *************** Save Restaurants Controller ******************
    @PostMapping("/login")
    public Restaurants loginRestaurant(@RequestBody Restaurants restaurants){
        Restaurants restaurants1 = restaurantService.loginRestaurantService(restaurants);

        return restaurants1;
    }



    // ************* Get Restaurants Controller ***********************
    @GetMapping("/all-restaurant")
    public List<Restaurants> getAllRestaurant(){
        List<Restaurants>restaurants = restaurantService.getAllRestaurants();
        return restaurants;
    }


    // ************* Get Restaurant By Id Controller ***********************
    @GetMapping("/restaurantById/{id}")
    public Restaurants getRestaurantById(@PathVariable int id){
        return restaurantService.getRestaurantById(id);
    }


    // ************* Save Restaurant Menu Controller ***********************
    @PostMapping("/saveRestaurantMenu/{resId}")
    public RestaurantsMenuList saveRestaurantMenu(@RequestBody RestaurantsMenuList restaurantsMenuList, @PathVariable int resId){
        return restaurantService.restaurantMenuList(restaurantsMenuList, resId);
    }


    // ************* get Restaurant Menu Controller ***********************
    @GetMapping("/getRestaurantMenu/{resId}")
    public List<RestaurantsMenuList> getRestaurantsMenuListByResId(@PathVariable int resId){
        return restaurantService.getRestaurantMenuByResId(resId);
    }


    // ***************** Get Restaurant Menu Controller ************
    @GetMapping("/getRestaurantSingleMenu/{id}")
    public RestaurantsMenuList getRestaurantMenu(@PathVariable int id){
        return restaurantService.getRestaurantMenu(id);
    }


    // ****************** Update Restaurant Menu *********************
    @PostMapping("/restaurantMenuUpdate/{id}")
    public RestaurantsMenuList updateRestaurantMenu(@RequestBody RestaurantsMenuList restaurantsMenuList, @PathVariable int id){
        return restaurantService.updateRestaurantMenu(restaurantsMenuList, id);
    }

    @DeleteMapping("/restaurantMenuDelete/{id}")
    public ResponseEntity<String> deleteRestaurantMenu(@PathVariable int id){
        if(restaurantService.deleteRestaurantMenu(id)){
            return ResponseEntity.ok("Delete Successfull");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Delete failed");
        }
    }

    @GetMapping("/getSelectedMenuList/{idList}")
    public List<RestaurantsMenuList> getSelectedMenuList(@PathVariable List<Integer> idList){


        return restaurantService.getSelectedMenuList(idList);
    }


}
