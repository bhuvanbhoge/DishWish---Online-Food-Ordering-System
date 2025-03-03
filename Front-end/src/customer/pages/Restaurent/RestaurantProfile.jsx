import React from 'react'
import RestaurantHomePage from './RestaurantHomePage'
import { Divider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import RestaurantNavigation from './RestaurantNavigation'
import RestaurantOrders from './RestaurantOrders'
import RestaurantMenu from './RestaurantMenu'
import RestaurantOrdersHistory from './RestaurantOrdersHistory'




const RestaurantProfile = () => {
    return (
        <div className='lg:flex '>
            <div className='lg:w-[20%]'>

                <RestaurantNavigation />

            </div>

            <Divider orientation='vertical' flexItem />
            <div className='lg:w-[80%]'>

                <Routes>

                    <Route path='/' element={<RestaurantOrders/>} />
                    <Route path='/orders' element={<RestaurantOrders /> } />
                    <Route path='/orders history' element={<RestaurantOrdersHistory/> } />
                    <Route path='/menu' element={<RestaurantMenu /> } />

                </Routes>

            </div>


        </div>
    )
}

export default RestaurantProfile
