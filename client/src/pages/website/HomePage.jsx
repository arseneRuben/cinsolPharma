import React from 'react'
import WebsiteSlider from '../../components/partials/website/slider';
import WebsiteScheduleItem from '../../components/partials/website/sheduleItem';
import WebsiteAppointment from '../../components/partials/website/appointment';
const HomePage = () => {
  return (
<>
    <section className="slider">
        <WebsiteSlider />
        </section>
        <section className="schedule">
            <div className="container">
            <div className="schedule-inner">
                <div className="row">
                <WebsiteScheduleItem />
                <WebsiteScheduleItem />
                <WebsiteScheduleItem />
                </div>
            </div>
            </div>
    </section>
  </>
  )
}

export default HomePage