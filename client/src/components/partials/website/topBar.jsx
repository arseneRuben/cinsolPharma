import React from 'react'

const websiteTopBar = () => {
  return (
    <div className="topbar">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-5 col-12">
							
							<ul className="top-link">
								<li><a href="#">About</a></li>
								<li><a href="/signin">Signin</a></li>
								<li><a href="/signup">Signup</a></li>
								<li><a href="/pharma">Pharmacie</a></li>
								<li><a href="/contact">Contact</a></li>
							</ul>
							
						</div>
						<div className="col-lg-6 col-md-7 col-12">
							
							<ul className="top-contact">
								<li><i className="fa fa-phone"></i>+880 1234 56789</li>
								<li><i className="fa fa-envelope"></i><a href="mailto:support@yourmail.com">support@yourmail.com</a></li>
							</ul>
							
						</div>
					</div>
				</div>
			</div>
  )
}

export default websiteTopBar