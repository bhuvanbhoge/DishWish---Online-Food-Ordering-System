package com.food.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;


@Entity
public class RestaurantsMenuList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int menuId;
    private String menuName;
    private String menuDesc;
    private String menuType;
    private String menuCategory;
    private double menuPrice;
    private boolean menuAvailable;

    @ManyToOne
    @JoinColumn(name = "resId", nullable = false)
    @JsonBackReference
    private Restaurants restaurants;


    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getMenuDesc() {
        return menuDesc;
    }

    public void setMenuDesc(String menuDesc) {
        this.menuDesc = menuDesc;
    }

    public String getMenuType() {
        return menuType;
    }

    public void setMenuType(String menuType) {
        this.menuType = menuType;
    }

    public String getMenuCategory() {
        return menuCategory;
    }

    public void setMenuCategory(String menuCategory) {
        this.menuCategory = menuCategory;
    }

    public double getMenuPrice() {
        return menuPrice;
    }

    public void setMenuPrice(double menuPrice) {
        this.menuPrice = menuPrice;
    }

    public boolean isMenuAvailable() {
        return menuAvailable;
    }

    public void setMenuAvailable(boolean menuAvailable) {
        this.menuAvailable = menuAvailable;
    }



    public Restaurants getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(Restaurants restaurants) {
        this.restaurants = restaurants;
    }

    @Override
    public String toString() {
        return "RestaurantsMenuList{" +
                "menuId=" + menuId +
                ", menuName='" + menuName + '\'' +
                ", menuDesc='" + menuDesc + '\'' +
                ", menuType='" + menuType + '\'' +
                ", menuCategory='" + menuCategory + '\'' +
                ", menuPrice=" + menuPrice +
                ", menuAvailable=" + menuAvailable +
                ", restaurants=" + restaurants +
                '}';
    }
}
