package com.food.repository;

import com.food.entity.Customer;
import com.food.entity.DeliveryBoy;
import com.food.entity.FoodOrders;
import com.food.entity.Restaurants;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<FoodOrders, Integer> {
    List<FoodOrders> findByDeliveryBoyAndOrderStatus(DeliveryBoy deliveryBoy, String ontheway);

    List<FoodOrders> findAllByOrderStatus(String placed);

    List<FoodOrders> findAllByOrderStatusInAndDeliveryBoy(List<String> list, DeliveryBoy deliveryBoy);

    List<FoodOrders> findByCustomerDetailAndOrderStatusNot(Customer customer, String deliver);

    List<FoodOrders> findByCustomerDetailAndOrderStatus(Customer customer, String deliver);

    List<FoodOrders> findByRestaurantsAndOrderStatus(Restaurants restaurants, String accept);

    List<FoodOrders> findByRestaurantsAndOrderStatusIn(Restaurants restaurants, List<String> list);
}
