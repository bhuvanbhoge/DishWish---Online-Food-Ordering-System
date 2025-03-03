import { Opacity } from '@mui/icons-material';
import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import * as Yup from "yup";
import "./RegistrationLoginStype.css"
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';


const formstyle = {
    
    
  };

  const initialValues={
    custName:"",
    custPhone:"",
    custEmail:"",
    password:""
    
  }

  const validationSchema=Yup.object().shape({
    custName:Yup.string().required("customer name is required"),
    custPhone:Yup.string().required("phone number is required"),
    custEmail:Yup.string().required("email Id is required"),
    password:Yup.string().required("Password is required")
    })


  const CustomerRegister = () => {

    const navigate = useNavigate()


    // *********************************************************************
    // *********  Call the Backend API and pass the data into JSON format ***

    const handleSubmit = async (values, {setSubmitting }) => {
        try {
            const response = await axios.post("http://localhost:8080/customer/save", values, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            navigate("/customer-login"); // Redirect after success
            swal("Good job!", "Customer Registration successfull", "success");

        } catch (error) {
            console.error("Error:", error);
            swal("Faild", "Customer Registration Faild", "error");
        }
        setSubmitting(false);
    };


  return (

    <div className='flex flex-col items-center'>

    <section className='-z-50 banner relative flex flex-col justify-center items-center'>
    </section>
    
    <section className='mt-[8rem] flex flex-col items-center bg-gray-800 p-5 w-[50rem] h-[30rem] z-50 absolute '>

    <p className='font-bold text-2xl mb-10 mt-5'>User Registration</p>


    <Box sx={formstyle}>
    <Formik initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}>
    
        <Form>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Field
                    label="Customer Name"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("custName")}
                    name="custName" as={TextField} 
                    helperText={<ErrorMessage name='custName'>
                        {(msg)=><span className='text-red-600' >{msg}</span>}
                    </ErrorMessage>}/>
                </Grid>

                <Grid item xs={6}>
                    <Field
                    label="Customer Phone"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("custPhone")}
                    name="custPhone" as={TextField} 
                    helperText={<ErrorMessage name='custPhone'>
                        {(msg)=><span className='text-red-600' >{msg}</span>}
                    </ErrorMessage>}/>
                </Grid>

            

                <Grid item xs={6}>
                    <Field
                    label="Email Id"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("custEmail")}
                    name="custEmail" as={TextField} 
                    type="email"
                    helperText={<ErrorMessage name='custEmail'>
                        {(msg)=><span className='text-red-600' >{msg}</span>}
                    </ErrorMessage>}/>
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
                        {(msg)=><span className='text-red-600' >{msg}</span>}
                    </ErrorMessage>}/>
                </Grid>


                <Grid className='mt-5 ml-5' xs={12}>
                    <Button type='Submit' variant='contained'>Register</Button>
                </Grid>
            
                <Grid className='mt-5 ml-5'>
                    <span>Do you already have account ?</span> 
                    <span className='ml-2 cursor-pointer text-pink-500 font-bold underline' onClick={() => navigate("/customer-login")}>Login</span>
                </Grid>

            </Grid>
        </Form>

    </Formik>

</Box>

    </section>
    

    </div>
  )
}

export default CustomerRegister
