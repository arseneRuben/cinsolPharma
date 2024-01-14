import logo from './logo.svg';
import './App.css';
import Preloader from './components/partials/website/preloader';
import WebsiteAppointment from './components/partials/website/appointment';

import WebsiteTopBar from './components/partials/website/topBar';
import WebsiteMenu from './components/partials/website/menu';
import WebsiteSlider from './components/partials/website/slider';


function App() {
  return (
    <>
    <Preloader />
    <WebsiteAppointment />
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
    </section>


	
	
    </>
  );
}

export default App;
