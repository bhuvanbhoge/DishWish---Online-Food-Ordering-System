package com.food.controller;

import com.food.entity.DeliveryBoy;
import com.food.service.DeliveryBoyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/delivery-boy")
@CrossOrigin("*")
public class DeliveryBoyController {

    @Autowired
    private DeliveryBoyService deliveryBoyService;

    // ************** Save Delivery Boy Controller **************
    @PostMapping("/save")
    public DeliveryBoy saveDeliveryBoy(@RequestBody DeliveryBoy deliveryBoy){
        return deliveryBoyService.saveDeliveryBoy(deliveryBoy);
    }

    // ************** Login Delivery Boy Controller **************
    @PostMapping("/login")
    public DeliveryBoy loginDeliveryBoy(@RequestBody DeliveryBoy deliveryBoy){
        return deliveryBoyService.loginDeliveryBoy(deliveryBoy);
    }

}
