import { Divider } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import { doLogout } from '../../../Service';



const menu=[
    {title:"Orders", icons:<ShoppingBagIcon/>},
    {title:"Orders History", icons:<ShoppingBagIcon/>},
    {title:"Menu", icons:<FavoriteIcon/>},
    {title:"Restaurant", icons:<HomeIcon/>},
    {title:"Payments", icons:<AccountBalanceWalletIcon/>},
    {title:"Logout", icons:<LogoutIcon/>}
];


const RestaurantNavigation = () => {
    const navigate = useNavigate();


    const handleNavigate = (item) => {
        navigate('/restaurant/' + item.title.toLowerCase())

        console.log("/" + item.title.toLowerCase());

        if (item.title === "Logout") {
            handleLogout()
            navigate("/")
        }
    }

    const handleLogout = () => {
        doLogout();
    }

    return (
        <div className='group h-[90vh] flex flex-col justify-center
      text-xl space-y-8'>
            <Divider />
            {menu.map((item) =>
            (<>
                <div onClick={() => handleNavigate(item)}
                    className='px-5 flex items-center space-x-5 cursor-pointer'>
                    {item.icons}
                    <span>{item.title}</span>
                </div>
                <Divider />
            </>
            ))}
        </div>
    );
};


export default RestaurantNavigation
