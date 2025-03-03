import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Menu, MenuItem } from '@mui/material';
import "./Navbar.css"
import { doLogout } from '../../../Service';

//import PersonIcon from '@mui/icons-material/Person';



const Navbar = () => {


    const navigate = useNavigate()


    const handleCloseMenu=()=>{
        setAnchorEl(null);
    }

    const handleLogout=()=>{
        doLogout();
        handleClose();
        navigate("/");
    }

    

    // *********************************************
    //  ****** It is for Dropdown list *************

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    // Handle opening the dropdown
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    // Handle closing the dropdown
    const handleClose = () => {
      setAnchorEl(null);
    };
 
 


  return (

   

    <nav className='px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex 
    justify-between'>
        <div className='flex item-center space-x-4'>
            <div className='lg:mr-10 cursor-pointer flex item-center space-x-4'
             onClick={()=>navigate("/")}>
                <li className='logo font-semibold text-gray-300 text-2xl'>
                    Fresh Food</li>

            </div>
        </div>

        <div className='flex item-center space-x-2 '>
            <IconButton>
                <SearchIcon sx={{fontSize:"1.5rem"}} />
            </IconButton>
            

        
            <IconButton onClick={()=>navigate("/cart")}>
                <ShoppingCartIcon sx={{fontSize:"1.5rem"}} />
            </IconButton>

            <IconButton onClick={handleClick}>
                <PersonIcon sx={{fontSize:"1.5rem"}} />
            </IconButton>


        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => { navigate("/customer-login"); handleClose(); }}>Customer</MenuItem>
            <MenuItem onClick={() => { navigate("/restaurant-login"); handleClose(); }}>Restaurant</MenuItem>
            <MenuItem onClick={() => { navigate("/delivery-boy-login"); handleClose(); }}>Delivery boy</MenuItem>
            <MenuItem onClick={() => { navigate("/Delivery boy"); handleClose(); }}>Admin</MenuItem>

            <MenuItem onClick={handleLogout} style={{marginTop: "5px", color: "#e91e63"}}>Logout</MenuItem>
        </Menu>

        </div>


    </nav>
  )
}

export default Navbar