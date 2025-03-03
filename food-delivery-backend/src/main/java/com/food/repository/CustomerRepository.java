package com.food.repository;

import com.food.entity.Customer;
import com.food.entity.CustomerAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer findByCustEmailAndPassword(String custEmail, String password);


}
