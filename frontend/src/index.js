import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalState } from './GlobalState'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <GlobalState>
            <App />
        </GlobalState>
    </React.StrictMode>
)
