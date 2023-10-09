import React, { Component } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Login from './home/login';
import MyForm from './home/studentVerification';
import Home from './home/home';
import SignUp from "./home/signUp";
import Schedule from './home/schedule';

// class App extends Component {
    function App() {
        return (
            <div>
                <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/schedule' element={<Schedule/>}/>
                        <Route path='/studentVerification' element={<MyForm/>}/>
                        <Route path='/login/signup' element={<SignUp/>}/>


                    </Routes>
                </div>
            </BrowserRouter>
            </div>
            
        );
    }


export default App;