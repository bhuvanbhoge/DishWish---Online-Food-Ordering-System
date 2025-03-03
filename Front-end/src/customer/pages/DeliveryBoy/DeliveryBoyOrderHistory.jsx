import { Button, Card, Divider, Icon } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NearMeIcon from '@mui/icons-material/NearMe';
import swal from 'sweetalert';



const DeliveryBoyOrderHistory = () => {


    const [orderList, setorderList] = useState([]);

    // *******************************************************************************
    // **************** Get Restaurant details By Id    **************************

    useEffect(() => {
        const fetchAllCurrentOrder = async () => {
            const data = localStorage.getItem("data");

            const parsedData = JSON.parse(data);

            try {
                const response = await axios.get(`http://localhost:8080/food-orders/deliveryBoyOrderHistory/` + parsedData.id, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                setorderList(response.data);
                console.log("Data : ", response.data);

            } catch (error) {
                console.error("Error fetching restaurants:", error);

            }
        };
        fetchAllCurrentOrder();
    }, []);

    


    return (
        <div>

            <h1 className='text-center font-semibold text-2xl py-10'>Your Order History</h1>

            <div className='flex flex-wrap justify-between'>



                {orderList.map((item, index) => (


                    <Card className='space-x-5 lg:w-74 m-10 p-5'>
                        <div className='space-y-3 text-gray-500'>

                            <div>
                                <img className='w-[100%] h-[30vh] '
                                    src='https://img.freepik.com/premium-vector/delivered-stampdelivered-grunge-square-sign_822766-11348.jpg?w=900' />
                            </div>

                            <div className='p-5'>
                                {item.restaurants.restaurantsMenuLists
                                    .filter(menu => item.orderMenuIntegerList.includes(menu.menuId))
                                    .map((menu, index) => (
                                        <div className="grid grid-cols-3 items-center">
                                            <span className="font-semibold text-white text-left">{menu.menuName}</span>
                                            <span className="font-semibold text-white text-center">:</span>
                                            <span className="text-right">{item.orderMenuQuantity[index]}</span>
                                        </div>
                                    ))}

                                <div className="my-[10px]">
                                    <Divider />
                                </div>


                                <div className=" items-center">
                                    <p className="font-semibold text-red-500 "><LocationOnIcon /> From</p>
                                    <p className="font-semibold text-white text-left mt-3"> {item.restaurants.resName}</p>
                                    <p className='text-left'>{item.restaurants.resStreet}, {item.restaurants.resCity} - {item.restaurants.resPinCode}</p>
                                    <p><PhoneIcon /> {item.restaurants.resPhone}</p>
                                </div>

                                <div className="my-[10px]">
                                    <Divider />
                                </div>

                                <div className=" items-center">
                                    <p className="font-semibold text-green-500 "><NearMeIcon /> To</p>
                                    <p className="font-semibold text-white text-left mt-3"> {item.customerDetail.custName}</p>
                                    <p className='text-left'>{item.customerAddressDetail.street}, {item.customerAddressDetail.city} - {item.customerAddressDetail.zipcode}</p>
                                    <p><PhoneIcon /> {item.customerDetail.custPhone}</p>
                                </div>

                                <div className="my-[10px]">
                                    <Divider />
                                </div>

                                <div className='mt-5'>
                                    <p className="font-semibold text-green-500 text-right"> ₹ {item.ordBill}</p>


                                </div>

                            </div>

                        </div>
                    </Card>
                ))}

            </div>
        </div>
    )
}




export default DeliveryBoyOrderHistory
