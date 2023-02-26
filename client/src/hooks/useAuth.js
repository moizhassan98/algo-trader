import { useSelector } from 'react-redux'
import { SERVER_API_URL } from '../config/urls'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

const useAuth = () =>{
    const navigate = useNavigate()
    const authToken = useSelector((state)=> state.auth.authToken)

    const [authStatus, setAuthStatus] = useState(false)

    useEffect(()=>{
        axios.get(SERVER_API_URL+'/getauth',{
            headers:{
                'AuthToken': authToken
            }
        })
        .then((response)=>{
            // setStatus('Auth\'d')
        })
        .catch((error)=>{
            console.log(error);
            // setStatus('Not Auth\'d')
            navigate('/login', {replace: true})
        })
    },[])

}

export default useAuth