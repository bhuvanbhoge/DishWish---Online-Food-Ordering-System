package com.food.service;

import com.food.entity.*;
import com.food.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;


@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private DeliveryBoyRepository deliveryBoyRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerAddressRepository customerAddressRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private RestaurantMenuRepository restaurantMenuRepository;


    // ******* Save Orders ******************
    public FoodOrders saveOrders(FoodOrders orders){

        // Get all menu items from order
        List<RestaurantsMenuList> restaurantsMenuListList = restaurantMenuRepository.findAllById(orders.getOrderMenuIntegerList());

        // Assign the restaurant from the first menu item
        if (!restaurantsMenuListList.isEmpty()) {
            Restaurants restaurants = restaurantsMenuListList.get(0).getRestaurants();
            orders.setRestaurants(restaurants);

            Customer customer = customerRepository.findById(orders.getCustomer()).orElse(null);
            orders.setCustomerDetail(customer);

            CustomerAddress customerAddress = customerAddressRepository.findById(orders.getCustomerAddress()).orElse(null);
            orders.setCustomerAddressDetail(customerAddress);

            orders.setOrderStatus("placed");
        }

        return orderRepository.save(orders);
    }


    // ************ Get All Orders ******************************
    public List<FoodOrders> getAllOrders(){
        return orderRepository.findAll();
    }

    // ************* Get All Current placed orders list ***************
    public List<FoodOrders> getAllCurrentPlacedOrders(){
        return orderRepository.findAllByOrderStatus("placed");
    }


    // ************* Get All Current Accepted & OnTheWay orders list ***************
    public List<FoodOrders> getAllAcceptOnTheWayOrders(int deliveryBoyId){
        DeliveryBoy deliveryBoy = deliveryBoyRepository.findById(deliveryBoyId).orElse(null);

        return orderRepository.findAllByOrderStatusInAndDeliveryBoy(Arrays.asList("accept", "ontheway"), deliveryBoy);

    }



    // ************* Order Accept By Delivery Boy ************
    public FoodOrders orderAcceptByDeliveryBoy(int orderId, int deliveryBoyId){

        FoodOrders oldOrder = orderRepository.findById(orderId).orElse(null);
        if(oldOrder != null){

            DeliveryBoy deliveryBoy = deliveryBoyRepository.findById(deliveryBoyId).orElse(null);

            if(deliveryBoy != null){

                oldOrder.setDeliveryBoy(deliveryBoy);
                oldOrder.setOrderStatus("accept");

                return orderRepository.save(oldOrder);
            }
        }
        return null;
    }

    // ************* Order Deliver ************
    public FoodOrders orderDeliver(int orderId){
        FoodOrders oldOrder = orderRepository.findById(orderId).orElse(null);
        if(oldOrder != null){
            oldOrder.setOrderStatus("deliver");
            oldOrder.setOrderDeliverDate(LocalDateTime.now());
            return orderRepository.save(oldOrder);
        }
        return null;
    }


    // ************* Get Delivered Orders By Delivery Boy Id ************
    public List<FoodOrders> getDeliveredOrderByDeliveryBoy(int deliveryBoy){
        DeliveryBoy deliveryBoy1 = deliveryBoyRepository.findById(deliveryBoy).orElse(null);
        if(deliveryBoy1 != null){
            return orderRepository.findByDeliveryBoyAndOrderStatus(deliveryBoy1, "deliver");
        }
        return null;
    }




    // ************* Get Customer's Current Orders By Customer Id ************
    public List<FoodOrders> getAllCustomerCurrentOrders(int custId){
        Customer customer = customerRepository.findById(custId).orElse(null);

        if(customer != null){
            return orderRepository.findByCustomerDetailAndOrderStatusNot(customer, "deliver");
        }
        return null;
    }


    // ************* Get Customer's Delivered Orders By Customer Id ************
    public List<FoodOrders> getAllCustomerDeliveredOrders(int custId){
        Customer customer = customerRepository.findById(custId).orElse(null);

        if(customer != null){
            return orderRepository.findByCustomerDetailAndOrderStatus(customer, "deliver");
        }
        return null;
    }


    // *****************************************************
    // ************* Get Customer's Delivered Orders By Customer Id ************
    public List<FoodOrders> getAllAcceptOrdersForRestaurant(int resId){
        Restaurants restaurants = restaurantRepository.findById(resId).orElse(null);

        if(restaurants != null){
            return orderRepository.findByRestaurantsAndOrderStatus(restaurants, "accept");
        }
        return null;
    }


    // ************* Deliver Order From Restaurant ************
        public FoodOrders deliverOrderByRestaurant(int orderId){
            FoodOrders oldOrder = orderRepository.findById(orderId).orElse(null);
            if(oldOrder != null){
                oldOrder.setOrderStatus("ontheway");
                return orderRepository.save(oldOrder);
            }
            return null;
        }


    // ************* Get Restaurant's Delivered Orders  ************
    public List<FoodOrders> getAllRestaurantDeliveredOrders(int resId){
        Restaurants restaurants = restaurantRepository.findById(resId).orElse(null);

        if(restaurants != null){
            return orderRepository.findByRestaurantsAndOrderStatusIn(restaurants, Arrays.asList("deliver", "ontheway"));
        }
        return null;
    }

}
