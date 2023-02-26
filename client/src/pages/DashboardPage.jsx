
import {useState, useEffect} from 'react'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { SERVER_API_URL } from '../config/urls'
import useAuth from '../hooks/useAuth'

const DashboardPage = () =>{
    useAuth()  // checks for auth, if not corrects navigates to /login page.


    return (
        <>
            <div>In Progress ...</div>
        </>
        

    )
}
export default DashboardPage