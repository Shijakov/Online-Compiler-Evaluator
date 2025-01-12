import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalState } from './GlobalState';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalState>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GlobalState>
    </React.StrictMode>
);
