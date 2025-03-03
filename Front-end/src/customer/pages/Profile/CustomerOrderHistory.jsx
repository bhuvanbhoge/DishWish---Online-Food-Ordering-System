import { Box, Button, Card, Divider, Icon, Step, StepLabel, Stepper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NearMeIcon from '@mui/icons-material/NearMe';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';



const CustomerOrderHistory = () => {

    const steps = [
        'Placed Order',
        'Order Accepted',
        'Out for Delivery',
        'Deliverd Order',
    ];

    const getOrderStatusStep = (orderStatus) => {
        switch (orderStatus) {
            case 'placed':
                return 0;
            case 'accept':
                return 1;
            case 'ontheway':
                return 2;
            case 'deliver':
                return 4;

        }
    };



    const [orderList, setorderList] = useState([]);

    // *******************************************************************************
    // **************** Get Restaurant details By Id    **************************

    useEffect(() => {
        const fetchAllCurrentOrder = async () => {
            const data = localStorage.getItem("data");

            const parsedData = JSON.parse(data);


            try {
                const response = await axios.get(`http://localhost:8080/food-orders/getDeliveredCustomerOrders/` + parsedData.custId, {
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

            <h1 className='text-center font-semibold text-2xl py-10'>Your Orders History</h1>

            <div className='flex flex-wrap justify-between'>



                {orderList.map((item, index) => (


                    <Card className='space-x-5 lg:w-74 m-10 p-5'>
                        <div className='space-y-3 text-gray-500'>

                            <div>
                                <img className='w-[100%] h-[30vh] '
                                    src='https://img.freepik.com/free-vector/order-food-concept-illustration_114360-6860.jpg?t=st=1740973877~exp=1740977477~hmac=b057731b0717e28584c977d7c97c31ede29743d3cefd37ddf473760eba0ca7c6&w=900' />
                            </div>

                            <div className='mt-10'>
                                <Box sx={{ width: '100%' }}>
                                    <Stepper activeStep={getOrderStatusStep(item.orderStatus)} alternativeLabel>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
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

                                <div className=" items-center">
                                    <p className="font-semibold text-white text-left mt-3"><CalendarMonthIcon /> Order Placed Date :  {item.orderPlaceDate}</p>
                                    <p className="font-semibold text-white text-left mt-3"><CalendarMonthIcon /> Order Delivered Date :  {item.orderDeliverDate}</p>
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



export default CustomerOrderHistory
