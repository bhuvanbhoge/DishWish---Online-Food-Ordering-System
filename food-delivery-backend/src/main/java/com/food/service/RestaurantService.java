package com.food.service;

import com.food.dto.RestaurantDTO;
import com.food.entity.Restaurants;
import com.food.entity.RestaurantsMenuList;
import com.food.repository.RestaurantMenuRepository;
import com.food.repository.RestaurantRepository;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private RestaurantMenuRepository restaurantMenuRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;





    // ************** Save Restaurant Service ********************
    public Restaurants saveRestaurantService(RestaurantDTO restaurantDTO){

        // get image and save into folder and put the path in database
        Restaurants restaurant = new Restaurants();
        restaurant.setResName(restaurantDTO.getResName());
        restaurant.setResDescription(restaurantDTO.getResDescription());
        restaurant.setResStreet(restaurantDTO.getResStreet());
        restaurant.setResCity(restaurantDTO.getResCity());
        restaurant.setResDist(restaurantDTO.getResDist());
        restaurant.setResState(restaurantDTO.getResState());
        restaurant.setResPinCode(restaurantDTO.getResPinCode());
        restaurant.setResPhone(restaurantDTO.getResPhone());
        restaurant.setResEmail(restaurantDTO.getResEmail());

        String encryptedPassword = passwordEncoder.encode(restaurantDTO.getResPassword());
        restaurant.setResPassword(encryptedPassword);

        restaurant.setResOpenTime(restaurantDTO.getResOpenTime());
        restaurant.setResCloseTime(restaurantDTO.getResCloseTime());


        String filePath = null;
        if (restaurantDTO.getResImage() != null) {

            byte[] bytes;
            try {
                bytes = restaurantDTO.getResImage().getBytes();
                filePath = "G:/College/New Start/Food Delivery/Images/Restaurant/"+restaurantDTO.getResImage().getOriginalFilename();

                File file = new File(filePath);
                FileUtils.writeByteArrayToFile(file, bytes);

                restaurant.setResImagePath(filePath);

            }catch (Exception e){
                e.printStackTrace();
            }
        }
        return restaurantRepository.save(restaurant);
    }

    // ************** Restaurant Login Service **************************************
    public Restaurants loginRestaurantService(Restaurants restaurants){
        Restaurants restaurants1 = restaurantRepository.findByResEmail(restaurants.getResEmail());

        if(restaurants1 != null){
            if(passwordEncoder.matches(restaurants.getResPassword(), restaurants1.getResPassword())){
                return restaurants1;
            }
        }
        return null;

    }


    // *************** Get All Restaurants Service *****************
    public List<Restaurants> getAllRestaurants(){

        List<Restaurants> restaurantsList = restaurantRepository.findAll();

        restaurantsList.forEach(n -> {

            if (n.getResImagePath() != null) {
                try {
                    Path imagePath = Paths.get(n.getResImagePath()); // Combine base path and relative path
                    byte[] imageData = Files.readAllBytes(imagePath);
                    n.setResImageByte(imageData);

                } catch (IOException e) {
                    n.setResImageByte(null);
                    throw new RuntimeException("Error reading image file: ", e);
                }
            } else {
                n.setResImageByte(null);
            }
        });
        return restaurantsList;
    }


    // ****************************************************************
    // **************   Get Restaurant By Id     *********************
    public Restaurants getRestaurantById(int id){

        Restaurants restaurants = restaurantRepository.findById(id).orElse(null);

        if (restaurants.getResImagePath() != null) {
            try {
                Path imagePath = Paths.get(restaurants.getResImagePath()); // Combine base path and relative path
                byte[] imageData = Files.readAllBytes(imagePath);
                restaurants.setResImageByte(imageData);

            } catch (IOException e) {
                restaurants.setResImageByte(null);
                throw new RuntimeException("Error reading image file: ", e);
            }
        } else {
            restaurants.setResImageByte(null);
        }
        return restaurants;
    }


    // *************** Save Restaurant Menu Service *****************
    public RestaurantsMenuList restaurantMenuList(RestaurantsMenuList restaurantsMenuList, int resId){

        Restaurants restaurants = restaurantRepository.findById(resId).orElse(null);
        restaurantsMenuList.setRestaurants(restaurants);

        return restaurantMenuRepository.save(restaurantsMenuList);
    }


    // ******************************************************************************
    // *****************  Get Restaurant Menu list by Restaurant Id *****************
    public List<RestaurantsMenuList> getRestaurantMenuByResId(int id){
        Restaurants restaurants = restaurantRepository.findById(id).orElse(null);

        return  restaurantMenuRepository.findByRestaurants(restaurants);
    }


    // ********************* Get Single Restaurant Menu Service ***************

    public RestaurantsMenuList getRestaurantMenu(int id){
        return restaurantMenuRepository.findById(id).orElse(null);
    }


    // *****************  Update Restaurant Menu  *****************
    public RestaurantsMenuList updateRestaurantMenu(RestaurantsMenuList restaurantsMenuList, int id){

        RestaurantsMenuList oldRestaurantMenu = restaurantMenuRepository.findById(id).orElse(null);

        if (oldRestaurantMenu != null) {
            // Update fields with new values
            oldRestaurantMenu.setMenuName(restaurantsMenuList.getMenuName());
            oldRestaurantMenu.setMenuDesc(restaurantsMenuList.getMenuDesc());
            oldRestaurantMenu.setMenuType(restaurantsMenuList.getMenuType());
            oldRestaurantMenu.setMenuCategory(restaurantsMenuList.getMenuCategory());
            oldRestaurantMenu.setMenuPrice(restaurantsMenuList.getMenuPrice());
            oldRestaurantMenu.setMenuAvailable(restaurantsMenuList.isMenuAvailable());

            // Save the updated entity
            return restaurantMenuRepository.save(oldRestaurantMenu);
        } else {
            throw new RuntimeException("Menu with ID " + id + " not found");
        }
    }

    // *********** Delete Restaurant Menu Service **************
    public boolean deleteRestaurantMenu(int id){

        restaurantMenuRepository.deleteById(id);
        return true;
    }


    // *********** Get Selected Restaurant Menu List Service **************
    public List<RestaurantsMenuList> getSelectedMenuList(List<Integer> ids){

        //List<Integer> idList = Arrays.stream(ids).boxed().toList();

        return restaurantMenuRepository.findAllById(ids);
    }


}
