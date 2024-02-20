import React from 'react'
import { Form, Input, message } from "antd";
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import googleIcon from "../../assets/images/GoogleIcon.svg";
import Axios from 'axios';
import { FormControl, TextField, InputAdornment, Button } from "@mui/material";
import "./wstyles.css";
import ReactButton from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormItem from 'antd/es/form/FormItem';


const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const signInWithGoogle = () => {
        window.open("http://localhost:8080/auth/google", "_self", 'toolbar=no, scrollbars=yes, resizable=no, width=1000, height=auto')
    }

    React.useEffect(() => {
        Axios.get("http://localhost:8080/auth/login/success", {
            withCredentials: true,
        })
            .then((res) => {
                if (res.status == 200) {
                    navigate('/')
                } else {
                    console.log("No status");
                }
            })
            .catch((err) => console.log(err));
    }, []);

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
                message.success('Login success')
            })
            .catch((e) => {
                setIsSubmitting(false)
                if (e.response.data.errors != undefined) {
                    setValidationErrors(e.response.data.errors);
                }
            });
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let isOTP = false;
    const resetPassword = (values) => {
        console.log(values);
        let payload = {
            email: email
        }
        axios.post('auth/forgotPassword', payload)
            .then((r) => {
                message.success('Message sent to ' + email)
                isOTP = true
            })
            .catch((e) => {
                setIsSubmitting(false)
                if (e.response.data.errors != undefined) {
                    setValidationErrors(e.response.data.errors);
                }
            });
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
                                                    <Input placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                                                    {validationErrors.password != undefined &&
                                                        <div className="flex flex-col">
                                                            <small className="text-danger">
                                                                {validationErrors.password[0]}
                                                            </small >
                                                        </div>
                                                    }

                                                </Form.Item>
                                            </div>
                                            <ReactButton variant="light" onClick={handleShow}>
                                                Forgot Password?
                                            </ReactButton>

                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Reset your password</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form layout='vertical' onFinish={resetPassword} className="card p-4 w-30">
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
                                                                    <Form.Item disabled={isOTP === false ? false : true} name="password" rules={[{ required: true, message: 'Please input the new password!' }]}>
                                                                        <Input placeholder="New Password" required
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
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="form-group login-btn">
                                                                    <button disabled={isSubmitting} class="btn btn-primary" type="submit">Get OTP</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <ReactButton variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </ReactButton>
                                                    <ReactButton variant="primary" onClick={handleClose}>
                                                        Save Changes
                                                    </ReactButton>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group login-btn">
                                                <button disabled={isSubmitting} class="btn btn-primary" type="submit">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <Link to='/signup' className='m-2 text-danger'>Not a user?</Link>

                                        </div>
                                    </div>
                                </Form>

                                <div>
                                    <Button onClick={signInWithGoogle} variant="outlined">
                                        <img src={googleIcon} />
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