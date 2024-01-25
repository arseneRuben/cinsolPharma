import Preloader from './components/partials/website/preloader';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import WebsiteTopBar from './components/partials/website/topBar';
import WebsiteMenu from './components/partials/website/menu';

import LoginPage from './pages/website/LoginPage';
import RegisterPage from './pages/website/RegisterPage';
import ContactPage from './pages/website/ContactPage';
import HomePage from './pages/website/HomePage';
import WebsiteFooter from './components/partials/website/Footer';
import PharmaFooter from './components/partials/pharma/Footer';

import PharmaShop from './pages/pharma/shop';
import PharmaHeader from './components/partials/pharma/header';


function App() {
  return (
    <>
  
    {
    
      window.location.href.includes("pharma") ?
      <PharmaHeader />
       :    
      ( <header className="header" > <WebsiteTopBar /> </header>)
    
    }

    {
      window.location.href.includes("pharma") ?
      <div> j</div>
      :    
    ( 
        <div className="header-inner">
          <div className="container">
            <div className="inner">
                <WebsiteMenu />
            </div>
          </div>
      </div>
    )
    
    }
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={< HomePage/>} />
      <Route path="/signin" element={< LoginPage/>} />
      <Route path="/signup" element={< RegisterPage/>} />
      <Route path="/contact" element={< ContactPage/>} />
      <Route path="/pharma" element={< PharmaShop/>} />
    </Routes>   
    </BrowserRouter>
    
    {
      window.location.href.includes("pharma") ?
      <PharmaFooter/>
      :    
      <WebsiteFooter/>
    }
		
    
	
    </>
  );
}

export default App;
