import { Box, Button, Grid, TextField } from '@mui/material'
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import swal from 'sweetalert';



const formstyle = {


};

const initialValues = {
    name: "",
    city: "",
    state: "",
    phoneNumber: "",
    emailId: "",
    password: ""
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("customer name is required"),
    city: Yup.string().required("customer name is required"),
    state: Yup.string().required("customer name is required"),
    phoneNumber: Yup.string().required("phone number is required"),
    emailId: Yup.string().required("email Id is required"),
    password: Yup.string().required("Password is required")
})









const DeliveryBoyRegister = () => {

    const navigate = useNavigate();

    // *********************************************************************
    // *********  Call the Backend API and pass the data into JSON format ***

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post("http://localhost:8080/delivery-boy/save", values, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            navigate("/delivery-boy-login"); // Redirect after success
            swal("Good job!", "Delivery Boy Registration successfull", "success");

        } catch (error) {
            console.error("Error:", error);
            swal("Faild", "Delivery Boy Registration Faild", "error");
        }
        setSubmitting(false);
    };


    return (
        <div className='flex flex-col items-center'>

            <section className='-z-50 banner relative flex flex-col justify-center items-center'>
            </section>

            <section className='mt-[8rem] flex flex-col items-center bg-gray-800 p-5 w-[50rem] h-[30rem] z-50 absolute '>

                <p className='font-bold text-2xl mb-10 mt-5'>Delivery Boy Registration</p>


                <Box sx={formstyle}>
                    <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>

                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Field
                                        label="Delivery Boy Name"
                                        fullWidth
                                        variant="outlined"
                                        error={!ErrorMessage("name")}
                                        name="name" as={TextField}
                                        helperText={<ErrorMessage name='name'>
                                            {(msg) => <span className='text-red-600' >{msg}</span>}
                                        </ErrorMessage>} />
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        label="Delivery Boy City"
                                        fullWidth
                                        variant="outlined"
                                        error={!ErrorMessage("city")}
                                        name="city" as={TextField}
                                        helperText={<ErrorMessage name='city'>
                                            {(msg) => <span className='text-red-600' >{msg}</span>}
                                        </ErrorMessage>} />
                                </Grid>


                                <Grid item xs={6}>
                                    <Field
                                        label="Delivery Boy State"
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
                                        label="Delivery Boy Phone"
                                        fullWidth
                                        variant="outlined"
                                        error={!ErrorMessage("phoneNumber")}
                                        name="phoneNumber" as={TextField}
                                        helperText={<ErrorMessage name='phoneNumber'>
                                            {(msg) => <span className='text-red-600' >{msg}</span>}
                                        </ErrorMessage>} />
                                </Grid>


                                <Grid item xs={6}>
                                    <Field
                                        label="Email Id"
                                        fullWidth
                                        variant="outlined"
                                        error={!ErrorMessage("emailId")}
                                        name="emailId" as={TextField}
                                        type="email"
                                        helperText={<ErrorMessage name='emailId'>
                                            {(msg) => <span className='text-red-600' >{msg}</span>}
                                        </ErrorMessage>} />
                                </Grid>

                                <Grid item xs={6}>
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
                                    <Button type='Submit' variant='contained'>Register</Button>
                                </Grid>

                                <Grid className='mt-5 ml-5'>
                                    <span>Do you already have account ?</span>
                                    <span className='ml-2 cursor-pointer text-pink-500 font-bold underline' onClick={() => navigate("/delivery-boy-login")}>Login</span>
                                </Grid>

                            </Grid>
                        </Form>

                    </Formik>

                </Box>

            </section>


        </div>
    )
}

export default DeliveryBoyRegister
