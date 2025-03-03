package com.food.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;


@Entity
public class FoodOrders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ordId;

    @Transient
    private int customer;

    @Transient
    private int customerAddress;

    @ManyToOne
    @JoinColumn(name = "custId")
    private Customer customerDetail;

    @ManyToOne
    @JoinColumn(name = "addId")
    private CustomerAddress customerAddressDetail;

    private double ordBill;

    @ManyToOne
    @JoinColumn(name = "resId")
    private Restaurants restaurants;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(
            joinColumns = @JoinColumn(name = "ordId"),
            inverseJoinColumns = @JoinColumn(name = "menuId")
    )
    @JsonIgnore
    private List<RestaurantsMenuList> orderMenuList;
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime orderPlaceDate;
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime orderDeliverDate;
    private String orderStatus;

    @ManyToOne
    @JoinColumn()
    @JsonBackReference
    private DeliveryBoy deliveryBoy;


    private List<Integer> orderMenuIntegerList;
    private List<Integer> orderMenuQuantity;


    public int getOrdId() {
        return ordId;
    }

    public void setOrdId(int ordId) {
        this.ordId = ordId;
    }

    public int getCustomer() {
        return customer;
    }

    public void setCustomer(int customer) {
        this.customer = customer;
    }

    public int getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(int customerAddress) {
        this.customerAddress = customerAddress;
    }

    public double getOrdBill() {
        return ordBill;
    }

    public void setOrdBill(double ordBill) {
        this.ordBill = ordBill;
    }

    public Restaurants getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(Restaurants restaurants) {
        this.restaurants = restaurants;
    }

    public List<RestaurantsMenuList> getOrderMenuList() {
        return orderMenuList;
    }

    public void setOrderMenuList(List<RestaurantsMenuList> orderMenuList) {
        this.orderMenuList = orderMenuList;
    }

    public LocalDateTime getOrderPlaceDate() {
        return orderPlaceDate;
    }

    public void setOrderPlaceDate(LocalDateTime orderPlaceDate) {
        this.orderPlaceDate = orderPlaceDate;
    }

    public LocalDateTime getOrderDeliverDate() {
        return orderDeliverDate;
    }

    public void setOrderDeliverDate(LocalDateTime orderDeliverDate) {
        this.orderDeliverDate = orderDeliverDate;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public DeliveryBoy getDeliveryBoy() {
        return deliveryBoy;
    }

    public void setDeliveryBoy(DeliveryBoy deliveryBoy) {
        this.deliveryBoy = deliveryBoy;
    }

    public List<Integer> getOrderMenuIntegerList() {
        return orderMenuIntegerList;
    }

    public void setOrderMenuIntegerList(List<Integer> orderMenuIntegerList) {
        this.orderMenuIntegerList = orderMenuIntegerList;
    }

    public List<Integer> getOrderMenuQuantity() {
        return orderMenuQuantity;
    }

    public void setOrderMenuQuantity(List<Integer> orderMenuQuantity) {
        this.orderMenuQuantity = orderMenuQuantity;
    }

    public Customer getCustomerDetail() {
        return customerDetail;
    }

    public void setCustomerDetail(Customer customerDetail) {
        this.customerDetail = customerDetail;
    }

    public CustomerAddress getCustomerAddressDetail() {
        return customerAddressDetail;
    }

    public void setCustomerAddressDetail(CustomerAddress customerAddressDetail) {
        this.customerAddressDetail = customerAddressDetail;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "ordId=" + ordId +
                ", customer=" + customer +
                ", customerAddress=" + customerAddress +
                ", ordBill=" + ordBill +
                ", orderPlaceDate=" + orderPlaceDate +
                ", orderDeliverDate=" + orderDeliverDate +
                ", orderStatus='" + orderStatus + '\'' +
                ", deliveryBoy=" + deliveryBoy +
                '}';
    }


}
