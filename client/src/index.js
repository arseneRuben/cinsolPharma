import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom/client';
=======
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import './index.css';
>>>>>>> origin/Create_DB
import App from './App';
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

//serviceWorker.unregister();
