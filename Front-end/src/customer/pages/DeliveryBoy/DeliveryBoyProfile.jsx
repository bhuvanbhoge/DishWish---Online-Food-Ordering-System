import { Divider } from '@mui/material'
import React from 'react'
import DeliveryBoyNavigation from './DeliveryBoyNavigation'
import { Route, Routes } from 'react-router-dom'
import DeliveryBoyHomePage from './DeliveryBoyHomePage'
import DeliveryBoyCurrentOrders from './DeliveryBoyCurrentOrders'
import DeliveryBoyOrderHistory from './DeliveryBoyOrderHistory'

const DeliveryBoyProfile = () => {
    return (
        <div className='lg:flex '>
            <div className='lg:w-[20%]'>

                <DeliveryBoyNavigation />

            </div>
            <Divider orientation='vertical' flexItem />

            <div className='lg:w-[80%]'>
                <Routes>
                    <Route path='/new orders' element={<DeliveryBoyHomePage />} />
                    <Route path='/my current orders' element={<DeliveryBoyCurrentOrders />} />
                    <Route path='/order history' element={<DeliveryBoyOrderHistory />} />
                    
                </Routes>
            </div>

        </div>
    )
}

export default DeliveryBoyProfile
