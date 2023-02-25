
import {useState, useEffect} from 'react'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import Counter from '../components/Counter/Counter'
import { useSelector } from 'react-redux'

const Dashboard = () =>{

    const navigate = useNavigate()
    const authToken = useSelector((state)=> state.auth.authToken)

    const [status, setStatus] = useState('Requesting...')

    useEffect(()=>{
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
    },[])


    return (
        <>
            <div>{status}</div>
            <Counter />
        </>
        

    )
}
export default Dashboard