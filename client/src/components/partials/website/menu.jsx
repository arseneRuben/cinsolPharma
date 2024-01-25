import React from 'react'

const websiteMenu = () => {
  return (
    <div className="row">
							<div className="col-lg-3 col-md-3 col-12">
								
								<div className="logo">
									<a href="index.html"><img src={`/assets/img/logo.png`} alt="#"/></a>
								</div>
								
								<div className="mobile-nav"></div>
								
							</div>
							<div className="col-lg-7 col-md-9 col-12">
								
								
							</div>
							<div className="col-lg-2 col-12">
								<div className="get-quote">
									<a href="appointment.html" className="btn">Book Appointment</a>
								</div>
							</div>
						</div>
  )
}

export default websiteMenu