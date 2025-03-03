import { Button, Card, Divider, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ManuItemCard from './ManuItemCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

const categories = [
    "Thali",
    "Starters",
    "Indian Main Course",
    "Rice and Biryani",
    "Cold Drinks",
    "Dessert",
    "Other",
    "All"
];

const foodType = ["Vegetarian Only", "Non-Vegetarian Only", "Both"];

const menu = [1, 1, 1, 1, 1, 1, 1]

const Restaurent = () => {

    const { id } = useParams();

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [isOpen, setIsOpen] = useState(false);

    const [restaurantsList, setRestaurantsList] = useState([]);
    const [menuList, setRestaurantsMenuList] = useState([]);




    // *******************************************************************************
    // **************** Get Restaurant details By Id    **************************

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/restaurant/restaurantById/${id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                setRestaurantsList(response.data);

                if (Array.isArray(response.data.restaurantsMenuLists)) {
                    setRestaurantsMenuList(response.data.restaurantsMenuLists);
                }

            } catch (error) {
                console.error("Error fetching restaurants:", error);
                setRestaurantsList(null);
            }
        };

        if (id) {
            fetchRestaurants();
        }
    }, [id]);


    useEffect(() => {

    }, [menuList]);



    // *************************************************
    // ************* Add to Cart Functionality ******

    const handleAddItemToCart = (event) => {
        const existingItems = JSON.parse(localStorage.getItem("cart")) || [];

        console.log("Data : ", existingItems);

        const isDuplicate = existingItems.some(item => item.menuId === event.menuId);
        // Ensure both IDs are of the same type and exist

        if (!event || !event.menuId) {
            console.error("Error: The item being added has no ID.");
            return;
        }


        if (isDuplicate) {
            alert("Item is already in the cart!");
            return;
        }

        existingItems.push(event.menuId);

        localStorage.setItem("cart", JSON.stringify(existingItems));

        swal("Good job!", "Menu Added into Cart", "success");
    }


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
            checkTime(new Date(), restaurantsList.resOpenTime, restaurantsList.resCloseTime);
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [restaurantsList]);

    const checkTime = (date, openTime, closeTime) => {
        if (!openTime || !closeTime) return;

        const hours = date.getHours(); // 24-hour format
        const minutes = date.getMinutes();

        const currentTimeInMinutes = hours * 60 + minutes;

        const [openHours, openMinutes] = openTime.split(":").map(Number);
        const openTimeInMinutes = openHours * 60 + openMinutes;

        const [closeHours, closeMinutes] = closeTime.split(":").map(Number);
        const closeTimeInMinutes = closeHours * 60 + closeMinutes;

        setIsOpen(currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes);
    };



    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedFoodType, setSelectedFoodType] = useState();

    const handleFoodTypeChange = () => {
        console.log("selected Food Type", selectedFoodType)
    }

    const handleCategoryChange = () => {
        console.log("Selected category", selectedCategory)
    }

    return (


        <div className='px-5 lg:px-20'>


            <section >

                <div>


                </div>

                <div>
                    <img className='w-full h-[60vh] object-cover mt-20'
                        src={`data:image/jpeg;base64,${restaurantsList.resImageByte}`}
                        alt='' />
                </div>
                <div>
                    <h1 className='text-4xl py-1 font-semibold'>{restaurantsList.resName}</h1>
                    <p className='text-gray-500'>
                        {restaurantsList.resDescription}
                    </p>


                    <p className={`py-3 text-lg font-bold ${isOpen ? "text-green-500" : "text-red-500"}`}>
                        {isOpen ? "Open now" : "Closed"}
                        <p className='text-white text-sm' > {restaurantsList.resOpenTime} - {restaurantsList.resCloseTime} </p>
                    </p>

                </div>

            </section>
            <Divider></Divider>

            <div className='mt-3 flex flex-col items-center '>

                <TextField className='w-[30rem]' placeholder='search'></TextField>

            </div>


            <section className='pt-[2rem] lg:flex relative'>
                <div className='space-y-10 lg:w-[20%]'>
                    <Card className='p-5 space-y-5 lg:sticky top-28'>
                        <div>
                            <Typography sx={{ paddingBottom: "1rem" }} variant='h5'>
                                Category
                            </Typography>
                            <FormControl component={"fieldset"}>
                                <RadioGroup name='category' value={selectedCategory}
                                    onChange={handleCategoryChange}>

                                    {categories.map((item, index) => <FormControlLabel
                                        key={index}
                                        value={item}
                                        control={<Radio />}
                                        label={item}
                                        sx={{ color: "gray" }}
                                    />)}

                                </RadioGroup>
                            </FormControl>

                        </div>
                        <Divider />


                        <div>
                            <Typography sx={{ paddingBottom: "1rem" }} variant='h5'>
                                Food Type
                            </Typography>
                            <FormControl component={"fieldset"}>
                                <RadioGroup name='foodType' value={selectedFoodType}
                                    onChange={handleFoodTypeChange}>

                                    {foodType.map((item, index) => <FormControlLabel
                                        key={index}
                                        value={item}
                                        control={<Radio />}
                                        label={item}
                                        sx={{ color: "gray" }}
                                    />)}

                                </RadioGroup>
                            </FormControl>

                        </div>

                    </Card>

                </div>

                <div className='lg:w-[90%] space-y-5 lg:pl-10 mt-20'>

                    {
                        menuList.map((item, index) => (


                            <Card className='p-5 lg:flex item-center justify-between box'>
                                <div className='lg:flex item-center lg:space-x-5'>

                                    <img
                                        className="w-[8rem] h-[7rem] object-cover"
                                        src={
                                            item.menuCategory === "snacks"
                                                ? "https://img.freepik.com/free-photo/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table_141793-3998.jpg?t=st=1740812041~exp=1740815641~hmac=37c01b82818d295f88aa4469356e95ae1575b230735fed8f9c8f9aae2d665e36&w=1380"

                                                : item.menuCategory === "rice-biryani"
                                                    ? "https://img.freepik.com/premium-photo/indian-vegetable-pulav-biryani-made-using-basmati-rice-served-terracotta-bowl-selective-focus_466689-55615.jpg?size=626&ext=jpg&ga=GA1.1.184861784.1641722714&semt=ais"

                                                    : item.menuCategory === "dessert"
                                                        ? "https://img.freepik.com/free-photo/brownie-chocolate-ice-cream-mint-sugar-powder-side-view_141793-15452.jpg?t=st=1740813283~exp=1740816883~hmac=b89c89ffac06ba0aa97eb8deaa82a9b98dc7b74a2751a75b89275b6ca143a050&w=1380"

                                                        : item.menuCategory === "main-course"
                                                            ? "https://img.freepik.com/free-photo/vertical-shot-traditional-indian-paneer-butter-masala-cheese-cottage-curry-black-surface_181624-32001.jpg?size=626&ext=jpg&ga=GA1.1.184861784.1641722714&semt=sph"

                                                            : item.menuCategory === "starters"
                                                                ? "https://cdn.pixabay.com/photo/2020/03/28/14/51/french-fries-4977354_1280.jpg"

                                                                : item.menuCategory === "thali"
                                                                    ? "https://img.freepik.com/free-photo/delicious-food-table_23-2150857812.jpg?t=st=1740813050~exp=1740816650~hmac=b354220671a46f89923c021d29cb72808a85991719edd4ae8771a56bfbca3023&w=1800"

                                                                    : item.menuCategory === "cold-drinks"
                                                                        ? "https://img.freepik.com/free-photo/close-up-alcohol-cocktails-glasses-blue-lagoon-cocktail-decorated-with-lemon-glass-cocktail-with-whiskey-wooden-stand_176474-2425.jpg?t=st=1740813186~exp=1740816786~hmac=2faf9d32ffdc9ec43a9d310ebeca5687ebb28e147e23451d2688bc337284dfa6&w=900"

                                                                        : item.menuCategory === "other"
                                                                            ? "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?t=st=1740813367~exp=1740816967~hmac=84bc4b13d3b121951eac474de6242b395a99fba9c69444a12271d1c1fc434bc9&w=1380"


                                                                            : "https://img.freepik.com/free-photo/chicken-skewers-with-slices-apples-chili_2829-19990.jpg?t=st=1740813402~exp=1740817002~hmac=fa3869f17198c8ed3cfef9af1c0e538f99c40f9fc66526ab861498dfb9e52c37&w=1380"
                                        }
                                        alt=""
                                    />


                                    <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                                        <p className='font-semibold text-xl'>Dish : <span className='ml-4'> {item.menuName}</span> </p>
                                        <p className='text-gray-400 w-[20rem]'> Description : <span className='ml-4'>{item.menuDesc}</span></p>
                                        <p>Price : <span className='ml-4'>₹{item.menuPrice}</span></p>

                                    </div>

                                    <div className='space-y-1 lg:space-y-5 lg:max-w-2xl space-x-20'>
                                        <p className='ml-20  font-semibold'>Menu Type : <span className='ml-4 text-green-500'>{item.menuType}</span></p>
                                        <p className='text-gray-400'>Menu Category : <span className='ml-4 '>{item.menuCategory}</span></p>

                                        <p>
                                            Menu Available:
                                            <span className={`ml-4 ${item.menuAvailable ? "text-green-500" : "text-red-500"}`}>
                                                {item.menuAvailable ? "Yes" : "No"}
                                            </span>
                                        </p>

                                    </div>
                                </div>
                                <div className='flex flex-col space-y-2 p-5'>

                                    <Button variant='contained'
                                        onClick={() => handleAddItemToCart(item)}
                                    >Add to cart</Button>
                                </div>
                            </Card>

                        ))}
                </div>

            </section>



        </div>
    )
}

export default Restaurent
