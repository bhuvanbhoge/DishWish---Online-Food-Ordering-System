import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { isLoggedIn } from '../../../Service';
import { useNavigate } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: 4,
};



const RestaurantMenu = () => {

    const [openAddressModel, setOpenAddressModel] = useState();
    const [openMenuModel, setOpenMenuModel] = useState();

    const [selectedMenuType, setSelectedMenuType] = useState("");
    const [selectedMenuCategory, setselectedMenuCategory] = useState("");
    const [selectedMenuAvailable, setselectedMenuAvailable] = useState("");

    const [restaurantsMenuList, setRestaurantsMenuList] = useState([]);

    const navigate = useNavigate()

    var id;

    // Open Close For New Menu Form
    const handleOpenAddressModel = () => {
        setOpenAddressModel(true)
    }
    
    const handleCloseAddressModel = () => {
        setOpenAddressModel(false)
    }

    // Open Close For Update Menu Form

    const handleOpenAddressModelNew = () => {
        setOpenMenuModel(true)
    }

    const handleCloseAddressModelNew = () => {
        setOpenMenuModel(false)
    }


    //******************************************************************************
    //******************************* Get All restaurant Menu List ******************** */

    useEffect(() => {
        const fetchRestaurants = async () => {

            const userData = JSON.parse(localStorage.getItem("data"));

            if (userData) {
                id = userData.resId;
            }

            try {
                const response = await axios.get("http://localhost:8080/restaurant/getRestaurantMenu/" + id, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                // Check if response.data is actually an array or wrapped inside an object
                const RestaurantMenu = Array.isArray(response.data) ? response.data : response.data.data || [];

                console.log("Final Extracted Data:", RestaurantMenu);
                setRestaurantsMenuList(RestaurantMenu);

            } catch (error) {
                console.error("Error fetching restaurants:", error);
                setRestaurantsMenuList([]); // Ensure it's an array even if API fails
            }
        };

        fetchRestaurants();
    }, []);


    // *********************************************************************
    // *********  Call the Backend API for Update Restaurant Menu ***


    // Initial state values
    const [formValues, setFormValues] = useState({
        menuId:"",
        menuName: "",
        menuType: "",
        menuDesc: "",
        menuCategory: "",
        menuPrice: "",
        menuAvailable: ""
    });

    // Handle change for text fields and selects
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    // get Single Menu
    const getSingleMenuData = async (id) => {
        

        try {
            const response = await axios.get("http://localhost:8080/restaurant/getRestaurantSingleMenu/" + id, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Set response data to formValues
            setFormValues({
                menuId: response.data.menuId || "",
                menuName: response.data.menuName || "",
                menuType: response.data.menuType || "",
                menuDesc: response.data.menuDesc || "",
                menuCategory: response.data.menuCategory || "",
                menuPrice: response.data.menuPrice || "",
                menuAvailable: response.data.menuAvailable ? "true" : "false"
            });

            console.log("Data : ",response.data);
            // Open the modal after setting data
            handleOpenAddressModelNew();

        } catch (error) {

        }

    };


    const handleUpdate = async (event) => {

        event.preventDefault();
        const formData = new FormData(event.target);
        const values = Object.fromEntries(formData.entries());


        try {
            const response = await axios.post("http://localhost:8080/restaurant/restaurantMenuUpdate/"+formValues.menuId, values, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response?.data && response != null) {
                swal("Good job!", "Menu Updated successfull", "success");
            }

        } catch (error) {
            swal("Faild", "Menu Updated Faild", "error");
        }
    };


    // ********************************************************
    // ************* Delete Menu *****************************
    

    const deleteMenu = async (id) =>{

        try {
            const response = await axios.delete("http://localhost:8080/restaurant/restaurantMenuDelete/" + id, {
                headers: {
                    "Content-Type": "application/json"
                }
            });    
            swal("Good job!", "Menu Deleted successfull", "success");
        
        } catch (error) {
            swal("Faild", "Menu Deleted Faild", "error");
        }


    };



    // *********************************************************************
    // *********  Call the Backend API and pass the data into JSON format ***

    const handleSubmit = async (event) => {

        event.preventDefault();
        const formData = new FormData(event.target);
        const values = Object.fromEntries(formData.entries());

        const userData = JSON.parse(localStorage.getItem("data"));

        if (userData) {
            id = userData.resId;
        }


        try {
            const response = await axios.post("http://localhost:8080/restaurant/saveRestaurantMenu/" + id, values, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response?.data && response != null) {
                swal("Good job!", "Menu Added successfull", "success");
            }

        } catch (error) {
            swal("Faild", "Menu Added Faild", "error");
        }
    };




    return (
        <div className='flex flex-col items-center'>

            <div className='mt-10'>
                <TextField
                    placeholder='Search Menu'
                    name='searchMenu'
                    id='searchMenu'
                    sx={{ width: "500px" }}
                />
            </div>


            <div>
                <Card className='flex space-x-5 lg:w-64 m-5 p-5'>
                    <div className='space-y-3 text-gray-500'>

                        <p>
                            Add New Menu
                        </p>
                        <Button onClick={handleOpenAddressModel} fullWidth variant='contained'
                            sx={{ padding: ".75rem" }} >Add</Button>
                    </div>
                </Card>
            </div>



            <div className='lg:w-[90%] space-y-5 lg:pl-10 mt-20'>

                {
                    restaurantsMenuList.map((item, index) => (


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
                                    sx={{ backgroundColor: "green" }}
                                    onClick={() => getSingleMenuData(item.menuId)}>UPDATE</Button>

                                <Button variant='contained'
                                onClick={() => deleteMenu(item.menuId)}
                                >DELETE</Button>
                            </div>
                        </Card>

                    ))}
            </div>


             {/* **************  Form for Add new Menu ****************/}

            <Modal open={openAddressModel} onClose={handleCloseAddressModel}>
                <Box sx={style}>
                    <form
                        onSubmit={handleSubmit}>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder='Menu Name'
                                    name="menuName"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Menu Type</InputLabel>
                                    <Select
                                        name="menuType"
                                        value={selectedMenuType} // State to manage selected value
                                        onChange={(e) => setSelectedMenuType(e.target.value)}
                                        label="Menu Type"
                                    >
                                        <MenuItem value="veg">Veg</MenuItem>
                                        <MenuItem value="non-veg">Non-Veg</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder='Menu Description'
                                    name="menuDesc"
                                />
                            </Grid>


                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Food Category</InputLabel>
                                    <Select
                                        name="menuCategory"
                                        value={selectedMenuCategory} // State to manage selected value
                                        onChange={(e) => setselectedMenuCategory(e.target.value)}
                                        label="Menu Type"
                                    >

                                        <MenuItem value="thali">Thali</MenuItem>
                                        <MenuItem value="starters">Starters</MenuItem>
                                        <MenuItem value="snacks">Snacks</MenuItem>
                                        <MenuItem value="main-course">Indian Main Course</MenuItem>
                                        <MenuItem value="rice-biryani">Rice and Biryani</MenuItem>
                                        <MenuItem value="cold-drinks">Cold Drinks</MenuItem>
                                        <MenuItem value="dessert">Dessert</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder='Price'
                                    type='number'
                                    name="menuPrice"
                                />
                            </Grid>


                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Menu Available</InputLabel>
                                    <Select
                                        name="menuAvailable"
                                        value={selectedMenuAvailable} // State to manage selected value
                                        onChange={(e) => setselectedMenuAvailable(e.target.value)}
                                        label="Menu Available"
                                    >
                                        <MenuItem value="true">Yes</MenuItem>
                                        <MenuItem value="false">No</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid className='mt-5 ml-5' xs={12}>
                                <Button type='Submit' variant='contained'>Add Menu</Button>
                            </Grid>

                        </Grid>

                    </form>

                </Box>

            </Modal>




             {/* *************** Form for Update Menu ***************************** */}

            <Modal open={openMenuModel} onClose={handleCloseAddressModelNew}>
                <Box sx={style}>
                    <form onSubmit={handleUpdate}>

                        <Grid container spacing={2}>
                            {/* Menu Name */}
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Menu Name"
                                    name="menuName"
                                    value={formValues.menuName}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Menu Type */}
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Menu Type</InputLabel>
                                    <Select
                                        name="menuType"
                                        value={formValues.menuType}
                                        onChange={handleChange}
                                        label="Menu Type"
                                    >
                                        <MenuItem value="veg">Veg</MenuItem>
                                        <MenuItem value="non-veg">Non-Veg</MenuItem>
                                        <MenuItem value="both">Both</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Menu Description */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Menu Description"
                                    name="menuDesc"
                                    value={formValues.menuDesc}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Food Category */}
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Food Category</InputLabel>
                                    <Select
                                        name="menuCategory"
                                        value={formValues.menuCategory}
                                        onChange={handleChange}
                                        label="Food Category"
                                    >
                                        <MenuItem value="thali">Thali</MenuItem>
                                        <MenuItem value="starters">Starters</MenuItem>
                                        <MenuItem value="snacks">Snacks</MenuItem>
                                        <MenuItem value="main-course">Indian Main Course</MenuItem>
                                        <MenuItem value="rice-biryani">Rice and Biryani</MenuItem>
                                        <MenuItem value="cold-drinks">Cold Drinks</MenuItem>
                                        <MenuItem value="dessert">Dessert</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Menu Price */}
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Price"
                                    type="number"
                                    name="menuPrice"
                                    value={formValues.menuPrice}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Menu Available */}
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Menu Available</InputLabel>
                                    <Select
                                        name="menuAvailable"
                                        value={formValues.menuAvailable}
                                        onChange={handleChange}
                                        label="Menu Available"
                                    >
                                        <MenuItem value="true">Yes</MenuItem>
                                        <MenuItem value="false">No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12} style={{ marginTop: "20px", textAlign: "center" }}>
                                <Button type="submit" variant="contained" color="primary" >Update</Button>
                            </Grid>
                        </Grid>

                    </form>
                </Box>
            </Modal>

        </div>
    )
}

export default RestaurantMenu
