package com.food.controller;


import com.food.entity.Customer;
import com.food.entity.CustomerAddress;
import com.food.service.CustomerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")        //
public class CustomerController {

    @Autowired
    private CustomerServices customerServices;



    // **************** Save Customer Details **********************
    @PostMapping("/save" )
    public ResponseEntity<?> saveCustomer(@RequestBody Customer customer){
        System.out.println(customer);
        return new ResponseEntity<>(customerServices.saveCustomer(customer), HttpStatus.CREATED);
    }

    // **************** Save Customer Address *************************
    @PostMapping("/saveAddress/{custId}")
    public CustomerAddress saveCustomerAddress(@RequestBody CustomerAddress customerAddress, @PathVariable int custId){

        return customerServices.saveCustomerAddress(customerAddress, custId);

    }

}
