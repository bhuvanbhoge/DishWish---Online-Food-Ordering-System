import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainRouters from './MainRouters'

const Routers = () => {
  return (
    <Routes>
        <Route path='/*' element={<MainRouters/>} />
    </Routes>
  )
}

export default Routers
