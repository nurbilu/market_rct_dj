import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import MyNav from './components/MyNav';
import { Outlet } from 'react-router-dom';
import { selectUsername,selectLogged } from './features/counter/loginSlice.js'
import { useSelector, useDispatch } from 'react-redux';
function App() {
    const userName = useSelector(selectUsername);
    const logged = useSelector(selectLogged);
    return (
        <div className="App">
            {logged && <div><h1> {userName} </h1></div> }
                <MyNav></MyNav>
                <Outlet></Outlet>
        </div>
    );
}

export default App;