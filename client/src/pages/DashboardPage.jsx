
import {useState, useEffect} from 'react'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { SERVER_API_URL } from '../config/urls'
import useAuth from '../hooks/useAuth'
import Sidebar from '../components/Sidebar'

const DashboardPage = () =>{
    useAuth()  // checks for auth, if not corrects navigates to /login page.


    return (
        <div className='d-flex'>
            <Sidebar active={"dashboard"} />
            <div>In Progress ...</div>
        </div>
        

    )
}
export default DashboardPage