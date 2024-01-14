import React from 'react'

const LoginPage = () => {
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
                        
                    
                        <form class="form" method="post" action="mail/mail.php">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <input type="email" name="email" placeholder="Email" required=""/>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <input type="password" name="password" placeholder="password" required=""/>
                                    </div>
                                </div>
                            </div>
                               
                            <div class="row">
                                 <div class="col-lg-6">
                                    <div class="form-group login-btn">
                                        <button class="btn" type="submit">Send</button>
                                    </div>
                                    </div>
                                    <div class="col-lg-6">
                                    <div class="checkbox">
                                        <label class="checkbox-inline" for="2"><input name="news" id="2" type="checkbox"/>Remember  ?</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                        
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