import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Login from './components/Login';
import About from './components/About';
import Admin from './components/Admin';
import Register from './components/Register';
import { Shop } from './components/Shop';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>

                <Routes>
                    <Route path="/" element={<App />} >
                        <Route index element={<h1> please select a route</h1>} />
                        <Route path='/Login' element={<Login></Login>} />
                        <Route path='/About' element={<About/>} />
                        <Route path='/Admin' element={<Admin/>} />
                        <Route path='/Register' element={<Register/>} />
                        <Route path='/Shop' element={<Shop></Shop>} />
                        <Route path='*' element={<h1>Not Found</h1>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
