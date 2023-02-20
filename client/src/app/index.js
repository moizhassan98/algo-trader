import React from 'react'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'

import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'
import LoginRedirect from '../pages/LoginRedirect';


function App(){
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/redirect' element={<LoginRedirect />} />
            </Routes>
        </Router>
    )
}


export default App