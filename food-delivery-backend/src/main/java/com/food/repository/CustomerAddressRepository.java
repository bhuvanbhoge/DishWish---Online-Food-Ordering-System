package com.food.repository;

import com.food.entity.Customer;
import com.food.entity.CustomerAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerAddressRepository extends JpaRepository<CustomerAddress, Integer> {
    List<CustomerAddress> findByCustomer(Customer customer);
}
