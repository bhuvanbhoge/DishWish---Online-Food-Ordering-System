package com.food.service;


import com.food.entity.Customer;
import com.food.entity.CustomerAddress;
import com.food.repository.CustomerAddressRepository;
import com.food.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServices {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerAddressRepository customerAddressRepository;


    // **************** Save Customer Service ******************
    public Customer saveCustomer(Customer customer){

        for (CustomerAddress address : customer.getCustomerAddresses()) {
            address.setCustomer(customer); // Set the customer reference
        }

        return customerRepository.save(customer);
    }

    // **************** Save Customer Address Service ******************
    public CustomerAddress saveCustomerAddress(CustomerAddress customerAddress, int custId){

        //customerAddress.setCustomer(customer);
        return  customerAddressRepository.save(customerAddress);
    }

}
