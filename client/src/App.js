import Preloader from './components/partials/website/preloader';
import React, { Component }  from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import WebsiteTopBar from './components/partials/website/topBar';
import WebsiteMenu from './components/partials/website/menu';

import LoginPage from './pages/website/LoginPage';
import RegisterPage from './pages/website/RegisterPage';
import ContactPage from './pages/website/ContactPage';
import HomePage from './pages/website/HomePage';
import Footer from './components/partials/website/Footer';


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
    <BrowserRouter>
    <Routes>
      <Route path="/" element={< HomePage/>} />
      <Route path="/signin" element={< LoginPage/>} />
      <Route path="/signup" element={< RegisterPage/>} />
      <Route path="/contact" element={< ContactPage/>} />

    </Routes>   
    </BrowserRouter>
    <Footer />
		
    



	
	
    </>
  );
}

export default App;
