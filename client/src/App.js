<<<<<<< HEAD
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

=======
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth-service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
>>>>>>> origin/Create_DB

  return (
<<<<<<< HEAD
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
};

export default App;