import logo from './logo.svg';
import './App.css';
import Preloader from './components/partials/website/preloader';
import websiteTopBar from './components/partials/website/topBar';
import websiteMenu from './components/partials/website/menu';


function App() {
  return (
    <>
    <Preloader />
		<header class="header" >
      <websiteTopBar />
    </header>
    <div class="header-inner">
        <div class="container">
          <div class="inner">
               <websiteMenu/>
          </div>
        </div>
    </div>

	
	
    </>
  );
}

export default App;
