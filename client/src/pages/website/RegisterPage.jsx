import React from 'react'
import { useState, useEffect } from 'react'
import {Form, Input, message} from "antd";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
    const navigate = useNavigate()
    const onFinishHandler = (values) => {
       try {
              axios.post('/api/auth/signup', values)
              message.success('Register success')
              navigate('/signin')
       } catch (error) {
           console.log(error)
       }
    }

    useEffect(()=>{
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
            navigate("/dashboard");
        }
    },[])

    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const registerAction = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            email:email,
            password:password,
            firstname: username,
        }
        axios.post('/api/auth/signup', payload)
        .then((r) => {
            setIsSubmitting(false)
            localStorage.setItem('token', r.data.token)
            navigate("/dashboard");
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
                        <h2>Register With Us</h2>
                      
                    
                        <Form layout='vertical' onSubmit={(e)=>registerAction(e)} /*onFinish={onFinishHandler}*/ className="card p-4 w-30">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <Form.Item name="username" rules={[{required: true, message: 'Please input your User Name!'}]}>
                                            <Input placeholder="Username" required 
                                            onChange={(e)=>{setUserName(e.target.value)}}
                                            />
                                            {validationErrors.name != undefined &&
                                                <div className="flex flex-col">
                                                    <small  className="text-danger">
                                                    {validationErrors.name[0]}
                                                    </small >
                                                </div>
                                            }
                                            
                                        </Form.Item>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                    <Form.Item name="email" rules={[{required: true, message: 'Please input your email!'}]}>
                                            <Input placeholder="Email" required 
                                            onChange={(e)=>{setEmail(e.target.value)}}
                                            />
                                            {validationErrors.email != undefined &&
                                                <div className="flex flex-col">
                                                    <small  className="text-danger">
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
                                    <div class="form-group">
                                        <Form.Item name="password" rules={[{required: true, message: 'Please input your password!'}]}>
                                            <Input placeholder="Password" required 
                                            onChange={(e)=>setPassword(e.target.value)}
                                            />
                                            {validationErrors.password != undefined &&
                                                <div className="flex flex-col">
                                                    <small  className="text-danger">
                                                    {validationErrors.password[0]}
                                                    </small >
                                                </div>
                                            }
                                            
                                        </Form.Item>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="form-group login-btn">
                                        <button disabled={isSubmitting} class="btn btn-primary" type="submit">Send</button>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                     <Link to='/signin' className='m-2 text-danger'>Already have an account?</Link>

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

export default RegisterPage