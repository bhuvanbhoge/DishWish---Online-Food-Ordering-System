import React, { useEffect, useState } from 'react'
import "./HomePage.css"
import MultipleItemCaresol from './MultipleItemCaresol'
import { restaurants } from '../../../Data/Restaurants'
import RestorentCard from './RestaurantCard'


const HomePage = () => {




  return (
    <div>
        <section className='-z-50 banner relative flex flex-col justify-center items-center'>
            <div className='w-[50vw] z-10 text-center'>
                <p className='text-2xl lg:text-7xl font-bold z-10 py-5'>
                    Fresh Food
                </p>

                <p className='z-10 text-gray-300 text-xl lg:text-4xl'>
                    Test the Convenience: Food, Fast and Delivery.
                </p>

            </div>
            <div className='cover absolute top-0 left-0 right-0'></div>

            <div className='fadout'></div>

        </section>

        <section className='p-10 lg:py-10 lg:px-20'>
            <div className=''>
                <div className='text-2xl font-semibold text-gray-400 py-3 pb-10'>

                </div>
                <MultipleItemCaresol/>
            </div>

        </section>

        

    </div>
  )
}

export default HomePage
