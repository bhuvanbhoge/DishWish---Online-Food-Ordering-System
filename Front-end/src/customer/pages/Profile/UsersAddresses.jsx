import { Box, Button, Card, Grid, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import swal from 'sweetalert';



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
  street: "",
  state: "",
  zipcode: "",
  city: ""
}

const validationSchema = Yup.object().shape({
  street: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zipcode: Yup.number().required("Pincode is required")
})



const UsersAddresses = () => {


  // ****************************************
  // *** Open Close for Address Register

  const [openAddressModel, setOpenAddressModel] = useState();

  const handleOpenAddressModel = () => {
    setOpenAddressModel(true)

  }

  const handleCloseAddressModel = () => {
    setOpenAddressModel(false)
  }


  // ****************************************
  // *** Open Close for Address Update

  const [openAddressUpdate, setOpenAddressUpdate] = useState();

  const handleOpenAddressUpdate = () => {
    setOpenAddressUpdate(true)
  }

  const handleCloseAddressUpdate = () => {
    setOpenAddressUpdate(false)
  }

  //************************************************** */
  // ************** Update Address *********************


  // Initial state values
  const [formValues, setFormValues] = useState({
    addId: "",
    street: "",
    city: "",
    state: "",
    zipcode: ""
  });

  // Handle change for text fields and selects
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };




  // *********************************************************************
  // *********  Call the Backend API and pass the data into JSON format ***

  const handleSubmit = async (values, { setSubmitting }) => {

    const userData = JSON.parse(localStorage.getItem("data"));

    try {
      const response = await axios.post("http://localhost:8080/customer/saveAddress/" + userData.custId, values, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      swal("Good job!", "Customer Address Registration successfull", "success");

    } catch (error) {
      console.error("Error:", error);
      swal("Faild", "Customer Address Registration Faild", "error");
    }
    setSubmitting(false);
  };


  // *********************************************************************
  // *********  Get Single Customer Address **************************

  // get Single Menu
  const getSingleAddressData = async (id) => {

    console.log("Id : ",id);

    try {
      const response = await axios.get("http://localhost:8080/customer/getCustomerAddressById/" + id, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      // Set response data to formValues
      setFormValues({
        addId: response.data.addId || "",
        street: response.data.street || "",
        city: response.data.city || "",
        state: response.data.state || "",
        zipcode: response.data.zipcode || ""
      });

      console.log("Data : ", response.data);
      // Open the modal after setting data
      handleOpenAddressUpdate();
    } catch (error) {
    }
  };


  // *********************************************************************
  // *********  Update Customer Address **************************


  const handleUpdate = async (event) => {

    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post("http://localhost:8080/customer/updateCustomerAddress/"+formValues.addId, values, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response?.data && response != null) {
        swal("Good job!", "Address Updated successfull", "success");
      }

    } catch (error) {
      swal("Faild", "Address Updated Faild", "error");
    }


  };



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


  
    // ********************************************************
    // ************* Delete Address *****************************

    const deleteAddress = async (id) =>{

      try {
          const response = await axios.delete("http://localhost:8080/customer/deleteCustomerAddress/"+id, {
              headers: {
                  "Content-Type": "application/json"
              }
          });    
          swal("Good job!", "Address Deleted successfull", "success");
      
      } catch (error) {
          swal("Faild", "Address Deleted Faild", "error");
      }
  };



  return (



    <div>

      <div className='flex flex-wrap justify-between'>
        {customerAddressList.map((item, index) => (

          <Card className='flex space-x-5 lg:w-64 m-5 p-5'>
            <HomeIcon />
            <div className='space-y-3 text-gray-500'>
              <h1 className='font-semibold text-lg text-white'>Home</h1>
              <p>
                {item.street}, {item.city}, {item.state} - {item.zipcode}
              </p>

              <Button variant='outlined' fullWidth><p className='text-green-400'
                onClick={() => getSingleAddressData(item.addId)}>Update</p></Button>

              <Button variant='outlined' fullWidth 
              onClick={() => deleteAddress(item.addId)}>Delete</Button>
            </div>
          </Card>
        ))}

      </div>

      <div>

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


      {/* **************** Form for Add New Address ********************* */}

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
                    error={!ErrorMessage("street")}
                    name="street" as={TextField}
                    helperText={<ErrorMessage name='street'>
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
                    error={!ErrorMessage("zipcode")}
                    name="zipcode" as={TextField}
                    helperText={<ErrorMessage name='zipcode'>
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


      {/* *********** Form for Update Address ******************* */}

      <Modal open={openAddressUpdate} onClose={handleCloseAddressUpdate}>
        <Box sx={style}>
          <form
            onSubmit={handleUpdate}>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    name="street" 
                    value={formValues.street}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="State"
                    fullWidth
                    variant="outlined"
                    name="state"
                    value={formValues.state}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    name="zipcode"
                    value={formValues.zipcode}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="City"
                    fullWidth
                    variant="outlined"
                    name="city"
                    value={formValues.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid className='mt-5 ml-5' xs={12}>
                  <Button type='Submit' variant='contained'>Update Address</Button>
                </Grid>

              </Grid>
          </form>

        </Box>

      </Modal>



    </div>
  )
}

export default UsersAddresses
