package com.food.controller;

import com.food.entity.FoodOrders;
import com.food.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food-orders")
@CrossOrigin("*")
public class OrdersController {

    @Autowired
    private OrderService orderService;

    // ***************** Place Order ********************
    @PostMapping("/placeOrder")
    public FoodOrders placeOrders(@RequestBody FoodOrders orders){
        System.out.println("Data : "+orders);

        return orderService.saveOrders(orders);
    }

    // *************** Get All order List *******
    @GetMapping("/getAllOrders")
    public List<FoodOrders> getAllOrdersList(){
        return orderService.getAllOrders();
    }

    // ************* Get All Current Placed orders  **********
    @GetMapping("/getAllCurrentPlacedOrders")
    public List<FoodOrders> getAllCurrentPlacedOrders(){
        return orderService.getAllCurrentPlacedOrders();
    }

    // ************* Get All Current Accepted & On the Way orders  **********
    @GetMapping("/getAllAcceptOntheWayOrders/{id}")
    public List<FoodOrders> getAllAcceptOnTheWayOrders(@PathVariable int id){
        return orderService.getAllAcceptOnTheWayOrders(id);
    }



    // ***************** Accept Order Delivery Boy **********
    @GetMapping("/acceptOrder/{orderId}/{deliveryBoyId}")
    public FoodOrders acceptOrder(@PathVariable int orderId, @PathVariable int deliveryBoyId){
        return orderService.orderAcceptByDeliveryBoy(orderId, deliveryBoyId);
    }


    // ***************** Deliver Order Delivery Boy **********
    @GetMapping("/deliver-order/{orderId}")
    public FoodOrders deliverOrder(@PathVariable int orderId){
        return orderService.orderDeliver(orderId);
    }

    // ***************** Deliver Order Delivery Boy **********
    @GetMapping("/deliveryBoyOrderHistory/{deliveryBoy}")
    public List<FoodOrders> getDeliveredOrderByDeliveryBoy(@PathVariable int deliveryBoy){
        return orderService.getDeliveredOrderByDeliveryBoy(deliveryBoy);
    }



    // ********************************************************
    // ***************** Customer Current Orders  **********
    @GetMapping("/getCurrentCustomerOrders/{custId}")
    public List<FoodOrders> getAllCustomerCurrentOrders(@PathVariable int custId){

        return orderService.getAllCustomerCurrentOrders(custId);
    }

    // ***************** Customer Delivered Orders **********
    @GetMapping("/getDeliveredCustomerOrders/{custId}")
    public List<FoodOrders> getAllCustomerDeliveredOrders(@PathVariable int custId){

        return orderService.getAllCustomerDeliveredOrders(custId);
    }



    // ******************************************************
    // ***************** List of Orders for Restaurant Orders **********
    @GetMapping("/getAllAcceptOrderForRestaurant/{resId}")
    public List<FoodOrders> getAllAcceptOrdersByRestaurant(@PathVariable int resId){
        return orderService.getAllAcceptOrdersForRestaurant(resId);
    }


    // ***************** Customer Delivered Orders **********
    @GetMapping("/deliver-order-ontheway/{ordId}")
    public FoodOrders deliveredOrderByRestaurant(@PathVariable int ordId){
        return orderService.deliverOrderByRestaurant(ordId);
    }

    // ***************** List of Orders for Restaurant Orders **********
    @GetMapping("/getRestaurantDeliveredOrders/{resId}")
    public List<FoodOrders> getAllRestaurantDeliveredOrders(@PathVariable int resId){
        return orderService.getAllRestaurantDeliveredOrders(resId);
    }
}
