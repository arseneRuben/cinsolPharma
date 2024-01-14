import React from 'react'
import SliderItem from './sliderItem'

const websiteSlider = () => {
  return (
    <div className="hero-slider">
       			
               
         <SliderItem img={`/assets/img/slider.jpg`}  />
			   <SliderItem img={`/assets/img/slider3.jpg`} />
			   <SliderItem img={`/assets/img/slider2.jpg`} />

    </div>
  )
}

export default websiteSlider