import { Avatar, Box } from '@mui/material'
import React, { useEffect } from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import LockClockOutlined from '@mui/icons-material/LockClockOutlined'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { userSignInAction } from '../redux/actions/userAction'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string('Confirm password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    name: yup
        .string('Enter your name')
        .max(40 , 'Name too long')
        .required('Name is required'),
    phone: yup
        .string('Enter phone number')
        .max(10 , 'phone number cannot exceed 10 digits')
        .required('Phone is required'),
});



const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userInfo } = useSelector(state => state.signIn);
    useEffect(() => {

        if (isAuthenticated) {
            if (userInfo.role === 1) {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }

        // if (isAuthenticated) {
        //     navigate('/user/dashboard');
        // }
    }, [isAuthenticated])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            phone:'',
            name: '',

        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            //  alert(JSON.stringify(values, null, 2));
            dispatch(userSignInAction(values));
            actions.resetForm();
        }

    })

    return (
        <>
            <Navbar />
            <Box sx={{ height: '81vh', display: "flex", alignItems: "center", justifyContent: "center" }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
                            <LockClockOutlined />
                        </Avatar>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="email"
                            label="E-mail"
                            name='email'
                            type='email'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="E-mail"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="name"
                            label="name"
                            name='name'
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="phone"
                            name="phone"
                            label="phone"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="confirmPassword"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Confirm Password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                        

                        <Button fullWidth variant="contained" type='submit' >Register</Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Register