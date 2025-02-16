package com.food.service;

import com.food.entity.Restaurants;
import com.food.entity.RestaurantsMenuList;
import com.food.repository.RestaurantMenuRepository;
import com.food.repository.RestaurantRepository;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private RestaurantMenuRepository restaurantMenuRepository;

    // ************** Save Restaurant Service ********************
    public Restaurants saveRestaurantService(Restaurants restaurant){

        // get image and save into folder and put the path in database

        String filePath = null;
        if (restaurant.getResImage() != null) {
            byte[] bytes;
            try {
                bytes = restaurant.getResImage().getBytes();
                filePath = "G:/College/New Start/Food Delivery/Images/Restaurant/"+restaurant.getResImage().getOriginalFilename();

                File file = new File(filePath);

                FileUtils.writeByteArrayToFile(file, bytes);
                restaurant.setResImagePath(filePath);

            }catch (Exception e){
                e.printStackTrace();
            }
        }

        if (restaurant.getRestaurantsMenuLists() != null){

            for (RestaurantsMenuList restaurantsMenuList : restaurant.getRestaurantsMenuLists()) {
                restaurantsMenuList.setRestaurants(restaurant); // Set the customer reference
            }
        }


        return restaurantRepository.save(restaurant);
    }



    // *************** Save Restaurant Menu Service *****************
    public RestaurantsMenuList restaurantMenuList(RestaurantsMenuList restaurantsMenuList, int resId){


        // Save image path only into database
        String filePath = null;
        if (restaurantsMenuList.getMenuImage() != null){
            byte[] bytes;
            try {
                bytes = restaurantsMenuList.getMenuImage().getBytes();

                filePath = "G:/College/New Start/Food Delivery/Images/Restaurant Menu/"+restaurantsMenuList.getMenuImage().getOriginalFilename();

                File file = new File(filePath);
                FileUtils.writeByteArrayToFile(file, bytes);

                restaurantsMenuList.setMenuImagePath(filePath);

            }catch (Exception e){
                e.printStackTrace();
            }

        }


        return restaurantMenuRepository.save(restaurantsMenuList);

    }


}
