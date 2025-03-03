import React, { useEffect, useState } from 'react'
import "./RegistrationLoginStype.css"
import { Box, Button, Grid, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import swal from 'sweetalert';
import { doLogin, doLogout, isLoggedIn } from '../Service';
import axios from 'axios';



const formstyle = {


};

const initialValues = {
    resEmail: "",
    resPassword: ""
}

var id;


const validationSchema = Yup.object().shape({
    resEmail: Yup.string().required("username is required"),
    resPassword: Yup.string().required("Password is required")
})


const RestaurantLogin = () => {

    const navigate = useNavigate()

    // *********************************************************************
    // *********  Call the Backend API and pass the data into JSON format ***

    const handleSubmit = async (values, { setSubmitting }) => {

        try {
            const response = await axios.post("http://localhost:8080/restaurant/login", values, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Restaurant ", response.data)

            if (response?.data && response.data.resEmail) {

                console.log("Restaurant ", response)


                // First Remove Data from localStorage
                doLogout(() => {

                });

                // Save the Data to Local Storage..
                doLogin(response.data, () => {

                });

                const userData = JSON.parse(localStorage.getItem("data"));

                navigate("/restaurant"); // Redirect after success
                swal("Congratulations!", "Restaurant Login successfull", "success");

            } else {
                swal("Faild", "Restaurant Login Faild", "error");
            }

        } catch (error) {
            swal("Faild", "Restaurant Login Faild", "error");
        }
        setSubmitting(false);
    };


    const [login, setLogin] = useState(false);

    useEffect(() => {
        setLogin(isLoggedIn());

        const userData = JSON.parse(localStorage.getItem("data"));

        if (userData) {
            id = userData.resId;

        } else {
            // navigate("/")
        }
        console.log("Id ", userData);

    }, [login])





    const handleRegister = () => {
        navigate("/restaurant-register")
    }

    return (

        <div className='flex flex-col items-center'>

            <section className='-z-50 banner relative flex flex-col justify-center items-center'>
            </section>
            <section className='mt-[8rem] flex flex-col items-center bg-gray-800 p-5 w-[40rem] h-[25rem] z-50 absolute '>

                <p className='font-bold text-2xl mb-10 mt-5'>Restaurant Login</p>


                <Box sx={formstyle}>
                    <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>

                        <Form>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <Field
                                        label="Email Id"
                                        fullWidth
                                        variant="outlined"
                                        error={!ErrorMessage("resEmail")}
                                        name="resEmail" as={TextField}
                                        type="email"
                                        helperText={<ErrorMessage name='resEmail'>
                                            {(msg) => <span className='text-red-600' >{msg}</span>}
                                        </ErrorMessage>} />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        label="Password"
                                        fullWidth
                                        variant="outlined"
                                        error={!ErrorMessage("resPassword")}
                                        name="resPassword" as={TextField}
                                        type="password"
                                        helperText={<ErrorMessage name='resPassword'>
                                            {(msg) => <span className='text-red-600' >{msg}</span>}
                                        </ErrorMessage>} />
                                </Grid>

                                <Grid className='mt-5 ml-5' xs={12}>
                                    <Button type='Submit' variant='contained'>Login</Button>
                                </Grid>

                                <Grid className='mt-5 ml-5'>
                                    <span>Don't have an account ?</span>
                                    <span className='ml-2 cursor-pointer text-pink-500 font-bold underline' onClick={handleRegister}>Register</span>
                                </Grid>

                            </Grid>
                        </Form>

                    </Formik>

                </Box>

            </section>

        </div>
    )
}

export default RestaurantLogin
