import { Button, Card } from '@mui/material'
import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';

const Orders = () => {

  const [orders, setOrders] = useState([]);


  return (




    <div>

      <div className='flex flex-wrap justify-between'>
        <Card className='space-x-5 lg:w-74 m-5 p-5'>
          <div className='space-y-3 text-gray-500'>

            <div>
              <img className='w-[100%] h-[25vh] '
                src='https://img.freepik.com/free-photo/close-up-appetizing-ramadan-meal_23-2151182540.jpg?size=626&ext=jpg&ga=GA1.1.184861784.1641722714&semt=sph' />
            </div>

            <div className="grid grid-cols-3 items-center">
              <span className="font-semibold text-white text-left">Menu</span>
              <span className="font-semibold text-white text-center">:</span>
              <span className="text-right">Biryani</span>
            </div>

            <div className="grid grid-cols-3 items-center">
              <span className="font-semibold text-white text-left">Quantity</span>
              <span className="font-semibold text-white text-center">:</span>
              <span className='text-right'>1 kg</span>
            </div>

            <div className="grid grid-cols-3 items-center">
              <span className="font-semibold text-white text-left">Hotel</span>
              <span className="font-semibold text-white text-center">:</span>
              <span className='text-right'>Kastura Restaurant</span>
            </div>

            <div className="grid grid-cols-3 items-center">
              <span className="font-semibold text-white text-left">Delivery boy </span>
              <span className="font-semibold text-white text-center">:</span>
              <span className='text-right'>+91 7845129856</span>
            </div>

            <div className="grid grid-cols-3 items-center">
              <span className="font-semibold text-white text-left">Fees</span>
              <span className="font-semibold text-white text-center">:</span>
              <span className='text-right text-green-700'>₹ 500</span>
            </div>

            <div className='mt-5'>
              <Button variant='contained'>Track Order</Button>
            </div>

          </div>
        </Card>

      </div>

    </div>
  )
}

export default Orders
