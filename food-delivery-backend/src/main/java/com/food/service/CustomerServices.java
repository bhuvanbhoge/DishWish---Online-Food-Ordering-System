package com.food.service;


import com.food.entity.Customer;
import com.food.entity.CustomerAddress;
import com.food.repository.CustomerAddressRepository;
import com.food.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServices {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerAddressRepository customerAddressRepository;


    // **************** Save Customer Service ******************
    public Customer saveCustomer(Customer customer){

        if(customer.getCustomerAddresses() !=null){
            for (CustomerAddress address : customer.getCustomerAddresses()) {
                address.setCustomer(customer); // Set the customer reference
            }
        }
        return customerRepository.save(customer);
    }



    // **************** Login Customer Service **********************
    public Customer loginCustomerService(Customer customer){
        Customer customer1 = customerRepository.findByCustEmailAndPassword(customer.getCustEmail(), customer.getPassword());

        if(customer1 != null){
            return customer1;
        }else{
            return null;
        }

    }

    // **************** Save Customer Address Service ******************
    public CustomerAddress saveCustomerAddress(CustomerAddress customerAddress, int custId){

        Customer customer = customerRepository.findById(custId).orElse(null);

        if(customer!=null){
            customerAddress.setCustomer(customer);
            return  customerAddressRepository.save(customerAddress);
        }
        return null;
    }


    // **************** Get Customer Address Service ******************
    public List<CustomerAddress> getCustomerAddress(int cusId){
        Customer customer = customerRepository.findById(cusId).orElse(null);
        if(customer != null){
            return customerAddressRepository.findByCustomer(customer);
        }
        return null;
    }


    // **************** Get One Customer Address Service ******************
    public CustomerAddress getCustomerAddressById(int id){
        return customerAddressRepository.findById(id).orElse(null);
    }

    // **************** Update Customer Address Service ******************
    public CustomerAddress updateCustomerAddress(CustomerAddress customerAddress, int id){

        CustomerAddress customerAddress1 = customerAddressRepository.findById(id).orElse(null);

        if(customerAddress1 != null){
            customerAddress1.setStreet(customerAddress.getStreet());
            customerAddress1.setCity(customerAddress.getCity());
            customerAddress1.setState(customerAddress.getState());
            customerAddress1.setZipcode(customerAddress.getZipcode());

            return customerAddressRepository.save(customerAddress1);
        }
        return null;
    }


    // **************** Delete Customer Address Service ******************
    public boolean deleteCustomerAddress(int id){
        customerAddressRepository.deleteById(id);
        return true;
    }

}
