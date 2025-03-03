import React from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Divider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import UserProfile from './UserProfile'
import Orders from './Orders'
import UsersAddresses from './UsersAddresses'
import { Favorite } from '@mui/icons-material'
import UsersPayment from './UsersPayment'
import CustomerRestaurants from './CustomerRestaurants'
import CustomerCurrentOrders from './CustomerCurrentOrders'
import CustomerOrderHistory from './CustomerOrderHistory'

const Profile = () => {
  return (
    <div className='lg:flex '>
      <div className='lg:w-[20%]'>

        <ProfileNavigation/>

      </div>
      <Divider orientation='vertical' flexItem/>
      <div className='lg:w-[80%]'>
          <Routes>
            <Route path='/' element={<CustomerRestaurants/>} />
            <Route path='/orders' element={<CustomerCurrentOrders/>}/>
            <Route path='/orders history' element={<CustomerOrderHistory/>}/>
            <Route path='/address' element={<UsersAddresses/>}/>
            <Route path='/restaurant' element={<CustomerRestaurants/>}/>
            <Route path='/payments' element={<UsersPayment/>}/>
          </Routes>
      </div>
    </div>
  )
}

export default Profile
