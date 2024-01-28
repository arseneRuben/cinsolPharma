import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Input, message } from "antd";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
    const navigate = useNavigate()

    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clicLogOut = (e) => {
        //e.preventDefault();
        axios.post('auth/signout')
        localStorage.clear();
        console.log("Clic sur le bouton");
        message.success('Disconnected successfully')
        navigate('/signin')
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
                                <h2>Profile Page</h2>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="form-group login-btn">
                                <button disabled={isSubmitting} onClick ={clicLogOut} class="btn btn-primary" type="submit">Log Out</button>
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

export default RegisterPage