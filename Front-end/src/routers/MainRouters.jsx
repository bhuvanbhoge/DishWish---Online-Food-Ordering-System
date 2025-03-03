import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../customer/pages/HomePage/HomePage'
import Restaurent from '../customer/pages/Restaurent/Restaurent'
import Navbar from '../customer/components/Navbar/Navbar'
import Cart from '../customer/pages/Cart/Cart'
import Profile from '../customer/pages/Profile/Profile'

import CustomerRegister from '../Register_Login/CustomerRegister'
import RestaurantRegister from '../Register_Login/RestaurantRegister'
import CustomerLogin from '../Register_Login/CustomerLogin'
import RestaurantLogin from '../Register_Login/RestaurantLogin'
import RestaurantProfile from '../customer/pages/Restaurent/RestaurantProfile'
import DeliveryBoyRegister from '../Register_Login/DeliveryBoyRegister'
import DeliveryBoyLogin from '../Register_Login/DeliveryBoyLogin'
import DeliveryBoyProfile from '../customer/pages/DeliveryBoy/DeliveryBoyProfile'

const MainRouters = () => {


  return (
    <div className='relative'>
       <div className='sticky top-0 z-50'>
          <Navbar/>
       </div>

      <Routes>


        <Route path='/' element={<HomePage/>} />


        {/* ***** Login Register Routers ***** */}  

         
          <Route path='/customer-register' element={<CustomerRegister /> } />
          <Route path='/customer-login' element={<CustomerLogin /> } />

          <Route path='/restaurant-register' element={<RestaurantRegister /> } />
          <Route path='/restaurant-login' element={<RestaurantLogin /> } />


        {/* ***** Customer Routers ***** */}  

        <Route path='/restaurant-display/:id' element={<Restaurent/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/my-profile/*' element={<Profile/>} />


        <Route path='/restaurant/*' element={<RestaurantProfile/>} />


         {/* ***** Delivery Boy Routers ***** */}  
        
        <Route  path='/delivery-boy-register' element={<DeliveryBoyRegister /> }/>
        <Route  path='/delivery-boy-login' element={<DeliveryBoyLogin /> }/>

        <Route  path='/delivery-boy/*' element={<DeliveryBoyProfile /> }/>




      </Routes>

    </div>
  )
}

export default MainRouters
