import { Card, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { restaurants } from '../../../Data/Restaurants';
import swal from 'sweetalert';
import axios from 'axios';
import PhoneIcon from '@mui/icons-material/Phone';


const CustomerRestaurants = () => {

    const navigate = useNavigate();
    const [restaurantsList, setRestaurantsList] = useState([]);


    //******************************************************************************
    //******************************* Get All restaurant List ******************** */

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get("http://localhost:8080/restaurant/all-restaurant", {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                // Check if response.data is actually an array or wrapped inside an object
                const restaurantData = Array.isArray(response.data) ? response.data : response.data.data || [];

                console.log("Final Extracted Data:", restaurantData);
                setRestaurantsList(restaurantData);

            } catch (error) {
                console.error("Error fetching restaurants:", error);
                setRestaurantsList([]); // Ensure it's an array even if API fails
            }
        };

        fetchRestaurants();
    }, []);



    return (
        <div>

            <section className='px-5 lg:px-20'>
                <div>
                    <div className='flex flex-wrap item-center justify-around mt-10' >

                        {
                            restaurantsList.map((item, index) => (


                                <Card className='m-5 w-[18rem] productCard cursor-pointer'>
                                    <div
                                        //onClick={() => navigate('/restaurant/${item.city}/${item.name}/${index}')}
                                        onClick={() => navigate(`/restaurant-display/${item.resId}`)}
                                    >
                                        <img
                                            className="w-full h-[10rem] rounded-t-md object-cover"
                                            src={item.resImageUrl || `data:image/jpeg;base64,${item.resImageByte}`}
                                            alt="Restaurant Image"
                                        />


                                    </div>
                                    <div className='p-4 textPart lg:flex w-full justify-between'>
                                        <div className='space-y-1'>
                                            <p className='font-semibold text-lg'>{item.resName}</p>
                                            <p className='text-gray-500 text-sm'>
                                                {item.resDescription.length > 40 ? item.resDescription.substring(0, 40) + "..." : item.resDescription}
                                            </p>

                                            <p className=''>
                                                {item.resStreet}
                                            </p>

                                            <p className=''>
                                                {item.resCity} - {item.resPinCode}
                                            </p>

                                            <p className='mt-5'>
                                                <PhoneIcon /> {item.resPhone}
                                            </p>

                                        </div>
                                        <div>
                                           
                                        </div>
                                    </div>
                                </Card>


                            ))}
                    </div>
                </div>

            </section>


        </div>
    )
}

export default CustomerRestaurants
