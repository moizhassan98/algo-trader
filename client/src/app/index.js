import React from 'react'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import { firebase } from '../config/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'

import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage';
import Dashboard from '../pages/Dashboard';
import Counter from '../components/Counter/Counter';


function App(){
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/count' element={<Counter/>} />
            </Routes>
        </Router>
    )
}


export default App