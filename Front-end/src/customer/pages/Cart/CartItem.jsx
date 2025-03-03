import { IconButton } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React, { useState } from 'react'





const CartItem = () => {


    const [quantity, setQuantity] = useState(1);

    const addItem = () => {

        setQuantity(prevQuantity => prevQuantity + 1);
    };

    
    const removeItem = () => {
        
        setQuantity(prevQuantity => (prevQuantity >1 ? prevQuantity - 1 : 1) );
        
    }






  return (
    <div className='px-5'>
        <div className='lg:flex items-center lg:space-x-5'>
            <div>
                <img className='w-[5rem] h-[5rem] object-cover'
                src='https://img.freepik.com/premium-photo/fresh-tasty-homemade-burger-wooden-table_147620-1307.jpg?w=826'
                alt=''/>
            </div>
            <div className='flex items-center justify-between lg:w-[70%]'>
                <div className='space-y-1 lg:space-y-3 w-full'>

                    <p>Burger</p>

                    <div className='flex justify-between items-center'>
                        <div className='flex items-center space-x-1'>

                            <IconButton color='primary' onClick={removeItem}>
                                <RemoveCircleOutlineIcon/>
                            </IconButton>
                            
                            <div className='w-5 h-5 text-xs'>
                                {quantity}
                            </div>
                            
                            <IconButton color='primary'onClick={addItem} >
                                <AddCircleOutlineIcon />
                            </IconButton>

                        </div>

                    </div>

                </div>

                <p>₹299</p>

            </div>

        </div>
      
    </div>
  )
}




export default CartItem
