import React from 'react'
import {Form, Input, message} from "antd";
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const onFinishHandler = (values) => {
        console.log(values)
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
                                        <Form.Item name="email" rules={[{required: true, message: 'Please input your email!'}]}>
                                            <Input placeholder="Email" required />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                     <div class="form-group">
                                        <Form.Item name="password" rules={[{required: true, message: 'Please input your password!'}]}>
                                            <Input placeholder="Password" required />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                 <div class="col-lg-6">
                                    <div class="form-group login-btn">
                                        <button class="btn btn-primary" type="submit">Submit</button>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                     <Link to='/signup' className='m-2 text-danger'>Not a user?</Link>

                                </div>
                            </div>
                        </Form>
                        
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