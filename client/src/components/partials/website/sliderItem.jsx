import React from 'react'

const SliderItem = ({img}) => {
  return (
    <div className="single-slider" >
        <div className="container">
            <div className="row">
                <div className="col-lg-7">
                    <div className="text">
                        <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
                        <div className="button">
                            <a href="#" className="btn">Get Appointment</a>
                            <a href="#" className="btn primary">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SliderItem