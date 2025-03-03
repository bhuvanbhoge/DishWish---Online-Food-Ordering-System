package com.food.service;


import com.food.entity.DeliveryBoy;
import com.food.repository.DeliveryBoyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryBoyService {

    @Autowired
    private DeliveryBoyRepository deliveryBoyRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;



    // ************* Delivery Boy Save Service **********************
    public DeliveryBoy saveDeliveryBoy(DeliveryBoy deliveryBoy){


        // ****** Encode Password *********
        if(deliveryBoy != null){
           String encryptedPassword = bCryptPasswordEncoder.encode(deliveryBoy.getPassword());
           deliveryBoy.setPassword(encryptedPassword);
        }
        return deliveryBoyRepository.save(deliveryBoy);
    }


    // ************* Login Delivery Boy Service **********************
    public DeliveryBoy loginDeliveryBoy(DeliveryBoy deliveryBoy){

        DeliveryBoy deliveryBoy1 = deliveryBoyRepository.findByEmailId(deliveryBoy.getEmailId());

        if(deliveryBoy1 != null){
            if (bCryptPasswordEncoder.matches(deliveryBoy.getPassword(), deliveryBoy1.getPassword())){
                return deliveryBoy1;
            }
        }
        return null;
    }



    // ************* Get All Delivery Boy Service **********************
    public List<DeliveryBoy> deliveryBoyList(){
        return deliveryBoyRepository.findAll();
    }

    // ************* Get Delivery Boy by Id Service **********************
    public DeliveryBoy getDeliveryBoyById(int id){
        return deliveryBoyRepository.findById(id).orElse(null);
    }


}
