import React from 'react'
import { Form, Input, message } from "antd";
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import googleIcon from "../../assets/images/GoogleIcon.svg";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import HttpsIcon from "@mui/icons-material/Https";
import { FormControl, TextField, InputAdornment, Button } from "@mui/material";


const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const signInWithGoogle = () => {
        window.open("http://localhost:3000/auth/google", "_self", 'toolbar=no, scrollbars=yes, resizable=no, width=1000, height=auto')
    }

    const onFinishHandler = (values) => {
        console.log(values)
        setIsSubmitting(true)
        let payload = {
            email: email,
            password: password
        }
        axios.post('auth/signin', payload)
            .then((r) => {
                setIsSubmitting(false)
                localStorage.setItem('token', r.data.token)
                navigate("/pharma");
            })
            .catch((e) => {
                setIsSubmitting(false)
                if (e.response.data.errors != undefined) {
                    setValidationErrors(e.response.data.errors);
                }
            });
        message.success('Login success')
    }
    return (
        <section class="contact-us section">
            <div class="container">
                <div class="inner">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="contact-us-left">

                                <div id="myMap"></div>

                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="contact-us-form">
                                <h2>Sinin With Us</h2>


                                <Form layout='vertical' onFinish={onFinishHandler} className="card p-4 w-30">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                                    <Input placeholder="Email" required
                                                        onChange={(e) => { setEmail(e.target.value) }}
                                                    />
                                                    {validationErrors.email != undefined &&
                                                        <div className="flex flex-col">
                                                            <small className="text-danger">
                                                                {validationErrors.email[0]}
                                                            </small >
                                                        </div>
                                                    }
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                                    <Input placeholder="Password" required
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    {validationErrors.password != undefined &&
                                                        <div className="flex flex-col">
                                                            <small className="text-danger">
                                                                {validationErrors.password[0]}
                                                            </small >
                                                        </div>
                                                    }

                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group login-btn">
                                                <button disabled={isSubmitting} class="btn btn-primary" type="submit">Submit</button>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <Link to='/signup' className='m-2 text-danger'>Not a user?</Link>

                                        </div>
                                    </div>
                                </Form>

                                <div>
                                    <Button onClick={signInWithGoogle} variant="outlined">
                                        <img src={googleIcon}  />
                                        <p class="gtext" >
                                            Sign in with Google
                                        </p>
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="contact-info">
                    <div class="row">

                        <div class="col-lg-4 col-12 ">
                            <div class="single-info">
                                <i class="icofont icofont-ui-call"></i>
                                <div class="content">
                                    <h3>+(000) 1234 56789</h3>
                                    <p>info@company.com</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-12 ">
                            <div class="single-info">
                                <i class="icofont-google-map"></i>
                                <div class="content">
                                    <h3>2 Fir e Brigade Road</h3>
                                    <p>Chittagonj, Lakshmipur</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-12 ">
                            <div class="single-info">
                                <i class="icofont icofont-wall-clock"></i>
                                <div class="content">
                                    <h3>Mon - Sat: 8am - 5pm</h3>
                                    <p>Sunday Closed</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage