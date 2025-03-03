import React, { Fragment, useEffect, useState } from 'react'
import CartItem from './CartItem'
import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material'
import AddressCart from './AddressCart';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { IconButton } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import swal from 'sweetalert';


const cartItems = [1, 1, 1, 1];
const addresses = [1, 1, 1, 1, 1];

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

const initialValues = {
    streetAddress: "",
    state: "",
    pincode: "",
    city: ""
}

const validationSchema = Yup.object().shape({
    streetAddress: Yup.string().required("Street Address is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.number().required("Pincode is required")
})




const Cart = () => {

    const [openAddressModel, setOpenAddressModel] = useState();

    const [cartMenuList, setCartMenuList] = useState([]);

    const createOrderUsingSelectedAddress = () => {
        console.log("create order")
    }

    const handleOpenAddressModel = () => {
        setOpenAddressModel(true)
        console.log("handle open address model")
    }

    const handleSubmit = (values) => {
        console.log("create order", values)
    }

    const handleCloseAddressModel = () => {
        setOpenAddressModel(false)
    }


    const removeCart = () => {
        localStorage.removeItem("cart");
    }


    //******************************************************************************
    //******************************* Get All restaurant Menu List ******************** */

    useEffect(() => {
        const fetchRestaurants = async () => {


            try {
                const existingItems = JSON.parse(localStorage.getItem("cart")) || [];

                console.log("Local Data : ", existingItems);

                const response = await axios.get("http://localhost:8080/restaurant/getSelectedMenuList/" + existingItems, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const RestaurantMenu = Array.isArray(response.data) ? response.data : response.data.data || [];

                console.log("Restaurant Data ",RestaurantMenu);
                setCartMenuList(RestaurantMenu);

            } catch (error) {
                console.error("Error fetching restaurants:", error);
                setCartMenuList([]);
            }
        };

        fetchRestaurants();
    }, []);

    // *********************************************************************
    // ****************  Get All Customer Address **************************
    const [customerAddressList, setcustomerAddressList] = useState([]);

    useEffect(() => {
        const fetchAddress = async () => {

            const userData = JSON.parse(localStorage.getItem("data"));

            try {
                const response = await axios.get("http://localhost:8080/customer/getAllCustomerAddressList/" + userData.custId, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                // Check if response.data is actually an array or wrapped inside an object
                const customerAddress = Array.isArray(response.data) ? response.data : response.data.data || [];

                console.log("Final Extracted Data:", customerAddress);
                setcustomerAddressList(customerAddress);

            } catch (error) {
                console.error("Error fetching restaurants:", error);
                setcustomerAddressList([]); // Ensure it's an array even if API fails
            }
        };

        fetchAddress();
    }, []);



    // *********************************************************************
    // ************************ Calculate Realtime Bill ********************



    const [quantities, setQuantities] = useState({});

    const [billComponent, setBillComponent] = useState({
        totalItem: 0,
        itemBill: 0,
        deliveryCharges: 20,
        platformCharges: 10,
        gstCharges: 20,
        finalBill: 0
    })

    // Initialize quantities when cartMenuList updates
    useEffect(() => {
        const initialQuantities = {};
        cartMenuList.forEach((_, index) => {
            initialQuantities[index] = 1;
        });
        setQuantities(initialQuantities);
    }, [cartMenuList]);


    const handleQuantityChange = (event, index) => {
        const { value } = event.target;
        setQuantities((prev) => ({
            ...prev,
            [index]: value, // Store value for each specific index
        }));
    };


    // Generate bill with correct quantities
    const generateBill = () => {

        var totalItem = 0;

        const total = cartMenuList.reduce((acc, item, index) => {
            const quantity = Number(quantities[index] || 0); // Ensure quantity is a number
            totalItem += quantity;
            return acc + quantity * item.menuPrice;
        }, 0);

        setBillComponent(prev => ({
            ...prev,
            totalItem: totalItem,
            itemBill: total,
            finalBill: total + 50
        }));
    };


    const [placeOrderDetails, setPlaceOrderDetails] = useState({
        customer: "",
        customerAddress: "",
        ordBill: "",
        orderMenuIntegerList: [],
        orderMenuQuantity:[],
        orderPlaceDate: "",
    });

    // Generate bill with correct quantities & Place Order
    const placeOrder = async (addId) => {

        var totalItem = 0;

        const total = cartMenuList.reduce((acc, item, index) => {
            const quantity = Number(quantities[index] || 0); // Ensure quantity is a number
            totalItem += quantity;
            return acc + quantity * item.menuPrice;
        }, 0);

        setBillComponent(prev => ({
            ...prev,
            totalItem: totalItem,
            itemBill: total,
            finalBill: total + 50
        }));


        const userData = JSON.parse(localStorage.getItem("data"));

        const updatedOrderDetails = {
            customer: userData.custId,
            customerAddress: addId,
            ordBill: billComponent.finalBill,
            orderPlaceDate: new Date().toISOString().slice(0, 19),
            orderMenuIntegerList: cartMenuList.map(item => item.menuId),
            orderMenuQuantity: Object.values(quantities),

        };
    
        console.log("Quantities : ",quantities);
        // Update state
        setPlaceOrderDetails(updatedOrderDetails);

        try {
            const response = await axios.post("http://localhost:8080/food-orders/placeOrder", updatedOrderDetails, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if(response!=null){

                localStorage.removeItem("cart");

                swal("Good job!", "Order Placed successfull", "success");
            }else{
                swal("Faild", "Order Placed Faild", "error");    
            }
            

        } catch (error) {
            console.error("Error:", error);
            swal("Faild", "Order Placed Faild", "error");
        }


    };



    return (
        <Fragment>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 min-h-screen p-5 mt-10'>
                    <div className='space-y-6'>

                        {
                            cartMenuList.map((item, index) => (

                                <div className='lg:flex items-center lg:space-x-5'>

                                    <div>
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
                                    </div>
                                    <div className='flex items-center justify-between lg:w-[70%]'>
                                        <div className='space-y-1 lg:space-y-3 w-full'>

                                            <p>{item.menuName}</p>

                                            <div className='flex justify-between items-center'>
                                                <div className='flex items-center space-x-1'>

                                                    <TextField
                                                        key={index} // Unique key
                                                        name={`quantity-${index}`} // Unique name
                                                        type="number"
                                                        value={quantities[index] || ""} // Retrieve value from state

                                                        onChange={(e) => handleQuantityChange(e, index)} // Update state
                                                        inputProps={{ min: 1 }}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <p>₹{item.menuPrice}</p>
                                    </div>
                                </div>
                            ))}


                    </div>

                    <Divider />

                    <Grid container justifyContent="space-between" alignItems="center">
                        <Button variant='contained'
                            onClick={() => removeCart()}
                        >Remove Cart</Button>

                        <Button variant='contained'
                            style={{ backgroundColor: "green", color: "white" }}
                            onClick={generateBill}
                        >Generate Bill</Button>

                    </Grid>

                    <Divider />

                    <div className='billDetails px-5 text-sm'>
                        <p className='font-extralight py-5'>Bill Details</p>

                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Total Item</p>
                                <p>{billComponent.totalItem}</p>
                            </div>
                        </div>


                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Item Bill</p>
                                <p>₹{billComponent.itemBill}</p>
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Delivery Fee</p>
                                <p>₹{billComponent.deliveryCharges}</p>
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Platform Fee</p>
                                <p>₹{billComponent.platformCharges}</p>
                            </div>
                        </div>



                        <div className='space-y-3 mb-2'>
                            <div className='flex justify-between text-gray-400'>
                                <p>GST and Restaurant Charges</p>
                                <p>₹{billComponent.gstCharges}</p>
                            </div>
                        </div>

                        <Divider />

                        <div className='space-y-3 mt-2'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Total Pay</p>
                                <p>₹{billComponent.finalBill}</p>
                            </div>
                        </div>

                    </div>

                </section>



                <Divider orientation='vertical' flexItem />

                <section className='lg:w-[70%] px-5'>
                    <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>

                    <div className='flex flex-wrap justify-between'>
                        {customerAddressList.map((item) =>

                            <Card className='flex space-x-5 lg:w-64 m-5 p-5'>
                                <HomeIcon />
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='font-semibold text-lg text-white'>Home</h1>
                                    <p>
                                        {item.street}, {item.city}, {item.state} - {item.zipcode}
                                    </p>
                                    <Button variant='outlined' fullWidth
                                    onClick={() => placeOrder(item.addId)}
                                    >Deliver here</Button>

                                </div>
                            </Card>

                        )}

                        <Card className='flex space-x-5 lg:w-64 m-5 p-5'>
                            <AddLocationAltIcon />
                            <div className='space-y-3 text-gray-500'>

                                <p>
                                    Add New Address
                                </p>
                                <Button onClick={handleOpenAddressModel} fullWidth variant='contained'
                                    sx={{ padding: ".75rem" }} >Add</Button>
                            </div>
                        </Card>

                    </div>

                </section>
            </main>

            <Modal open={openAddressModel} onClose={handleCloseAddressModel}>
                <Box sx={style}>
                    <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>

                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        label="Street Address"
                                        fullWidth
                                        variant="outlined"
                                        error={!ErrorMessage("streetAddress")}
                                        name="streetAddress" as={TextField}
                                        helperText={<ErrorMessage name='streetAddress'>
                                            {(msg) => <span className='text-red-600' >{msg}</span>}
                                        </ErrorMessage>} />
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        label="State"
                                        fullWidth
                                        variant="outlined"
                                        error={!ErrorMessage("state")}
                                        name="state" as={TextField}
                                        helperText={<ErrorMessage name='state'>
                                            {(msg) => <span className='text-red-600' >{msg}</span>}
                                        </ErrorMessage>} />
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        label="Pincode"
                                        fullWidth
                                        variant="outlined"
                                        error={!ErrorMessage("pincode")}
                                        name="pincode" as={TextField}
                                        helperText={<ErrorMessage name='pincode'>
                                            {(msg) => <span className='text-red-600' >{msg}</span>}
                                        </ErrorMessage>} />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                        error={!ErrorMessage("city")}
                                        name="city" as={TextField}
                                        helperText={<ErrorMessage name='city'>
                                            {(msg) => <span className='text-red-600' >{msg}</span>}
                                        </ErrorMessage>} />
                                </Grid>
                                <Grid className='mt-5 ml-5' xs={12}>
                                    <Button type='Submit' variant='contained'>Delever here</Button>
                                </Grid>

                            </Grid>
                        </Form>

                    </Formik>

                </Box>

            </Modal>

        </Fragment>
    )
}

export default Cart
