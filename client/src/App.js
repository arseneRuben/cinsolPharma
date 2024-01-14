import Preloader from './components/partials/website/preloader';
import WebsiteAppointment from './components/partials/website/appointment';

import WebsiteTopBar from './components/partials/website/topBar';
import WebsiteMenu from './components/partials/website/menu';
import WebsiteSlider from './components/partials/website/slider';
import WebsiteScheduleItem from './components/partials/website/sheduleItem';


function App() {
  return (
    <>
    
   
		<header className="header" >
      <WebsiteTopBar />
    </header>
    <div className="header-inner">
        <div className="container">
          <div className="inner">
               <WebsiteMenu />
          </div>
        </div>
    </div>
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
  );
}

export default App;
