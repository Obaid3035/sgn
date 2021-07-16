import 'bootstrap/dist/css/bootstrap.css';
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';

import { AuthProvider } from './context/AuthContext'
// axios.defaults.baseURL = 'https://sleepy-savannah-00668.herokuapp.com/';
// axios.defaults.baseURL = ' https://murmuring-refuge-28649.herokuapp.com/ ';
axios.defaults.baseURL = 'http://localhost:4000/';

axios.defaults.headers['Content-Type'] = 'application/json';

const app = <BrowserRouter> <AuthProvider><App /></AuthProvider> </BrowserRouter>

ReactDOM.render(
    app,
  document.getElementById('root')
);
