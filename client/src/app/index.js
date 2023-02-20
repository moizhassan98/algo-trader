import React from 'react'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'

import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'


function App(){
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </Router>
    )
}


export default App