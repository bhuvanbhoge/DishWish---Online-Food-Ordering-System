import { Button, Card } from '@mui/material'
import React from 'react'

const ManuItemCard = ({item}) => {

    const handleAddItemToCart=()=>{
        console.log("handle add item to card")
    }


  return (
    <Card className='p-5 lg:flex item-center justify-between box'>
        <div className='lg:flex item-center lg:space-x-5'>
            <img className='w-[7rem] h-[7rem] object-cover'
             src='https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=400'
             alt='' />

            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                <p className='font-semibold text-xl'>{'Pizza'}</p>
                <p>₹{299}</p>
                <p className='text-gray-400'>Extra cheese pizza</p>

            </div>
        </div>
        <div>
            <Button onClick={handleAddItemToCart}>Add To Cart</Button>
        </div>
      
    </Card>
  )
}

export default ManuItemCard 