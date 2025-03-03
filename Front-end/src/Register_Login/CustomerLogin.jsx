import React from 'react'
import "./RegistrationLoginStype.css"
import { Box, Button, Grid, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { doLogin, doLogout } from '../Service';

import swal from 'sweetalert';
import axios from 'axios';

const formstyle = {


};

const initialValues = {
    custEmail: "",
    password: ""
}

const validationSchema = Yup.object().shape({
    custEmail: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required")
})


const CustomerLogin = () => {

    const navigate = useNavigate()

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            

            const response = await axios.post("http://localhost:8080/customer/login", values, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Customer Data ", response.data);

            if (response?.data && response.data.custEmail) {

                console.log("Customer ", response)

                // First Remove Data from localStorage
                doLogout();

                // Save the Data to Local Storage..
                doLogin(response.data, () => {

                });
                
                const userData = JSON.parse(localStorage.getItem("data"));
                
                navigate("/my-profile"); // Redirect after success
                swal("Congratulations!", "Customer Login successfull", "success");

            }else{
                swal("Faild", "Customer Login Faild", "error");    
            }

        } catch (error) {
            console.error("Error:", error);
            swal("Faild", "Customer Login Faild", "error");
        }
        setSubmitting(false);
    };

    const handleRegister = () => {
        navigate("/customer-register")
    }

    return (

        <div className='flex flex-col items-center'>

            <section className='-z-50 banner relative flex flex-col justify-center items-center'>
            </section>
            <section className='mt-[8rem] flex flex-col items-center bg-gray-800 p-5 w-[40rem] h-[25rem] z-50 absolute '>

                <p className='font-bold text-2xl mb-10 mt-5'>Customer Login</p>


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
                                        error={!ErrorMessage("custEmail")}
                                        name="custEmail" as={TextField}
                                        type="email"
                                        helperText={<ErrorMessage name='custEmail'>
                                            {(msg) => <span className='text-red-600' >{msg}</span>}
                                        </ErrorMessage>} />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        label="Password"
                                        fullWidth
                                        variant="outlined"
                                        error={!ErrorMessage("password")}
                                        name="password" as={TextField}
                                        type="password"
                                        helperText={<ErrorMessage name='password'>
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

export default CustomerLogin
