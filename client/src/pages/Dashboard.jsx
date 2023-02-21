
import {useState, useEffect} from 'react'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Dashboard = () =>{

    const navigate = useNavigate()

    const [status, setStatus] = useState('Requesting...')

    useEffect(()=>{
        getToken()
            .then((authToken)=>{
                axios.get('http://localhost:5000/api/v1/getauth',{
                    headers:{
                        'AuthToken': authToken
                    }
                })
                .then((response)=>{
                    console.log(response);
                    setStatus('Auth\'d')
                })
                .catch((error)=>{
                    console.log(error);
                    setStatus('Not Auth\'d')
                })
            })
            .catch((error)=>{
                console.log(error);
                navigate('/login',{replace: true})
            })
    },[])

    const getToken = async() =>{
        let token = await sessionStorage.getItem('authToken')
        return token
    }

    return (
        <div>{status}</div>
    )
}
export default Dashboard