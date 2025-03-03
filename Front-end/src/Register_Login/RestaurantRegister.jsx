import "./RegistrationLoginStype.css"

import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react'


import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


const formstyle = {


};


const RestaurantRegister = () => {

    const navigate = useNavigate()

    const handleLogin = (values) => {
        navigate("/restaurant-login")
    }

    // *********************************************************************
    // *********  Call the Backend API and pass the data into JSON format ***

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData(event.target); // Create FormData from form fields
    
        try {
            console.log("Data : ", formData);
    
            const response = await axios.post("http://localhost:8080/restaurant/saveRestaurant", formData,
 
                { headers: { "Content-Type": "multipart/form-data" } }
            );
    
            navigate("/restaurant-login"); // Redirect after success
            swal("Good job!", "Restaurant Registration successful", "success");
    
        } catch (error) {
            console.error("Error:", error);
            swal("Failed", "Restaurant Registration Failed", "error");
        }
    };
    
    
    

    return (
        <div className='flex flex-col items-center'>

            <section className='-z-50 banner relative flex flex-col justify-center items-center'>
            </section>

            <section className='mt-5 flex flex-col items-center bg-gray-800 p-5 w-[50rem] absolute'>

                <p className='font-bold text-2xl mb-10'>Restaurant Registration</p>


                <Box sx={formstyle}>
                    <form
                        onSubmit={handleSubmit}>

                        
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Restaurant Name"
                                        fullWidth
                                        variant="outlined"
                                        name="resName" 
                                        />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        label="Restaurant Description"
                                        fullWidth
                                        variant="outlined"
                                        
                                        name="resDescription"
                                        />
                                </Grid>



                                <Grid item xs={6}>
                                    <TextField
                                        label="Street"
                                        fullWidth
                                        variant="outlined"
                                        
                                        name="resStreet" 
                                         />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                        
                                        name="resCity" 
                                        />
                                </Grid>


                                <Grid item xs={6}>
                                    <TextField
                                        label="District"
                                        fullWidth
                                        variant="outlined"
                                        
                                        name="resDist"
                                        />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        label="State"
                                        fullWidth
                                        variant="outlined"
                                        
                                        name="resState" 
                                         />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        label="Pin Code"
                                        fullWidth
                                        variant="outlined"
                                        
                                        name="resPinCode" 
                                         />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        label="Phone"
                                        fullWidth
                                        variant="outlined"
                                        
                                        name="resPhone" 
                                         />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        label="Email Id"
                                        fullWidth
                                        variant="outlined"
                                        
                                        name="resEmail" 
                                        type="email"
                                         />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        label="Password"
                                        fullWidth
                                        variant="outlined"
        
                                        name="resPassword" 
                                        type="password"
                                         />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        label="Opening Time"
                                        fullWidth
                                        variant="outlined"
                                        
                                        name="resOpenTime" 
                                        type="Time"
                                        />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        label="Closing Time"
                                        fullWidth
                                        variant="outlined"
                                        name="resCloseTime" 
                                        type="Time"
                                         />
                                </Grid>

                                <Grid item xs={6}>
                                    <input
                                        label="Image"
                                        fullWidth
                                        variant="outlined"
                                        name="resImage" 
                                        type="file"
                                        
                                   />
                                </Grid>

                                <Grid className='mt-5 ml-5' xs={12}>
                                    <Button type='Submit' variant='contained'>Register</Button>
                                </Grid>

                                <Grid className='mt-5 ml-5'>
                                    <span>Do you already have account ?</span>
                                    <span className='ml-2 cursor-pointer text-pink-500 font-bold underline' onClick={handleLogin}>Login</span>
                                </Grid>

                            </Grid>
                     

                    </form>

                </Box>

            </section>
        </div>
    )
}

export default RestaurantRegister
