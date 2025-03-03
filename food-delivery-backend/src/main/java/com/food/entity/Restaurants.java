package com.food.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Entity
public class Restaurants {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int resId;
    private String resName;
    private String resDescription;

    private String resStreet;
    private String resCity;
    private String resDist;
    private String resState;
    private String resPinCode;
    private String resPhone;

    @Column(unique = true)
    private String resEmail;
    private String resPassword;

    private String resOpenTime;
    private String resCloseTime;

    private String resImagePath;


    @Transient
    private byte[] resImageByte;

    @OneToMany(mappedBy = "restaurants", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<RestaurantsMenuList> restaurantsMenuLists;


    public int getResId() {
        return resId;
    }

    public void setResId(int resId) {
        this.resId = resId;
    }

    public String getResName() {
        return resName;
    }

    public void setResName(String resName) {
        this.resName = resName;
    }

    public String getResDescription() {
        return resDescription;
    }

    public void setResDescription(String resDescription) {
        this.resDescription = resDescription;
    }

    public String getResStreet() {
        return resStreet;
    }

    public void setResStreet(String resStreet) {
        this.resStreet = resStreet;
    }

    public String getResCity() {
        return resCity;
    }

    public void setResCity(String resCity) {
        this.resCity = resCity;
    }

    public String getResDist() {
        return resDist;
    }

    public void setResDist(String resDist) {
        this.resDist = resDist;
    }

    public String getResState() {
        return resState;
    }

    public void setResState(String resState) {
        this.resState = resState;
    }

    public String getResPinCode() {
        return resPinCode;
    }

    public void setResPinCode(String resPinCode) {
        this.resPinCode = resPinCode;
    }

    public String getResPhone() {
        return resPhone;
    }

    public void setResPhone(String resPhone) {
        this.resPhone = resPhone;
    }

    public String getResEmail() {
        return resEmail;
    }

    public void setResEmail(String resEmail) {
        this.resEmail = resEmail;
    }

    public String getResPassword() {
        return resPassword;
    }

    public void setResPassword(String resPassword) {
        this.resPassword = resPassword;
    }

    public String getResOpenTime() {
        return resOpenTime;
    }

    public void setResOpenTime(String resOpenTime) {
        this.resOpenTime = resOpenTime;
    }

    public String getResCloseTime() {
        return resCloseTime;
    }

    public void setResCloseTime(String resCloseTime) {
        this.resCloseTime = resCloseTime;
    }

    public String getResImagePath() {
        return resImagePath;
    }

    public void setResImagePath(String resImagePath) {
        this.resImagePath = resImagePath;
    }

    public List<RestaurantsMenuList> getRestaurantsMenuLists() {
        return restaurantsMenuLists;
    }

    public void setRestaurantsMenuLists(List<RestaurantsMenuList> restaurantsMenuLists) {
        this.restaurantsMenuLists = restaurantsMenuLists;
    }



    public byte[] getResImageByte() {
        return resImageByte;
    }

    public void setResImageByte(byte[] resImageByte) {
        this.resImageByte = resImageByte;
    }

    @Override
    public String toString() {
        return "Restaurants{" +
                "resId=" + resId +
                ", resName='" + resName + '\'' +
                ", resDescription='" + resDescription + '\'' +
                ", resStreet='" + resStreet + '\'' +
                ", resCity='" + resCity + '\'' +
                ", resDist='" + resDist + '\'' +
                ", resState='" + resState + '\'' +
                ", resPinCode='" + resPinCode + '\'' +
                ", resPhone='" + resPhone + '\'' +
                ", resEmail='" + resEmail + '\'' +
                ", resPassword='" + resPassword + '\'' +
                ", resOpenTime='" + resOpenTime + '\'' +
                ", resCloseTime='" + resCloseTime + '\'' +
                ", resImagePath='" + resImagePath + '\'' +

                '}';
    }
}
