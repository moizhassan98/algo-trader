import React from 'react'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import { firebase } from '../config/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'devextreme/dist/css/dx.light.css';
import '../styles/App.css'

import Home from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage';
import Dashboard from '../pages/DashboardPage';
import CreateBrokerPage from '../pages/CreateBrokerPage';
import CreateBotPage from '../pages/CreateBotPage';
import TradevisorNavbar from '../components/TradevisorNavbar';
import BotsPage from '../pages/BotsPage';
import BrokersPage from '../pages/BrokersPage';


function App(){
    return (
        <Router>
            <TradevisorNavbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/createbroker' element={<CreateBrokerPage/>} />
                <Route path='/createbot' element={<CreateBotPage />} />
                <Route path='/bots' element={<BotsPage />} />
                <Route path='/brokers' element={<BrokersPage />} />
            </Routes>
        </Router>
    )
}


export default App