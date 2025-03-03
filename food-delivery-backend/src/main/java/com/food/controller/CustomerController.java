package com.food.controller;


import com.food.entity.Customer;
import com.food.entity.CustomerAddress;
import com.food.service.CustomerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerServices customerServices;



    // **************** Save Customer Details **********************
    @PostMapping("/save" )
    public ResponseEntity<?> saveCustomer(@RequestBody Customer customer){
        System.out.println(customer);
        return new ResponseEntity<>(customerServices.saveCustomer(customer), HttpStatus.CREATED);
    }

    // **************** Login Customer Details **********************
    @PostMapping("/login")
    public Customer loginCustomer(@RequestBody Customer customer){
        return customerServices.loginCustomerService(customer);
    }


    // **************** Save Customer Address *************************
    @PostMapping("/saveAddress/{custId}")
    public CustomerAddress saveCustomerAddress(@RequestBody CustomerAddress customerAddress, @PathVariable int custId){

        return customerServices.saveCustomerAddress(customerAddress, custId);
    }


    // **************** Get All Customer Address Controller *************************
    @GetMapping("/getAllCustomerAddressList/{id}")
    public List<CustomerAddress> getAllCustomerAddressList(@PathVariable int id){
        return customerServices.getCustomerAddress(id);
    }

    // **************** Get One Customer Address Controller *************************
    @GetMapping("/getCustomerAddressById/{id}")
    public CustomerAddress getCustomerAddressById(@PathVariable int id){
        return customerServices.getCustomerAddressById(id);
    }


    // **************** Update Customer Address Controller *************************
    @PostMapping("/updateCustomerAddress/{id}")
    public CustomerAddress updateCustomerAddress(@RequestBody CustomerAddress customerAddress, @PathVariable int id){
        return customerServices.updateCustomerAddress(customerAddress, id);
    }

    // **************** Delete Customer Address Controller *************************
    @DeleteMapping("/deleteCustomerAddress/{id}")
    public ResponseEntity<String> deleteCustomerAddress(@PathVariable int id){

        if(customerServices.deleteCustomerAddress(id)){
            return ResponseEntity.ok("Delete Successfull");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Delete failed");
        }
    }

}
